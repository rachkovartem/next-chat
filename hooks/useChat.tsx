import {io} from "socket.io-client";
import {useEffect, useRef, useState} from "react";

const SERVER_URL = 'http://localhost:8080';

export const useChat = () => {
  const [users, setUsers] = useState<string[]>([])
  const [messages, setMessages] = useState<string[]>([])
  const socketRef = useRef<any>(null)

  useEffect(() => {
    socketRef.current = io(SERVER_URL);
    socketRef.current.on('msgToClient', (message: any) => {
      setMessages([...messages, message])
    })
  }, [])

  const sendMessage = (message: string) => {
    socketRef.current.emit('msgToServer', message)
  }

  return { users, messages, sendMessage }
}