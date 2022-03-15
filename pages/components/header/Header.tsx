import {Avatar, AvatarGroup, Button} from "@mui/material";
import * as React from 'react';

import {useChat} from '../../../hooks/useChat';
import {useSelector} from "react-redux";
import {InitialState} from "../../../redux/reducers";

export default function Header(props: { room: any | null}) {
  const { useChatState } = useSelector((state: InitialState)  => state);
  const { user } = useChatState;
  const { room } = props;

  const avatar = (participant: {id: string, imagePath: string}) =>
    <Avatar
      key={participant.id}
      sx={{marginLeft: '6px'}}
      alt="Avatar"
      src={participant.imagePath ? `http://localhost:8080/${participant.imagePath}` : ''}
    />

  const chatName = room && user.id
    ? room.groupRoom
      ? <div style={{
        display: 'flex',
        marginTop: '10px',
        justifyContent: 'center',
        alignItems: 'center'}}
        >
          <AvatarGroup sx={{justifyContent: 'flex-end'}} max={4} spacing={'small'} total={room.participants.length}>
            {room.participants
              .filter((participant: any) => participant.id !== user.id)
              .map((participant: any) => {
                return avatar(participant)})
              }
          </AvatarGroup>
          <p style={{margin: '0 0 0 10px'}}>{room.roomId}</p>
        </div>
      : <div>{room.participants.filter((participant: any) => participant.id !== user.id).map((participant: any) => {
        return (
          <div
            key={participant.id}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5px',
            }}
          >
            {avatar(participant)}
            <div style={{marginLeft: '12px'}}>{participant.username}</div>
          </div>)
      })}</div>
    : null;

  return chatName
}