import {useRouter} from "next/router";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import * as React from 'react';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import Header from "../components/header/Header";
import {ChatWindow} from "../components/chatWindow/ChatWindow";
import {SideBar} from "../components/sideBar/sideBar";
import {InitialState} from "../../redux/reducers";
import {usePages} from "../../hooks/usePages";
import {useChat} from "../../hooks/useChat";
import {FriendsListItem} from "../components/friendsListItem/FriendsListItem";
import {ArrowTooltips} from "../components/tooltip/Tooltip";
import Paper from "@mui/material/Paper";
import {Avatar, AvatarGroup, Badge} from "@mui/material";
import {EllipseText} from "../components/ellipseText/EllipseText";
import {roomStyles} from "./id.styles";
import apiServices from "../../services/apiServices";
import {Message} from "../profile/[id]";
import Box from "@mui/material/Box";
import {ChatFriendList} from "../components/chatFriendsList/ChatFriendsList";

export default function Room(props: any) {
  const { locale, room } = props;
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user } = useSelector((state: InitialState)  => state);
  const { connectToRoom, usersOnline, lastMessages } = useChat();
  const { onLoadingPage } = usePages();
  const dispatch = useDispatch();

  useEffect(() => {
    onLoadingPage({connectToRoom, dispatch, router});
  }, [])

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
          <ChatFriendList/>
        </Box>
        <ChatWindow {...room}/>
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
      room: room.data,
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}