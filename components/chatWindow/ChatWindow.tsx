import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import * as React from "react";
import {useEffect, useState} from "react";
import Stack from '@mui/material/Stack';

import {ChatInput} from "../chatInput/ChatInput";
import {Room} from "../../pages/profile/[id]";
import {Avatar} from "@mui/material";
import Header from "../header/Header";
import {useSelector} from "react-redux";
import {InitialState} from "../../redux/reducers";
import {ServerMessage} from "../../hooks/useNotification";
import {Message} from "./message/Message";

export const ChatWindow = (props: Room) => {
  const {roomId, groupRoom, avatars} = props;
  const { user, socket } = useSelector((state: InitialState)  => state);
  const [initial, setInitial] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<ServerMessage[]>(
  [
    {
      messageId: 'initial',
      roomId,
      senderId: 'initial',
      senderUsername: 'initial',
      message: 'initial',
      sendingDate: 'initial',
      senderAvatar: 'initial'
    }
  ]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, [])

  useEffect(() => {
    if (!socket || !isMounted) return
    socket.emit('messages:get', { roomId });
  }, [roomId, isMounted])

  useEffect(() => {
    if (roomId === user.id && isMounted) {
      setInitial(true)
      return
    }
  }, [roomId, user.id])

  useEffect(() => {
    if (socket && isMounted) {
      socket.on('messages:add', (serverMessage: ServerMessage[]) => {
        setMessages(prev => {
          if (!prev[0]) return  [...serverMessage]
          if (prev[0].roomId === serverMessage[0].roomId) {
            return [...prev, ...serverMessage]
          } else {
            return  [...prev]
          }
        })
      });
      socket.on(`messages:get${localStorage.getItem('id')}`, (serverMessages: any) => {
        setMessages([...serverMessages])
      });
    }
  }, [socket, isMounted])

  return <>
    {initial ? null : <Box
    sx={{

      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Header room={props}/>
    <Paper
      sx={{
        marginTop: 0,
        marginBottom: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
        overflowY: 'scroll',
        padding: '10px',
        scrollbarColor: '#a8a8a8 #fff',     /* «цвет ползунка» «цвет полосы скроллбара» */
        scrollbarWidth: 'thin',  /* толщина */
        '&::-webkit-scrollbar': {
          width: '3px', /* ширина для вертикального скролла */
          height: '3px', /* высота для горизонтального скролла */
          backgroundColor: '#fff',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#a8a8a8',
          borderRadius: '9px',
          boxShadow: 'inset 1px 1px 10px #a8a8a8',
        },
      }}
      elevation={0}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        {
          messages.map(item => {
            return item.messageId === 'initial'
              ? null
              : <Message key={item.messageId} user={user} avatars={avatars} item={item} groupRoom={groupRoom}/>
          })
        }
      </Stack>
    </Paper>
    <ChatInput roomId={roomId}/>
  </Box>}</>
}