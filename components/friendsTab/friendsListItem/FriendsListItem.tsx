import Paper from "@mui/material/Paper";
import {Avatar, Badge} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuComponent from "../../friendMenu/FriendMenu";
import * as React from "react";
import {useState} from "react";
import {useRouter} from "next/router";
import ApiServices from "../../../services/ApiServices";
import {User} from "../../../pages/profile/[id]";
import {useSelector} from "react-redux";
import {InitialState} from "../../../redux/reducers";
import {friendListItemStyles} from "./friendListItem.styles";
import {url} from "../../../helpers/constants";

export const FriendsListItem = (
  {
    user,
    id,
    groupChatMembers,
    setGroupChatMembers,
    enqueueSnackbar,
    onClickUser
  } : {
    user: User,
    id: string,
    groupChatMembers: {username: string, id: string}[],
    setGroupChatMembers: Function,
    enqueueSnackbar: Function,
    onClickUser: Function
  }) => {
  const { useChatState } = useSelector((state: InitialState)  => state);
  const { usersOnline } = useChatState;
  const router = useRouter();
  const { createRoom } = ApiServices();
  const classes = friendListItemStyles();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleClickMenuIcon = (event: any) => {
    event.stopPropagation()
    setMenuAnchorEl(event.currentTarget);
  };

  // const onClickUser = async (id1: string, id2: string) => {
  //   const res = await createRoom([id1, id2])
  //   if (res.status === 201) {
  //     await router.push(`/room/${res.data.roomId}`);
  //   }
  // }
  const menuProps = {user, id, menuAnchorEl, setMenuAnchorEl, groupChatMembers, setGroupChatMembers, enqueueSnackbar}
  const isOnline = (id: string) => usersOnline.some(idOnline => idOnline === id);

  return <Paper
    className={classes.userPaper}
    key={user.id}
    elevation={0}
    onClick={() => onClickUser(id, user.id)}
    data-testid="friendListItem"
  >
      <Badge
        sx={{
          marginLeft: '6px',
          '& .MuiBadge-colorSecondary': {
            backgroundColor: '#b2b2b2',
            left: '5px',
            bottom: '5px',
          },
          '& .MuiBadge-colorSuccess': {
            backgroundColor: '#4bb34b',
            bottom: '5px',
            left: '5px',
          }
        }}
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
        }}
        color={isOnline(user.id) ? "success" : "secondary"}
        variant="dot">
        <Avatar alt="Avatar" src={user.imagePath}/>
      </Badge>
    <div style={{marginLeft: '12px'}}>{user.username}</div>
    <KeyboardArrowDownIcon
      sx={{
        marginLeft: 'auto',
        marginRight: '10px',
        width: '18px',
        cursor: 'pointer'
      }}
      onClick={handleClickMenuIcon}
    />
    <MenuComponent {...menuProps} user={user}/>
  </Paper>
}