import 'react-image-crop/dist/ReactCrop.css';
import {Avatar, AvatarGroup, Button, Chip, Modal} from "@mui/material";
import {useRouter} from "next/router";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useState} from "react";
import type { AppContext } from 'next/app';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useTranslation} from "next-i18next";
import {useReducer} from "react";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import {FriendsListItem} from "../components/friendsListItem/FriendsListItem";
import apiServices from "../../services/apiServices";
import {SnackBar} from "../components/snackBar/SnackBar";
import Header from "../components/header/Header";
import { Crop } from '../crop/Crop';
import {useStyles} from "./id.styles";
import {AutocompleteFriendInput} from "../components/autocompleteFriendInput/AutocompleteFriendInput";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuComponent from "../components/friendMenu/FriendMenu";

interface Room {
  roomId: string;
  participants: string;
  groupRoom: boolean;
  creationDate: string;
  fullParticipants: User[]
}

export interface User {
  id: string,
  email: string,
  username: string,
  imagePath: string,
  friends: string[],
  objFriends: User[],
  friendRequests: string[],
  fullGroupRooms: Room[]
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
    case 'groups':
      return {tab: 'groups'};
    default:
      throw new Error();
  }
}

export default function Profile (props: { user: User, users: User[], locale: string, inReqs: InReq[], outReqs: OutReq[] }) {
  const { t } = useTranslation('common');
  const { user, inReqs, outReqs } = props;
  const { id, username, imagePath, objFriends, fullGroupRooms } = user;
  const { approveFriendReq, rejectFriendReq, removeFriend, createGroupRoom } = apiServices();
  const [file, setFile] = useState<File | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [snackBarText, setSnackBarText] = useState(null);
  const classes = useStyles();
  const [groupChatMembers, setGroupChatMembers] = useState<{username: string, id: string}[]>([])
  const isBrowser = typeof window !== 'undefined';
  const router = useRouter();

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

  const onClickCreateGroupChat = async (members: {username: string, id: string}[]) => {
    const res = await createGroupRoom(members);
    if ('data' in res && typeof res.data === 'string') {
      setSnackBarText(t(res.data))
      return
    } else if ('data' in res) {
      await router.push(`/room/${res.data.roomId}`);
    } else {
      console.log('err')
    }
  }

  const onClickRoom = async (roomId: string) => {
      await router.push(`/room/${roomId}`);
  }

  const friendsListItemProps = {id, groupChatMembers, setGroupChatMembers, setSnackBarText};
  const friendsDiv = <div style={{width: '100%', display: state.tab === 'friends' ? 'block' : 'none'}}>
    {isBrowser ? objFriends
      .filter((user) => user.id !== id)
      .map((user) => (
        <FriendsListItem key={user.id} user={user} {...friendsListItemProps}/>
      )) : null
    }
  </div>

  const groupsDiv = <div style={{width: '100%', display: state.tab === 'groups' ? 'block' : 'none'}}>
    {isBrowser ? fullGroupRooms
      .map((room) => (<Paper
      className={classes.userPaper}
      key={room.roomId}
      onClick={() => onClickRoom(room.roomId)}
      elevation={3}
      >
        <AvatarGroup sx={{paddingLeft: '20px'}} max={4} spacing={'small'} total={room.fullParticipants.length}>
          {room.fullParticipants.map( user => {
            return (
              <Avatar
                key={user.id}
                sx={{marginLeft: '6px'}}
                alt="Avatar"
                src={user.imagePath ? `http://localhost:8080/${user.imagePath}` : ''}
              />)
          })}
        </AvatarGroup>
        <div style={{marginLeft: '12px'}}>{room.roomId}</div>
      </Paper> )) : null
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

  const groupChatInput = groupChatMembers.length > 0
    ? <Paper className={classes.groupChatPaper}>
    {groupChatMembers.map((member) => {
      return (
          <Chip
            key={member.id}
            label={member.username}
            onDelete={() => setGroupChatMembers((prevState) => prevState.filter(item => item.id !== member.id))}
          />
      );
    })}
      <AddCircleIcon
        sx={{alignSelf: 'center', marginLeft: 'auto', cursor: 'pointer'}}
        onClick={() => onClickCreateGroupChat([...groupChatMembers, { username: user.username, id: user.id }])}
      />
  </Paper>
    : null;

  return (
    <div className={classes.profile}>
      <Header {...props}/>
      <Box className={classes.userProfileBox}>
        <div className={classes.avatarWrapper}>
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
              onClick={() => dispatch('groups')}
              className={classes.button}
              key="groups"
            >
              {t('groups')}
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
          <div style={{ width: 330 }}>
            {friendsDiv}
            {groupsDiv}
            {inReqsDiv}
            {outReqsDiv}
          </div>
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
  const { id, email, username, imagePath, friends, friendsRequests, objFriends, fullGroupRooms} = responseUser.data;
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
        objFriends: objFriends || [],
        fullGroupRooms: fullGroupRooms || []
      },
      users: res.data || [],
      inReqs: requests.data.inReqs || [],
      outReqs: requests.data.outReqs || [],
    },

  }
}