import {Button, IconButton, InputBase, TextField} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {ServerMessage} from "../../../hooks/useNotification";
import {useTranslation} from "next-i18next";
import Paper from "@mui/material/Paper";
import SendIcon from '@mui/icons-material/Send';
import {useDispatch, useSelector} from "react-redux";
import {InitialState} from "../../../redux/reducers";
import {setUseChatSateLastMessages, setUseChatSateMessages, setUseChatSateNotification} from "../../../redux/actions";


export const ChatInput = ({roomId}: { roomId: string }) => {
  const dispatch = useDispatch();
  const [userMessage, setUserMessage] = useState('');
  const { user, socket, useChatState } = useSelector((state: InitialState)  => state);
  const { messages, lastMessages } = useChatState;
  const { t } = useTranslation('common');

  useEffect(() => {
    if (!socket) return
    socket.on('messages:add', (serverMessage: ServerMessage[]) => {
      const newMessages = messages.length === 0 || serverMessage[0].roomId === messages[0].roomId
        ? [...messages, ...serverMessage]
        : [...messages]
      dispatch(setUseChatSateMessages(newMessages));
      dispatch(setUseChatSateNotification(serverMessage[0]));
      const roomId = serverMessage[0].roomId;
      const newLastMessages = {...lastMessages};
      newLastMessages[roomId] = serverMessage[0];
      dispatch(setUseChatSateLastMessages(newLastMessages));
    });
  }, [])

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