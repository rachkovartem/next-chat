import Paper from "@mui/material/Paper";
import {Avatar} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuComponent from "../friendMenu/FriendMenu";
import * as React from "react";
import {useStyles} from "../../profile/id.styles";
import {useState} from "react";
import {useRouter} from "next/router";
import {t} from "i18next";
import apiServices from "../../../services/apiServices";
import {User} from "../../profile/[id]";

export const FriendsListItem = (
  {
    user,
    id,
    groupChatMembers,
    setGroupChatMembers,
    setSnackBarText
  } : {
    user: User,
    id: string,
    groupChatMembers: {username: string, id: string}[],
    setGroupChatMembers: Function,
    setSnackBarText: Function
  }) => {
  const router = useRouter();
  const { createRoom } = apiServices();
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleClickMenuIcon = (event: any) => {
    event.stopPropagation()
    setMenuAnchorEl(event.currentTarget);
  };

  const onClickUser = async (id1: string, id2: string) => {
    const res = await createRoom([id1, id2])
    if (res.status === 201) {
      await router.push(`/room/${res.data.roomId}`);
    }
  }

  const menuProps = {user, id, menuAnchorEl, setMenuAnchorEl, groupChatMembers, setGroupChatMembers, setSnackBarText}

  return <Paper
    className={classes.userPaper}
    key={user.id}
    elevation={3}
    onClick={() => onClickUser(id, user.id)}
  >
    <Avatar sx={{marginLeft: '6px'}} alt="Avatar" src={user.imagePath ? `http://localhost:8080/${user.imagePath}` : ''}/>
    <div style={{marginLeft: '12px'}}>{user.username}</div>
    <KeyboardArrowDownIcon
      sx={{marginLeft: 'auto', marginRight: '10px', width: '18px', cursor: 'pointer'}}
      onClick={handleClickMenuIcon}
    />
    <MenuComponent {...menuProps} user={user}/>
  </Paper>
}