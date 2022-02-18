import Paper from "@mui/material/Paper";
import {Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import {useEffect, useState} from "react";
import {useChat} from "../../../hooks/useChat";
import {useTranslation} from "next-i18next";
import Stack from '@mui/material/Stack';
import {ChatInput} from "../chatInput/ChatInput";
import {useRef} from "react";

export const ChatWindow = ({ roomId }: { roomId: string }) => {
  const { user, messages, getMessages, connectToRoom } = useChat();
  const { t } = useTranslation('common');

  const onLoading = async () => {
    await connectToRoom(roomId);
    await getMessages(roomId);
  }

  useEffect(() => {
    onLoading()
  }, [])

  const getTime = (timestamp: string) => {
    const date = new Date(+timestamp);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.slice(-2)
  }

  return <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Paper
      sx={
        {
          m: 1,
          marginBottom: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          width: '50vw',
          height: '50vh',
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
        }
      }
      elevation={3}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={0.5}
      >
        {
          messages.map(item =>
            <Paper
              sx={{
                position: 'relative',
                p: '9px',
                lineHeight: '1',
                alignSelf: user.id === item.senderId ? 'flex-end' : 'inherit',
                backgroundColor: user.id === item.senderId ? '#fff' : '#d5d5d5',
              }}
              elevation={2}
              key={item.messageId}
            >
              {item.message}
              <p style={{
                margin: 0,
                paddingRight: '3px',
                fontSize: '9px',
                color: '#9b9b9b',
                position: 'absolute',
                bottom: 0,
                right: 0
              }}
              >
                { getTime(item.sendingDate) }
              </p>
            </Paper>)
        }
      </Stack>
    </Paper>
    <ChatInput roomId={roomId}/>
  </Box>
}