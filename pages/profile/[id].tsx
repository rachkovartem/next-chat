import 'react-image-crop/dist/ReactCrop.css';
import {Avatar, Button, Chip, ListItem, Menu, MenuItem, Modal} from "@mui/material";
import {useRouter} from "next/router";
import apiServices from "../../services/apiServices";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Header from "../components/header/Header";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useEffect, useState} from "react";
import { Crop } from '../crop/Crop';
import type { AppContext } from 'next/app';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useTranslation} from "next-i18next";
import {useReducer} from "react";
import {useStyles} from "./id.styles";
import {SnackBar} from "../components/snackBar/SnackBar";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {AutocompleteFriendInput} from "../components/autocompleteFriendInput/AutocompleteFriendInput";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {data} from "browserslist";

export interface User {
  id: string,
  email: string,
  username: string,
  imagePath: string,
  friends: string[],
  objFriends: User[],
  friendRequests: string[],
  password?: string
}

interface InReq {
  id: string,
  userSenderId: string,
  userRecipientId: string,
  userRecipientStatus: boolean,
  sender: User,
}

interface OutReq {
  id: string,
  userSenderId: string,
  userRecipientId: string,
  userRecipientStatus: boolean,
  recipient: User,
}

interface Context extends AppContext {
  locale: string,
  params: { id: string }
}

const initialState = {tab: 'friends'};

function reducer(state: {tab: string}, action: string) {
  switch (action) {
    case 'in':
      return {tab: 'in'};
    case 'out':
      return {tab: 'out'};
    case 'friends':
      return {tab: 'friends'};
    default:
      throw new Error();
  }
}

