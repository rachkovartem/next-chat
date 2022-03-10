import {Avatar, Badge} from "@mui/material";
import Paper from "@mui/material/Paper";
import * as React from "react";
import {useChat} from "../../../../hooks/useChat";
import {FriendRoom, InitialState} from "../../../../redux/reducers";
import {makeStyles} from "@material-ui/core/styles";
import {Message, Room, User} from "../../../profile/[id]";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export const FriendRoomItem = ({friend, classes, clickItem}: {friend: any, classes: { userPaper: any }, clickItem: Function}) => {
  const { usersOnline } = useChat();
  const { user, fullRooms } = useSelector((state: InitialState)  => state);
  const { lastMessages } = useChat();
  const { friendsRoomsIds } = user;
  const [message, setMessage] = useState('');
  const isOnline = (id: string) => usersOnline.some(idOnline => idOnline === id);

  return <Paper
    sx={{background: 'none'}}
    className={classes.userPaper}
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
        {friend.lastMessage.message}
      </div>
    </div>
  </Paper>
}