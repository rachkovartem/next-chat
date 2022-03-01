import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import * as React from "react";
import {useEffect} from "react";
import {useTranslation} from "next-i18next";
import Stack from '@mui/material/Stack';

import {useChat} from "../../../hooks/useChat";
import {ChatInput} from "../chatInput/ChatInput";
import {Room} from "../../profile/[id]";
import {Avatar} from "@mui/material";

export const ChatWindow = (props: Room) => {
  const {roomId, groupRoom, participants, avatars} = props;
  console.log(props)
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
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignSelf: user.id === item.senderId ? 'flex-end' : 'inherit'}}
              key={item.messageId}>
              <Avatar
                sx={{
                  marginRight: '5px',
                  display: user.id === item.senderId || !groupRoom ? 'none' : 'initial',
                  alignSelf: 'end',
              }}
                alt="Avatar"
                src={avatars[item.senderId] ? `http://localhost:8080/${avatars[item.senderId]}` : ''}
              />
              <Paper
                sx={{
                  marginLeft: user.id === item.senderId ? 'auto' : '0',
                  maxWidth: '100%',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                  position: 'relative',
                  p: '9px',
                  lineHeight: '1',
                  borderRadius: '10px',
                  backgroundColor: user.id === item.senderId ? '#fff' : '#d5d5d5',
                }}
                elevation={2}
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
              </Paper>
            </div>)
        }
      </Stack>
    </Paper>
    <ChatInput roomId={roomId}/>
  </Box>
}