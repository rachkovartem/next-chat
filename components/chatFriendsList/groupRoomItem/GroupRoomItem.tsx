import {Avatar} from "@mui/material";
import {EllipseText} from "../../ellipseText/EllipseText";
import Paper from "@mui/material/Paper";
import * as React from "react";
import {Room} from "../../../pages/profile/[id]";
import {useEffect, useState} from "react";
import {FriendRoom, InitialState} from "../../../redux/reducers";
import {useSelector} from "react-redux";
import {ServerMessage} from "../../../hooks/useNotification";


export const GroupRoomItem = (
  {
    room,
    title,
    clickItem
  } : {
    room: Room | FriendRoom,
    title: string,
    clickItem: Function,
  }) => {

  const [lastMessage, setLastMessage] = useState(room.lastMessage);
  const [isMounted, setIsMounted] = useState(false);
  const { currentRoomId, socket, useChatState } = useSelector((state: InitialState)  => state);
  const { notification } = useChatState;

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (socket && isMounted) {
      socket.on('messages:add', (serverMessage: ServerMessage[]) => {
        if (serverMessage[0].roomId === room.roomId) {
          setLastMessage(serverMessage[0])
        }
      });
    }
  }, [socket, isMounted]);

  useEffect(() => {
    if (notification && isMounted) {
      setLastMessage(notification)
    }
  }, [notification, isMounted]);

  return <Paper
    sx={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      cursor: 'pointer',
      marginTop: '5px',
      height: 50,
      backgroundColor: currentRoomId === room.roomId ? '#e8e8e8' : 'rgba(232,232,232,0)',
    }}
    key={room.roomId}
    onClick={() => clickItem(room.roomId)}
    elevation={0}
    data-testid="roomItem"
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
      <div>{lastMessage.message}</div>
    </div>
  </Paper>
}