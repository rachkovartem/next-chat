import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import * as React from 'react';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";

import {ChatWindow} from "../components/chatWindow/ChatWindow";
import {SideBar} from "../components/sideBar/sideBar";
import {InitialState} from "../../redux/reducers";
import {usePages} from "../../hooks/usePages";
import {useChat} from "../../hooks/useChat";
import apiServices from "../../services/apiServices";
import {ChatFriendList} from "../components/chatFriendsList/ChatFriendsList";
import {setFullRooms} from "../../redux/actions";
import {Room as RoomInterface} from "../profile/[id]";
const {getAllUserRooms} = apiServices();

export default function Room(props: any) {
  const { locale, room } = props;
  const { t } = useTranslation('common');
  const router = useRouter();
  const { connectToRoom, notification } = useChat();
  const { onLoadingPage } = usePages();
  const dispatch = useDispatch();
  const { user, fullRooms } = useSelector((state: InitialState)  => state);
  const [currentRoom, setCurrentRoom] = useState<RoomInterface>(room);

  useEffect(() => {
    onLoadingPage({connectToRoom, dispatch, router});
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
  }, [notification])

  return (
    <div style={{display: 'grid', gridTemplateColumns: '88px 1fr'}}>
      <SideBar locale={locale}/>
      <div style={{display: 'grid', gridTemplateColumns: '300px 1fr'}}>
        <Box sx={{
          marginLeft: '10px',
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
          <ChatFriendList setCurrentRoom={setCurrentRoom}/>
        </Box>
        {currentRoom ? <ChatWindow {...currentRoom}/> : null}
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { getRoomInfo } = apiServices()
  const { id } = context.query;
  const { locale } = context;
  const room = await getRoomInfo(id);

  return {
    props: {
      room: room.data || null,
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}