import {Avatar, Badge} from "@mui/material";
import Paper from "@mui/material/Paper";
import * as React from "react";
import {InitialState} from "../../../../redux/reducers";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {ServerMessage} from "../../../../hooks/useNotification";

export const FriendRoomItem = ({friend, classes, clickItem}: {friend: any, classes: { userPaper: any , userPaperSelected: any}, clickItem: Function}) => {
  const { useChatState, currentRoomId, socket } = useSelector((state: InitialState)  => state);
  const { usersOnline, notification } = useChatState;
  const [isMounted, setIsMounted] = useState(false);
  const [lastMessage, setLastMessage] = useState(friend.lastMessage)
  const isOnline = (id: string) => usersOnline.some(idOnline => idOnline === id);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false)
  }, []);

  useEffect(() => {
    if (socket && isMounted) {
      socket.on('messages:add', (serverMessage: ServerMessage[]) => {
        if (serverMessage[0].roomId === friend.roomId) {
          setLastMessage(serverMessage[0])
        }
      });
    }
  }, [socket, isMounted])

  useEffect(() => {
    if (notification && isMounted) {
      setLastMessage(notification)
    }
  }, [notification, isMounted]);

  return <Paper
    className={currentRoomId === friend.roomId ? classes.userPaperSelected : classes.userPaper}
    key={friend.id}
    elevation={0}
    onClick={() => clickItem(friend.roomId)}
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
      color={isOnline(friend.id) ? "success" : "secondary"}
      variant="dot">
      <Avatar alt="Avatar" src={friend.imagePath ? `http://localhost:8080/${friend.imagePath}` : ''}/>
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
        {friend.username}
      </div>
      <div style={{
        fontSize: '12px',
      }}>
        {lastMessage.message}
      </div>
    </div>
  </Paper>
}