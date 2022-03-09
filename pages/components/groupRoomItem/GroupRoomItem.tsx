import {Avatar} from "@mui/material";
import {EllipseText} from "../ellipseText/EllipseText";
import Paper from "@mui/material/Paper";
import * as React from "react";
import {Message, Room} from "../../profile/[id]";
import {useChat} from "../../../hooks/useChat";
import {useEffect, useState} from "react";


export const GroupRoomItem = (
  {
    room,
    classes,
    title
  }
  :
  {
    room: Room,
    classes: {userPaper: any},
    title: string
  }) => {
  const [message, setMessage] = useState('');
  const { lastMessages } = useChat();

  useEffect(() => {
    if (room.roomId in lastMessages) {
      setMessage(lastMessages[room.roomId].message)
    }
  }, [lastMessages])


  return <Paper
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
        <EllipseText text={title} maxLine={1}/>
      </div>
      <div>{message}</div>
    </div>
  </Paper>
}