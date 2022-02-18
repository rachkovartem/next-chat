import {io} from "socket.io-client";
import {useEffect, useRef, useState} from "react";

const SERVER_URL = 'http://localhost:8080';

export const useChat = () => {
  const [user, setUser] = useState<{id: string | null, username: string | null}>({id: null, username: null}),
        [users, setUsers] = useState<string[]>([]),
        [messages, setMessages] = useState<{[key: string]: string}[]>([]),
        socketRef = useRef<any>(null),
        isServer = typeof window === "undefined"
  let id: string | null,
      username: string | null
  if (!isServer) {
    id = localStorage.getItem('id');
    username = localStorage.getItem('username');
  }

  useEffect(() => {
    setUser({ id, username });

    socketRef.current = io(SERVER_URL, {
      query : {
        'id': id,
        'cookies': document.cookie
      },
    });

    socketRef.current.on('system:connected', (serverMessages: any) => {
      console.log(serverMessages);
    });

    socketRef.current.on('messages:get', (serverMessages: any) => {
      setMessages([...serverMessages])
    });
    socketRef.current.on('messages:add', (serverMessage: any) => {
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

  return { user, users, messages, sendMessage, getMessages, connectToRoom }
}