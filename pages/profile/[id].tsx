import 'react-image-crop/dist/ReactCrop.css';
import {Avatar, AvatarGroup, Button, Chip, Modal} from "@mui/material";
import {useRouter} from "next/router";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useState, useEffect, useRef, ReactElement} from "react";
import type { AppContext } from 'next/app';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useTranslation} from "next-i18next";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useDispatch, useSelector} from "react-redux";
import {SnackbarProvider, useSnackbar} from 'notistack';

import {setUser, setProfileTab, setUserInReqs, setUserOutReqs} from "../../redux/actions";
import {FriendsListItem} from "../components/friendsListItem/FriendsListItem";
import apiServices from "../../services/apiServices";
import {SnackBar} from "../components/snackBar/SnackBar";
import Header from "../components/header/Header";
import { Crop } from '../components/crop/Crop';
import {useStyles} from "./id.styles";
import {AutocompleteFriendInput} from "../components/autocompleteFriendInput/AutocompleteFriendInput";
import {InitialState} from "../../redux/reducers";
import {setUserObjFriends} from "../../redux/actions";
import {GroupsTab} from "../components/groupsTab/GroupsTab";
import {ServerMessage, useChat} from "../../hooks/useChat";

export interface User {
  id: string,
  email: string,
  username: string,
  imagePath: string,
  friends: string[],
  objFriends: User[],
  friendRequests: string[],
  fullGroupRooms: Room[],
  password?: string
}

export interface Room {
  roomId: string;
  participants: string;
  groupRoom: boolean;
  creationDate: string;
  fullParticipants: User[];
  avatars: {
    [key: string]: string
  }
}

interface Context extends AppContext {
  locale: string,
  params: { id: string }
}

export default function Profile (props: {locale: string, id: string}) {
  const {locale, id} = props;
  const { t } = useTranslation('common');
  const { approveFriendReq, rejectFriendReq, createGroupRoom } = apiServices();
  const [file, setFile] = useState<File | null>(null);
  const classes = useStyles();
  const [groupChatMembers, setGroupChatMembers] = useState<{username: string, id: string}[]>([])
  const isBrowser = typeof window !== 'undefined';
  const router = useRouter();
  const { profileTab, user } = useSelector((state: InitialState)  => state);
  const { username, imagePath, objFriends, inReqs, outReqs } = user;
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { getUserById, getRequests, getAllRoomsIds } = apiServices();
  const { notification, connectToRoom } = useChat();
  const { enqueueSnackbar } = useSnackbar();
  const onLoadingPage = async () => {
    const rooms = await getAllRoomsIds(id);
    if ('data' in rooms) {
      await Promise.all(rooms.data.map((roomId: string) => connectToRoom(roomId)))
    }
    const responseUser = await getUserById(id);
    const { friendsRequests } = responseUser.data;
    const requests = await getRequests(friendsRequests, id);
    const user = {
        ...responseUser.data,
        inReqs: requests.data.inReqs,
        outReqs: requests.data.outReqs,
    }
    dispatch(setUser(user));
  }

  useEffect(() => {
    onLoadingPage()
  }, [])

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(<div>
        <div>{notification?.senderUsername}</div>
        <div>{notification?.message}</div>
      </div>);
    }
  }, [notification])

  const onChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  }

  const onClickApproveReq = async (idUser: string, idFriend: string, idReq: string) => {
    const res = await approveFriendReq(idUser, idFriend, idReq);
    if (typeof res.data === 'string') {
      enqueueSnackbar(t(res.data))
      return
    }
    dispatch(setUserObjFriends(res.data.objFriends));
    dispatch(setUserInReqs(res.data.inReqs));
    dispatch(setProfileTab('friends'));
  }

  const onClickRejectReq = async (idUser: string, idFriend: string, idReq: string) => {
    const res = await rejectFriendReq(idUser, idFriend, idReq);
    dispatch(setUserInReqs(res.data.inReqs));
    dispatch(setUserOutReqs(res.data.outReqs));
  }

  const onClickCreateGroupChat = async (members: {username: string, id: string}[], idUser: string) => {
    const res = await createGroupRoom(members, idUser);
    if ('data' in res && typeof res.data === 'string') {
      enqueueSnackbar(t(res.data))
      return
    } else if ('data' in res) {
      await router.push(`/room/${res.data.roomRes.roomId}`);
    } else {
      console.log('err')
    }
  }

  const onClickRoom = async (roomId: string) => {
      await router.push(`/room/${roomId}`);
  }

  const friendsListItemProps = {id, groupChatMembers, setGroupChatMembers, enqueueSnackbar};
  const friendsDiv = <div style={{width: '100%'}}>
    {
      isBrowser ? objFriends
      .filter((user) => user.id !== id)
      .map((user) => (
        <FriendsListItem key={user.id} user={user} {...friendsListItemProps}/>
      )) : null
    }
  </div>

  const inReqsDiv = <div style={{width: '100%'}}>
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

  const outReqsDiv = <div style={{width: '100%'}}>
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
        onClick={() => onClickCreateGroupChat(
          [...groupChatMembers, { username: user.username, id: user.id }],
          user.id)}
      />
  </Paper>
    : null;

  return (
    <div className={classes.profile}>
      <Header locale={locale} room={null}/>
      <Box className={classes.userProfileBox}>
        <div className={classes.avatarWrapper}>
          <Avatar
            className='avatarProfile'
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
              ref={inputRef}
              type="file"
              onChange={onChangeFile}
              hidden
            />
          </Button>
        </div>
        <div className={classes.friendsWrapper}>
          <AutocompleteFriendInput enqueueSnackbar={enqueueSnackbar} id={id}/>
          {groupChatInput}
          <ButtonGroup
              className={classes.buttonsGroup}
              size="medium"
              aria-label="small button group"
          >
            <Button
                onClick={() => dispatch(setProfileTab('friends'))}
                className={classes.button}
                key="friends"
            >
              {t('friends')}
            </Button>
            <Button
              onClick={() => dispatch(setProfileTab('groups'))}
              className={classes.button}
              key="groups"
            >
              {t('groups')}
            </Button>
            <Button
                onClick={() => dispatch(setProfileTab('in'))}
                className={classes.button}
                key="inRequests"
            >
              {t('inRequests')}
            </Button>
            <Button
                onClick={() => dispatch(setProfileTab('out'))}
                className={classes.button}
                key="outRequests"
            >
              {t('outRequests')}
            </Button>
          </ButtonGroup>
          <div style={{ width: 330 }}>
            {profileTab === 'friends' ? friendsDiv : null}
            {profileTab === 'groups' ? <GroupsTab onClickRoom={onClickRoom}/> : null}
            {profileTab === 'in' ? inReqsDiv : null}
            {profileTab === 'out' ? outReqsDiv : null}
          </div>
        </div>
      </Box>
      <Modal
        open={Boolean(file)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Crop image={file} id={id} setFile={setFile} inputRef={inputRef}/>
      </Modal>
    </div>
  )
}

export async function getServerSideProps(context: Context) {
  const { locale, params } = context;

  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
      id: params.id
    },

  }
}