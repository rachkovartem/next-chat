import {Button, IconButton, InputBase, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {useChat} from "../../../hooks/useChat";
import {useTranslation} from "next-i18next";
import Paper from "@mui/material/Paper";
import SendIcon from '@mui/icons-material/Send';


export const ChatInput = ({roomId}: { roomId: string }) => {

  const [userMessage, setUserMessage] = useState('');
  const { sendMessage } = useChat();
  const { t } = useTranslation('common');

  const onClickSend = () => {
    if (userMessage.length === 0) return
    sendMessage(roomId, userMessage);
    setUserMessage('');
  }

  const onClickEnter = (e: any) => {
    if (userMessage.length === 0) return
    if (e.key === 'Enter') {
      sendMessage(roomId, userMessage);
      setUserMessage('');
    }
  }

  return (
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: '5px',
          width: '100%',
          marginBottom: '10px',
          zIndex: '1',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        <InputBase
          sx={{
            width: '100%',
          }}
          placeholder={t('inputPlaceholder')}
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={onClickEnter}
        />
        <IconButton type="button" sx={{ p: '10px' }} onClick={onClickSend} aria-label="send">
          <SendIcon />
        </IconButton>
      </Paper>
  )
}