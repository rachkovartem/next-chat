import {IconButton, InputBase} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {useTranslation} from "next-i18next";
import Paper from "@mui/material/Paper";
import SendIcon from '@mui/icons-material/Send';
import {useDispatch, useSelector} from "react-redux";
import {InitialState} from "../../redux/reducers";
import {chatInputStyles} from "./ChatInput.styles";


export const ChatInput = ({roomId}: { roomId: string }) => {
  const [userMessage, setUserMessage] = useState('');
  const { user, socket } = useSelector((state: InitialState)  => state);
  const { t } = useTranslation('common');
  const classes = chatInputStyles();

  const sendMessage = (roomId: string, message: string, user: {id: string | null, username: string | null}) => {
    if (!socket) return
    socket.emit('messages:add', {roomId, message, ...user});
  }

  const onClickSend = () => {
    if (userMessage.length === 0) return
    sendMessage(roomId, userMessage, user);
    setUserMessage('');
  }

  const onClickEnter = (e: any) => {
    if (userMessage.length === 0) return
    if (e.key === 'Enter') {
      sendMessage(roomId, userMessage, user);
      setUserMessage('');
    }
  }

  return (
      <Paper
        elevation={3}
        className={classes.chatInputPaper}
      >
        <InputBase
          className={classes.chatInputBase}
          placeholder={t('inputPlaceholder')}
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={onClickEnter}
        />
        <IconButton
          type="button"
          className={classes.chatInputIconButton}
          onClick={onClickSend}
          aria-label="send"
        >
          <SendIcon />
        </IconButton>
      </Paper>
  )
}