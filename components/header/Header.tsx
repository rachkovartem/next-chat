import {Avatar, AvatarGroup} from "@mui/material";
import * as React from 'react';

import {useSelector} from "react-redux";
import {InitialState} from "../../redux/reducers";
import {url} from "../../helpers/constants";

export default function Header(props: { room: any | null}) {
  const { user } = useSelector((state: InitialState)  => state);
  const { room } = props;

  const avatar = (participant: {id: string, imagePath: string}) =>
    <Avatar
      key={participant.id}
      sx={{marginLeft: '6px'}}
      alt="Avatar"
      src={participant.imagePath}
    />

  return room && user.id
    ? room.groupRoom
      ? <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#EAEAEA',
      }}
      >
        <AvatarGroup sx={{
          marginTop: '5px',
          marginBottom: '5px',
          justifyContent: 'flex-end',
        }} max={4} spacing={'small'} total={room.participants.length}>
          {room.participants
            .filter((participant: any) => participant.id !== user.id)
            .map((participant: any) => {
              return avatar(participant)
            })
          }
        </AvatarGroup>
        <p style={{margin: '0 0 0 10px'}}>{room.roomId}</p>
      </div>
      : <div style={{
        width: '100%',
        backgroundColor: '#EAEAEA',
      }}>
        {room.participants.filter((participant: any) => participant.id !== user.id).map((participant: any) => {
        return (
          <div
            key={participant.id}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5px',
              marginBottom: '5px',
            }}
          >
            {avatar(participant)}
            <div style={{marginLeft: '12px'}}>{participant.username}</div>
          </div>)
      })}</div>
    : null
}