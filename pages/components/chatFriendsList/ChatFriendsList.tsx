import Paper from "@mui/material/Paper";
import {Avatar, Badge} from "@mui/material";
import {EllipseText} from "../ellipseText/EllipseText";
import * as React from "react";
import {useSelector} from "react-redux";
import {InitialState} from "../../../redux/reducers";
import {useChat} from "../../../hooks/useChat";
import {roomStyles} from "../../room/id.styles";
import {FriendRoomItem} from "./friendRoomItem/FriendRoomItem";
import {GroupRoomItem} from "./groupRoomItem/GroupRoomItem";
import {useEffect, useState} from "react";
import ApiServices from "../../../services/ApiServices";
import {useDispatch} from "react-redux";
import {setFullRooms} from "../../../redux/actions";
import {setCurrentRoom} from "../../../redux/actions";
import {useRouter} from "next/router";

export const ChatFriendList = () => {
  const dispatch = useDispatch();
  const {getAllUserRooms, getRoomInfo} = ApiServices();
  const classes = roomStyles();
  const router = useRouter();
  const { user, fullRooms } = useSelector((state: InitialState)  => state);
  const isBrowser = typeof window !== 'undefined';

  const loadRoomInfo = async () => {
    if (user.id) {
      const res = await getAllUserRooms(user.id);
      dispatch(setFullRooms(res.data))
    }
  }

  const clickItem = async  (roomId: string) => {
    await router.push(`/room/${roomId}`,undefined, { shallow: true });
    const room = await getRoomInfo(roomId);
    dispatch(setCurrentRoom(room.data))
  }

  useEffect(() => {
    loadRoomInfo()
  }, [user.id])
  return <>
      {isBrowser ? fullRooms.map((room) => {
        if (room.groupRoom && room.fullParticipants) {
          const title = room.fullParticipants
            .filter(participant => (participant.id !== user.id))
            .map(user => user.username)
            .join(', ')
          return <GroupRoomItem clickItem={clickItem} key={room.roomId} room={room} classes={classes} title={title}/>
        } else if (!room.groupRoom) {
          return <FriendRoomItem clickItem={clickItem} key={room.roomId} friend={room} classes={classes} />
        }
      }) : null}
    </>
}