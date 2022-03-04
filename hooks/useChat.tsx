import {io} from "socket.io-client";
import {useEffect, useRef, useState} from "react";
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

export const useChat = () => {
  const [user, setUser] = useState<{id: string | null, username: string | null}>({id: null, username: null}),
        [usersOnline, setUsersOnline] = useState<string[]>([]),
        [messages, setMessages] = useState<ServerMessage[]>([]),
        [notification, setNotification] = useState<ServerMessage | null>(null),
        socketRef = useRef<any>(null),
        isServer = typeof window === "undefined"
  let id: string | null,
      username: string | null
  if (!isServer) {
    id = localStorage.getItem('id');
    username = localStorage.getItem('username');
  }

  const debouncedWentOfflineListener = () => debounce((wentOfflineId: string) => {
    setUsersOnline((friendsOnline) => [...friendsOnline.splice(friendsOnline.indexOf(wentOfflineId), 1)]);
  }, 2000)

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

    socketRef.current.on('friends:wentOffline', debouncedWentOfflineListener);

    socketRef.current.on('friends:wentOnline', (wentOnlineId: string) => {
      setUsersOnline((friendsOnline) => [...friendsOnline.concat(wentOnlineId)]);
    });

    socketRef.current.on('system:connected', (serverMessages: any) => {
      console.log(serverMessages);
    });

    socketRef.current.on('messages:get', (serverMessages: any) => {
      setMessages([...serverMessages])
    });

    socketRef.current.on('messages:add', (serverMessage: ServerMessage[]) => {
      setNotification(serverMessage[0])
      setMessages(prev => [...prev, ...serverMessage])
    });

    socketRef.current.on('system', (serverMessage: any) => {
      console.log(serverMessage)
    });

    return () => socketRef.current.disconnect()
  }, [])

  const connectToRoom = async ( roomId: string ) => {
    await socketRef.current.emit('system:connect', { id, roomId });
  }

  const getMessages = async ( roomId: string ) => {
    await socketRef.current.emit('messages:get', { roomId });
  }

  const sendMessage = (roomId: string, message: string) => {
    socketRef.current.emit('messages:add', {roomId, message, ...user});
  }

  return { user, usersOnline, messages, notification, sendMessage, getMessages, connectToRoom }
}