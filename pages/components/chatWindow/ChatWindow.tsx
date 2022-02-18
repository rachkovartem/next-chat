import Paper from "@mui/material/Paper";
import {Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import {useEffect, useState} from "react";
import {useChat} from "../../../hooks/useChat";
import {useTranslation} from "next-i18next";


export const ChatWindow = ({ roomId }: { roomId: string }) => {
  const { messages, sendMessage, getMessages, connectToRoom } = useChat();
  const [userMessage, setUserMessage] = useState('');
  const { t } = useTranslation('common');

  useEffect(() => {
    connectToRoom(roomId);
    getMessages(roomId);
  }, [])

  const onClickSend = () => {
    if (userMessage.length === 0) return
    sendMessage(roomId, userMessage);
  }

  return <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& .MuiPaper-root': {
        m: 1,
        width: '50vw',
        height: '50vh',
      },
    }}
  >
    <Paper
      sx={
        {
          overflowY: 'scroll',
          padding: '10px'
        }
      }
      elevation={3}>
      {
        messages.map(item => <div key={item.messageId}>{item.senderUsername}: {item.message}</div>)
      }
    </Paper>
    <TextField
      id="outlined-message"
      label={t('Enter text...')}
      placeholder={t('Enter text...')}
      type="text"
      value={userMessage}
      onChange={(e) => setUserMessage(e.target.value)}
    />
    <Button
      sx={{marginRight: '20px',
        background: '#a8edea',
        color: '#3b3b3b'}}
      variant="contained"
      onClick={onClickSend}
    >{t('send')}
    </Button>
  </Box>
}