export default function Profile (props: { user: User, users: User[], locale: string, inReqs: InReq[], outReqs: OutReq[] }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user, users, inReqs, outReqs } = props;
  const { id, friends, username, imagePath, objFriends } = user;
  const { createRoom, approveFriendReq, rejectFriendReq, removeFriend } = apiServices();
  const [file, setFile] = useState<File | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [snackBarText, setSnackBarText] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [groupChatMembers, setGroupChatMembers] = useState([{username: 'vasya', id: '1'}, {username: 'kolya', id: '2'}])
  const open = Boolean(menuAnchorEl);
  const handleClickMenuIcon = (event: any) => {
    event.stopPropagation()
    setMenuAnchorEl(event.currentTarget);
  };
  const handleClickMenu = (e: any) => {
    if (e) {
      e.stopPropagation();
    }
    setMenuAnchorEl(null);
  };
  const classes = useStyles();

  const onClickUser = async (id1: string, id2: string) => {
    const res = await createRoom([id1, id2])
    if (res.status === 201) {
      await router.push(`/room/${res.data.roomId}`);
    }
  }

  const onChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  }

  const onClickApproveReq = async (idUser: string, idFriend: string, idReq: string) => {
    const res = await approveFriendReq(idUser, idFriend, idReq);
    console.log(res.data)
    window.location.reload()
  }

  const onClickRejectReq = async (idUser: string, idFriend: string, idReq: string) => {
    const res = await rejectFriendReq(idUser, idFriend, idReq);
    console.log(res.data)
    window.location.reload()
  }

  const onClickRemoveFriend = async (e: any, idUser: string, idFriend: string) => {
    handleClickMenu(e);
    const res = await removeFriend(idUser, idFriend);
    console.log(res.data)
    window.location.reload()
  }

  const onClickAddToGroupChat = async (e: any, id: string, username: string) => {
    handleClickMenu(e);
    if (groupChatMembers.some(member => member.id === id)) {
      setSnackBarText(t('userAlreadyAdded'))
      return
    }
    setGroupChatMembers((prevState) => [...prevState, {id, username}])
    console.log(groupChatMembers)
  }

  const friendsDiv = <div style={{width: '100%', display: state.tab === 'friends' ? 'block' : 'none'}}>
    {objFriends
      .filter((user) => user.id !== id)
      .map((user) => (
        <Paper
          className={classes.userPaper}
          key={user.id}
          elevation={3}
          onClick={() => onClickUser(id, user.id)}
        >
          <Avatar sx={{marginLeft: '6px'}} alt="Avatar" src={user.imagePath ? `http://localhost:8080/${user.imagePath}` : ''}/>
          <div style={{marginLeft: '12px'}}>{user.username}</div>
          <KeyboardArrowDownIcon
            sx={{marginLeft: 'auto', marginRight: '10px', width: '18px', cursor: 'pointer'}}
            onClick={handleClickMenuIcon}/>
          <Menu
            id="basic-menu"
            autoFocus={false}
            anchorEl={menuAnchorEl}
            open={open}
            onClose={handleClickMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={(e) => onClickAddToGroupChat(e, user.id, user.username)}>
              <GroupAddIcon sx={{marginRight: '10px'}}/>
              {t('addToGroupChat')}
            </MenuItem>
            <MenuItem onClick={(e) => onClickRemoveFriend(e, id, user.id)}>
              <PersonRemoveIcon sx={{marginRight: '10px'}}/>
              {t('removeFriend')}
            </MenuItem>
          </Menu>
        </Paper>)
      )
    }
  </div>
  const inReqsDiv = <div style={{width: '100%', display: state.tab === 'in' ? 'block' : 'none'}}>
    {inReqs.map((req: any) => {
      return <Paper
        className={classes.userPaperNoCursor}
        key={req.id}
        elevation={3}
      >
        <Avatar
            sx={{marginLeft: '6px'}}
            alt="Avatar"
            src={req.sender.imagePath ? `http://localhost:8080/${req.sender.imagePath}` : ''}/>
        <div style={{marginLeft: '12px'}}>{req.sender.username}</div>
        <AddCircleRoundedIcon
            sx={{marginLeft: 'auto', width: '18px', cursor: 'pointer'}}
            onClick={() => onClickApproveReq(id, req.userSenderId, req.id)}
        />
        <RemoveCircleOutlineRoundedIcon
            sx={{marginLeft: '5px', marginRight: '10px', width: '18px', cursor: 'pointer'}}
            onClick={() => onClickRejectReq(id, req.userSenderId, req.id)}
        />
      </Paper>
    })}
  </div>
  const outReqsDiv = <div style={{width: '100%', display: state.tab === 'out' ? 'block' : 'none'}}>
    {outReqs.map((req: any) => {
      return <Paper
        className={classes.userPaperNoCursor}
        key={req.id}
        elevation={3}
      >
        <Avatar sx={{marginLeft: '6px'}} alt="Avatar"
                src={req.recipient.imagePath ? `http://localhost:8080/${req.recipient.imagePath}` : ''}/>
        <div style={{marginLeft: '12px'}}>{req.recipient.username}</div>
        <RemoveCircleOutlineRoundedIcon
            sx={{marginLeft: 'auto', marginRight: '10px', width: '18px', cursor: 'pointer'}}
            onClick={() => onClickRejectReq(id, req.userRecipientId, req.id)}
        />
      </Paper>
    })}
  </div>
  const groupChatInput = <Paper
    className={classes.groupChatPaper}
  >
    {groupChatMembers.map((member) => {
      return (
          <Chip
            key={member.id}
            label={member.username}
            onDelete={(e) => console.log(1)}
          />
      );
    })}
  </Paper>


  return (
    <div className={classes.profile}>
      <Header {...props}/>
      <Box
        className={classes.userProfileBox}
      >
        <div
          className={classes.avatarWrapper}
        >
          <Avatar
            className={classes.avatar}
            alt="Avatar"
            src={imagePath ? `http://localhost:8080/${imagePath}` : ''}
          />
          <p className={classes.username}>{username}</p>
          <Button
            className={classes.avatarButton}
            variant="contained"
            component="label"
          >
            <AddAPhotoIcon />
            <input
              type="file"
              onChange={onChangeFile}
              hidden
            />
          </Button>
        </div>
        <div className={classes.friendsWrapper}>
          <AutocompleteFriendInput setSnackBarText={setSnackBarText} id={id}/>
          {groupChatInput}
          <ButtonGroup
              className={classes.buttonsGroup}
              size="medium"
              aria-label="small button group"
          >
            <Button
                onClick={() => dispatch('friends')}
                className={classes.button}
                key="friends"
            >
              {t('friends')}
            </Button>
            <Button
                onClick={() => dispatch('in')}
                className={classes.button}
                key="inRequests"
            >
              {t('inRequests')}
            </Button>
            <Button
                onClick={() => dispatch('out')}
                className={classes.button}
                key="outRequests"
            >
              {t('outRequests')}
            </Button>
          </ButtonGroup>
          {friendsDiv}
          {inReqsDiv}
          {outReqsDiv}
        </div>
      </Box>
      <Modal
        open={Boolean(file)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Crop image={file} id={id} setFile={setFile}/>
      </Modal>
      <SnackBar text={snackBarText} setText={setSnackBarText} />
    </div>
  )
}

export async function getServerSideProps(context: Context) {
  const { locale } = context;
  const { getUserById, getAllUsers, getRequests } = apiServices();
  const responseUser = await getUserById(context.params.id);
  const { id, email, registration, username, imagePath, friends, friendsRequests, objFriends} = responseUser.data;
  const requests = await getRequests(friendsRequests, id);
  const res = await getAllUsers();

  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
      user: {
        id: id || null,
        email: email || null,
        username: username || null,
        imagePath: imagePath || null,
        friends: friends || [],
        objFriends: objFriends || []
      },
      users: res.data || [],
      inReqs: requests.data.inReqs || [],
      outReqs: requests.data.outReqs || [],
    },

  }
}