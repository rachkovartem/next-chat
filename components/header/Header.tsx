import {AvatarGroup, Fab} from "@mui/material";
import * as React from 'react';
import ChatIcon from '@mui/icons-material/Chat';

import {useSelector} from "react-redux";
import {InitialState} from "../../redux/reducers";
import {StyledAvatar} from "../styledAvatar/StyledAvatar";

export default function Header(props: { room: any | null, setDrawerOpen: Function}) {
  const { user } = useSelector((state: InitialState)  => state);
  const { room, setDrawerOpen } = props;

  const avatar = (participant: {id: string, imagePath: string, username: string}) =>
    <StyledAvatar
      key={participant.id}
      display={'flex'}
      username={participant.username}
      imagePath={participant.imagePath}
      sx={{marginLeft: '6px'}}
    />

  return room && user.id
    ? room.groupRoom
      ? <div
        style={{
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
        display: 'flex',
        alignItems: 'center',
      }}>
        <Fab
          sx={{marginLeft: '10px'}}
          color='primary'
          size='small'
          onClick={() => setDrawerOpen(true)}
        >
          <ChatIcon />
        </Fab>
        <div style={{margin: 'auto'}}>
          <div>
            {room.participants.filter((participant: any) => participant.id !== user.id).map((participant: any) =>
              {
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
              })
            }
          </div>
        </div>
      </div>
    : null
}