import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import * as React from 'react';
import {memo, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';

import {ChatWindow} from "../components/chatWindow/ChatWindow";
import {SideBar} from "../components/sideBar/sideBar";
import {InitialState} from "../../redux/reducers";
import {PagesServices} from "../../services/PagesServices";
import {useChat} from "../../hooks/useChat";
import ApiServices from "../../services/ApiServices";
import {ChatFriendList} from "../components/chatFriendsList/ChatFriendsList";
import {setFullRooms} from "../../redux/actions";
import {setCurrentRoom} from "../../redux/actions";

export default function Room(props: any) {
  const { locale, id } = props;
  const {
    getRoomInfo,
    getUserById,
    getRequests,
    getAllRoomsIds,
    check,
  } = ApiServices();

  const { t } = useTranslation('common');
  const { onLoadingPage } = PagesServices();
  const dispatch = useDispatch();
  const { currentRoom, fullRooms, useChatState } = useSelector((state: InitialState)  => state);
  const { notification, socketLoading } = useChatState;
  const [pageLoading, setPageLoading] = useState(true);
  const loadRoom = async () => {
    let room = await getRoomInfo(id);
    if (!('data' in room)) {
      room.data = null
    }
    dispatch(setCurrentRoom(room.data));
  }

  useEffect(() => {
    loadRoom()
    onLoadingPage(getUserById, getRequests, getAllRoomsIds, check);
  }, [])

  useEffect(() => {
    if (notification) {
      const newState = [...fullRooms];
      const index = newState.findIndex(el => el.roomId === notification?.roomId);
      newState[index].lastMessage = notification;
      const deleted = newState.splice(index, 1);
      newState.unshift(deleted[0])
      const newRooms = fullRooms.length < 2
        ? fullRooms
        : newState;
      dispatch(setFullRooms(newRooms))
    }
  }, [notification]);

  const spinner =  socketLoading ? <CircularProgress /> : null;
  const chatView = currentRoom && !socketLoading ? <ChatWindow {...currentRoom}/> : null;
  return (
    <div style={{display: 'grid', gridTemplateColumns: '88px 1fr'}}>
      <SideBar locale={locale}/>
      <div style={{display: 'grid', gridTemplateColumns: '300px 1fr'}}>
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
          <ChatFriendList />
        </Box>
        {spinner}
        {chatView}
      </div>
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