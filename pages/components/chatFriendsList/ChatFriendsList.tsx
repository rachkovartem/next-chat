import Paper from "@mui/material/Paper";
import {Avatar, Badge} from "@mui/material";
import {EllipseText} from "../ellipseText/EllipseText";
import * as React from "react";
import {useSelector} from "react-redux";
import {InitialState} from "../../../redux/reducers";
import {useChat} from "../../../hooks/useChat";
import {roomStyles} from "../../room/id.styles";
import {FriendRoomItem} from "../friendRoomItem/FriendRoomItem";
import {GroupRoomItem} from "../groupRoomItem/GroupRoomItem";
import {useState} from "react";

export const ChatFriendList = () => {
  const classes = roomStyles();
  const { user } = useSelector((state: InitialState)  => state);
  const { lastMessages } = useChat();
  const { friendsRoomsIds, fullRooms } = user;
  const isBrowser = typeof window !== 'undefined';
  const sortedRooms = [...fullRooms].sort((a: any, b: any) => {
    if (b.roomId in lastMessages) {
      return (Number(lastMessages[b.roomId].sendingDate) - Number(lastMessages[a.roomId].sendingDate))
    } else {return 0}
  })
  return <>
      {isBrowser ? sortedRooms.map(room => {
        if (room.groupRoom) {
          const title = room.fullParticipants
            .filter(participant => (participant.id !== user.id))
            .map(user => user.username)
            .join(', ')
          return <GroupRoomItem key={room.roomId} room={room} classes={classes} title={title}/>
        } else if (!room.groupRoom) {
            return <FriendRoomItem key={room.roomId} friend={room} classes={classes} />
        }
      }) : null}
    </>
}