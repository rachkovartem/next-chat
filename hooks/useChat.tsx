import {io} from "socket.io-client";
import {useEffect, useRef, useState} from "react";

const SERVER_URL = 'http://localhost:8080';

export const useChat = () => {
  const [user, setUser] = useState({})
  const [users, setUsers] = useState<string[]>([])
  const [messages, setMessages] = useState<{[key: string]: string}[]>([])
  const socketRef = useRef<any>(null)

  useEffect(() => {
    const id = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    setUser({ id, username });

    socketRef.current = io(SERVER_URL, {
      query : {
        'id': id,
        'cookies': document.cookie
      },
    });
    socketRef.current.on('messages:get', (serverMessages: any) => {
      setMessages([...serverMessages])
    });
    socketRef.current.on('messages:add', (serverMessage: any) => {
      setMessages(prev => [...prev, ...serverMessage])
    });
    return () => socketRef.current.disconnect()
  }, [])

  const sendMessage = (message: string) => {
    socketRef.current.emit('messages:add', {message, ...user});
  }

  return { users, messages, sendMessage }
}