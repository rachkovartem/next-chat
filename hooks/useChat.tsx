import {io} from "socket.io-client";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Message} from "../pages/profile/[id]";
import {Avatar} from "@mui/material";
import * as React from "react";
import {useSnackbar} from "notistack";
import {useDispatch, useSelector} from "react-redux";
import {InitialState} from "../redux/reducers";
import {
  setUseChatSateLastMessages,
  setUseChatSateMessages,
  setUseChatSateNotification, setUseChatSateSocketLoading,
  setUseChatSateUser,
  setUseChatSateUsersOnline, setUseChatStateConnected
} from "../redux/actions";
import ApiServices from "../services/ApiServices";

export interface ServerMessage {
  messageId: string,
  roomId: string,
  senderId: string,
  senderUsername: string,
  message: string,
  sendingDate: string,
  senderAvatar: string,
}

const SERVER_URL = 'http://localhost:8080';

export const useChat = () => {
  const { getAllRoomsIds } = ApiServices();
  const dispatch = useDispatch();
  const { useChatState } = useSelector((state: InitialState)  => state);
  const { connected, usersOnline, messages, lastMessages } = useChatState;
  const { enqueueSnackbar } = useSnackbar();
  const socketRef = useRef<any>(null);
  const isServer = useMemo(() => typeof window === "undefined", []);
  let id: string | null;
  if (!isServer) {
    id = localStorage.getItem('id');
  }

  const wentOfflineListener = useCallback((wentOfflineId: string) => {
    const index = usersOnline.indexOf(wentOfflineId)
    const newArr = [...usersOnline]
    newArr.splice(index, 1);
    dispatch(setUseChatSateUsersOnline(newArr));
  }, [usersOnline]);

  const handleLoading = useCallback(async (userId: string) => {
    connectToRoom({userId});
    getFriendsOnline();
    getLastMessages();
  }, []);

  useEffect(() => {
    if (!id) return
    socketRef.current = io(SERVER_URL, {
      query : {
        'id': id,
        'cookies': document.cookie
      },
    });

    handleLoading(id)

    socketRef.current.on('friends:online', (friendsOnline: string[]) => {
      dispatch(setUseChatSateUsersOnline(friendsOnline));
    });

    socketRef.current.on('friends:wentOffline', wentOfflineListener);

    socketRef.current.on('friends:wentOnline', (wentOnlineId: string) => {
      const friendsOnline = usersOnline.includes(wentOnlineId) ? usersOnline : [...usersOnline.concat(wentOnlineId)]
      dispatch(setUseChatSateUsersOnline(friendsOnline));
    });

    // socketRef.current.on('system:connected', (serverMessages: any) => {
    //   dispatch(setUseChatStateConnected(true))
    //   // console.log(serverMessages);
    // });

    socketRef.current.on(`messages:get${id}`, (serverMessages: any) => {
      dispatch(setUseChatSateMessages([...serverMessages]));
    });

    socketRef.current.on(`messages:getLastMessages${id}`, (messages: any) => {
      dispatch(setUseChatSateLastMessages({...messages}));
    });

    socketRef.current.on('messages:add', (serverMessage: ServerMessage[]) => {
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

    socketRef.current.on('system', (serverMessage: any) => {
      console.log(serverMessage)
    });

    return () => socketRef.current.disconnect()
  }, [])

  const disconnect = useCallback(() => {
    socketRef.current.disconnect()
  }, []);

  const connectToRoom = useCallback(({userId, roomId}: {userId: string | null, roomId?: string | undefined} ) => {
    if (!roomId) return socketRef.current.emit('system:connect', { userId, roomId: userId });
    socketRef.current.emit('system:connect', { userId, roomId });
  }, [])

  const getFriendsOnline = useCallback(() => {
    socketRef.current.emit('friends:online');
  }, []);

  const getLastMessages = useCallback(() => {
    socketRef.current.emit('messages:getLastMessages');
  }, []);

  const getMessages = useCallback(( roomId: string ) => {
    socketRef.current.emit('messages:get', { roomId });
  }, []);

  const sendMessage = useCallback((roomId: string, message: string, user: {id: string | null, username: string | null}) => {
    socketRef.current.emit('messages:add', {roomId, message, ...user});
  }, [])

  const showNotification = useCallback((notification: ServerMessage | null) => {
    if (notification) {
      enqueueSnackbar(<div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}>
          <Avatar
            alt="Avatar"
            src={notification ? `http://localhost:8080/${notification.senderAvatar}` : ''}
          />
          <div
            style={{
              maxWidth: '288px',
              marginLeft: '10px',
              fontWeight: 'bold',
            }}
          >
          </div>
          {notification?.senderUsername}
        </div>
        <div
          style={{maxWidth: '288px'}}
        >
          {notification?.message}
        </div>
      </div>);
    }
  }, [])

  return {
    sendMessage,
    getMessages,
    connectToRoom,
    disconnect,
    showNotification
  }
}