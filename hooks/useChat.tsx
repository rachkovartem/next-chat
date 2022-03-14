import {io} from "socket.io-client";
import {useEffect, useRef, useState} from "react";
import {Message} from "../pages/profile/[id]";
import {Avatar} from "@mui/material";
import * as React from "react";
import {useSnackbar} from "notistack";

export interface ServerMessage {
  messageId: string,
  roomId: string,
  senderId: string,
  senderUsername: string,
  message: string,
  sendingDate: string,
  senderAvatar: string,
}

const SERVER_URL = 'http://localhost:8080';

export const useChat = () => {
  const [user, setUser] = useState<{id: string | null, username: string | null}>({id: null, username: null});
  const [usersOnline, setUsersOnline] = useState<string[]>([]);
  const [messages, setMessages] = useState<ServerMessage[]>([]);
  const [notification, setNotification] = useState<ServerMessage | null>(null);
  const [lastMessages, setLastMessages] = useState<{[roomId: string]: Message}>({});
  const [socketLoading, setSocketLoading] = useState<boolean>(true);
  const  { enqueueSnackbar } = useSnackbar();
  const socketRef = useRef<any>(null);
  const isServer = typeof window === "undefined";
  let id: string | null;
  let username: string | null;
  if (!isServer) {
    id = localStorage.getItem('id');
    username = localStorage.getItem('username');
  }

  const wentOfflineListener = (wentOfflineId: string) => {
    setUsersOnline((friendsOnline) => {
      const index = friendsOnline.indexOf(wentOfflineId)
      const newArr = [...friendsOnline]
      newArr.splice(index, 1);
      return newArr
    });
  }

  useEffect(() => {
    if (user.id) {
      setSocketLoading(true);
      connectToRoom(user.id);
      getFriendsOnline();
      socketRef.current.emit('messages:getLastMessages');
    }
  }, [user])

  useEffect(() => {
    setUser({ id, username });
    socketRef.current = io(SERVER_URL, {
      query : {
        'id': id,
        'cookies': document.cookie
      },
    });

    socketRef.current.on('friends:online', (friendsOnline: string[]) => {
      setUsersOnline(friendsOnline);
    });

    socketRef.current.on('friends:wentOffline', wentOfflineListener);

    socketRef.current.on('friends:wentOnline', (wentOnlineId: string) => {
      setUsersOnline((friendsOnline: string[]) => {
        if (friendsOnline.includes(wentOnlineId)) return friendsOnline
        return [...friendsOnline.concat(wentOnlineId)]
      });
    });

    socketRef.current.on('system:connected', (serverMessages: any) => {
      // console.log(serverMessages);
    });

    socketRef.current.on(`messages:get${id}`, (serverMessages: any) => {
      setMessages([...serverMessages])
      setSocketLoading(false);
    });

    socketRef.current.on(`messages:getLastMessages${id}`, (messages: any) => {
      setLastMessages({...messages})
      setSocketLoading(false);
    });

    socketRef.current.on('messages:add', (serverMessage: ServerMessage[]) => {
      setMessages(prev => {
        if (prev.length === 0 || serverMessage[0].roomId === prev[0].roomId) {
          return [...prev, ...serverMessage]
        }
        return  [...prev]
      });
      setNotification(serverMessage[0]);
      setLastMessages((prevState => {
        const roomId = serverMessage[0].roomId;
        const newState = {...prevState};
        newState[roomId] = serverMessage[0];
        return newState
      }))
    });

    socketRef.current.on('system', (serverMessage: any) => {
      console.log(serverMessage)
    });

    return () => socketRef.current.disconnect()
  }, [])

  const disconnect = async () => {
    await socketRef.current.disconnect()
  }

  const connectToRoom = async ( roomId: string ) => {
    await socketRef.current.emit('system:connect', { id, roomId });
  }

  const getFriendsOnline = async () => {
    await socketRef.current.emit('friends:online');
  }

  const getMessages = async ( roomId: string ) => {
    setSocketLoading(true);
    await socketRef.current.emit('messages:get', { roomId });
  }

  const sendMessage = (roomId: string, message: string) => {
    socketRef.current.emit('messages:add', {roomId, message, ...user});
  }

  const showNotification = (notification: ServerMessage | null) => {
    if (notification) {
      enqueueSnackbar(<div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}>
          <Avatar
            alt="Avatar"
            src={notification ? `http://localhost:8080/${notification.senderAvatar}` : ''}
          />
          <div
            style={{
              maxWidth: '288px',
              marginLeft: '10px',
              fontWeight: 'bold',
            }}
          >
          </div>
          {notification?.senderUsername}
        </div>
        <div
          style={{maxWidth: '288px'}}
        >
          {notification?.message}
        </div>
      </div>);
    }
  }

  return {
    socketLoading,
    user,
    usersOnline,
    messages,
    notification,
    lastMessages,
    sendMessage,
    setLastMessages,
    getMessages,
    connectToRoom,
    disconnect,
    showNotification
  }
}