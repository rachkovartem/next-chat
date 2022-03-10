import {io} from "socket.io-client";
import {useEffect, useRef, useState} from "react";
import {Message} from "../pages/profile/[id]";
import apiServices from "../services/apiServices";
import {Avatar} from "@mui/material";
import * as React from "react";
import {useSnackbar} from "notistack";
const debounce = require('lodash.debounce');


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

export const useChat = (roomId?: string | undefined) => {
  const [user, setUser] = useState<{id: string | null, username: string | null}>({id: null, username: null}),
        [usersOnline, setUsersOnline] = useState<string[]>([]),
        [messages, setMessages] = useState<ServerMessage[]>([]),
        [notification, setNotification] = useState<ServerMessage | null>(null),
        [lastMessages, setLastMessages] = useState<{[roomId: string]: Message}>({}),
        { enqueueSnackbar } = useSnackbar(),
        socketRef = useRef<any>(null),
        { getLastMessages } = apiServices(),
        isServer = typeof window === "undefined"
  let id: string | null,
      username: string | null
  if (!isServer) {
    id = localStorage.getItem('id');
    username = localStorage.getItem('username');
  }

  const loadLastMessages = async () => {
    if (!user.id) return
    const messages = await getLastMessages(user.id)
    setLastMessages(messages.data)
  }

  const dbSetUsersOnline = debounce(setUsersOnline, 0)

  const wentOfflineListener = (wentOfflineId: string) => {
    setUsersOnline((friendsOnline) => {
      const index = friendsOnline.indexOf(wentOfflineId)
      const newArr = [...friendsOnline]
      newArr.splice(index, 1);
      return newArr
    });
  }

  useEffect(() => {
    loadLastMessages();
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
      dbSetUsersOnline(friendsOnline);
    });

    socketRef.current.on('friends:wentOffline', wentOfflineListener);

    socketRef.current.on('friends:wentOnline', (wentOnlineId: string) => {
      dbSetUsersOnline((friendsOnline: string[]) => {
        if (friendsOnline.includes(wentOnlineId)) return friendsOnline
        return [...friendsOnline.concat(wentOnlineId)]
      });
    });

    socketRef.current.on('system:connected', (serverMessages: any) => {
      // console.log(serverMessages);
    });

    socketRef.current.on('messages:get', (serverMessages: any) => {
      setMessages([...serverMessages])
    });

    socketRef.current.on('messages:add', (serverMessage: ServerMessage[]) => {
      if(roomId && serverMessage[0].roomId === roomId) {
        setMessages(prev => [...prev, ...serverMessage]);
      }
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

  const getMessages = async ( roomId: string ) => {
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

  return { user, usersOnline, messages, notification, lastMessages, sendMessage, setLastMessages, getMessages, connectToRoom, disconnect, showNotification }
}