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

export default function Room(props: any) {
  const { locale, room } = props;
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user } = useSelector((state: InitialState)  => state);
  const {connectToRoom, usersOnline} = useChat();
  const { onLoadingPage } = usePages();
  const dispatch = useDispatch();
  const isBrowser = typeof window !== 'undefined';
  const classes = roomStyles();
  const { getLastMessages } = apiServices();
  const [lastMessages, setLastMessages] = useState({})

  const loadLastMessages = async () => {
    const messages = await getLastMessages(user.groupRooms, user.friends, user.id)
    console.log(messages.data)
    setLastMessages(messages.data)
    console.log(lastMessages)
  }

  useEffect(() => {
    onLoadingPage({connectToRoom, dispatch, router})
  }, [])

  useEffect(() => {
    loadLastMessages()
  }, [user])

  const isOnline = (id: string) => usersOnline.some(idOnline => idOnline === id);
  return (
    <div style={{display: 'grid', gridTemplateColumns: '88px 1fr'}}>
      <SideBar locale={locale}/>
      <div style={{display: 'grid', gridTemplateColumns: '300px 1fr'}}>
        <div style={{marginLeft: '10px'}}>
          {
            isBrowser ? user.objFriends
              .filter((user) => user.id !== props.id)
              .map((user) => (
                <Paper
                  sx={{background: 'none'}}
                  className={classes.userPaper}
                  key={user.id}
                  elevation={0}
                >
                  <Badge
                    sx={{
                      marginLeft: '6px',
                      '& .MuiBadge-colorSecondary': {
                        backgroundColor: '#b2b2b2',
                      }
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    color={isOnline(user.id) ? "success" : "secondary"}
                    variant="dot">
                    <Avatar alt="Avatar" src={user.imagePath ? `http://localhost:8080/${user.imagePath}` : ''}/>
                  </Badge>
                  <div style={{
                    display: 'grid',
                    gridTemplateRows: '1fr 1fr',
                    marginLeft: '12px'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {user.username}
                    </div>
                    <div style={{
                      fontSize: '12px',
                    }}>
                      {user.id in lastMessages ? lastMessages[user.id].message : null}
                    </div>
                  </div>
                </Paper>
              )) : null
          }
          {isBrowser ? user.fullGroupRooms
            .map((room) => {
              const text = room.fullParticipants
                .filter(participant => (participant.id !== user.id))
                .map(user => user.username)
                .join(', ')
              return (<Paper
                sx={{background: 'none'}}
                className={classes.userPaper}
                key={room.roomId}
                // onClick={() => onClickRoom(room.roomId)}
                elevation={0}
              >
                <Avatar
                  key={room.roomId}
                  sx={{marginLeft: '6px'}}
                  alt={room.roomId}
                  src={''}
                >
                  {room.roomId[0]+room.roomId[1]}
                </Avatar>
                <div style={{
                  display: 'grid',
                  gridTemplateRows: '1fr 1fr',
                  paddingRight: '5px',
                  maxHeight: '100%',
                  marginLeft: '12px',
                  overflow: 'hidden',
                  fontSize: '12px'
                }}
                >
                  <div
                    style={{
                      fontWeight: 'bold',
                      width: '100%',
                    }}>
                    <EllipseText text={text} maxLine={1}/>
                  </div>
                  <div>{room.roomId in lastMessages ? lastMessages[room.roomId].message : null}</div>
                </div>
              </Paper>)
            }) : null
          }
        </div>
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