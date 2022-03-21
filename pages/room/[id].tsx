import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import * as React from 'react';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';

import {ChatWindow} from "../../components/chatWindow/ChatWindow";
import {SideBar} from "../../components/sideBar/sideBar";
import {InitialState} from "../../redux/reducers";
import {PagesServices} from "../../services/PagesServices";
import ApiServices from "../../services/ApiServices";
import {ChatFriendList} from "../../components/chatFriendsList/ChatFriendsList";
import {
  setChatWindowLoading,
  setCurrentRoomId,
  setSocket, setUser,
} from "../../redux/actions";
import {setCurrentRoom} from "../../redux/actions";
import {useSocket} from "../../hooks/useSocket";

export default function Room(props: any) {
  const { locale, id } = props;
  const {
    getRoomInfo,
    getUserById,
    getRequests,
    getAllRoomsIds,
    check,
  } = ApiServices();

  const { createSocket, setOnlineListeners } = useSocket();
  const { t } = useTranslation('common');
  const { onLoadingPage, pageLoading } = PagesServices();
  const dispatch = useDispatch();
  const { socket, currentRoom, useChatState, chatWindowLoading } = useSelector((state: InitialState)  => state);
  const { usersOnline } = useChatState;
  const [initialRender, setInitialRender] = useState(true);

  const loadRoom = async (id: string) => {
    dispatch(setCurrentRoomId(id));
    let room = await getRoomInfo(id);
    if (!('data' in room)) {
      room.data = null
    }
    dispatch(setCurrentRoom(room.data));
    dispatch(setChatWindowLoading(false));
  }

  useEffect(() => {
    if (initialRender) {
      loadRoom(id)
      setInitialRender(false);
    }
    return () => {
      if (socket) socket.removeAllListeners();
      dispatch(setCurrentRoomId(null));
      dispatch(setCurrentRoom(null));
    };
  }, [])

  useEffect(() => {
    const socket = createSocket();
    dispatch(setSocket(socket));
    const res = onLoadingPage(getUserById, getRequests, getAllRoomsIds, check);
    res.then(res => dispatch(setUser(res)))
  }, [])

  useEffect(() => {
    if (socket) {
      setOnlineListeners({socket, usersOnline})
    }
  }, [socket])

  const chatSpinner = chatWindowLoading ? <CircularProgress sx={{margin: 'auto'}} /> : null;
  const chatView = currentRoom && socket && !chatWindowLoading ? <ChatWindow {...currentRoom} /> : null;
  return (
    <div style={{display: 'grid', gridTemplateColumns: '88px 1fr'}}>
      <SideBar locale={locale}/>
      {
        pageLoading
          ? <CircularProgress sx={{position: 'absolute', top: '50%', left: '50%'}} />
          : <div style={{display: 'grid', gridTemplateColumns: '300px 1fr'}}>
              <Box sx={{
                paddingLeft: '3px',
                height: '100vh',
                overflowY: 'scroll',
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
              }}>
                <ChatFriendList/>
              </Box>
              {chatSpinner}
              {chatView}
          </div>
      }
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const { locale } = context;

  return {
    props: {
      id,
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}