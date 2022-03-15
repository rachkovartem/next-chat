import 'react-image-crop/dist/ReactCrop.css';
import {Avatar, Button, Modal} from "@mui/material";
import {useRouter} from "next/router";
import * as React from 'react';
import Box from '@mui/material/Box';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useState, useEffect, useRef} from "react";
import type { AppContext } from 'next/app';
import {useTranslation} from "next-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from 'notistack';

import { Crop } from '../components/crop/Crop';
import {useStyles} from "./id.styles";
import {InitialState} from "../../redux/reducers";
import {ServerMessage, useChat} from "../../hooks/useChat";
import {SideBar} from "../components/sideBar/sideBar";
import {PagesServices} from "../../services/PagesServices";
import ApiServices from "../../services/ApiServices";

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

export interface Message {
  messageId: string,
  roomId: string,
  senderId: string,
  senderUsername: string,
  message: string,
  sendingDate: string
}

export interface Room {
  roomId: string;
  participants: string;
  groupRoom: boolean;
  creationDate: string;
  fullParticipants: User[];
  avatars: {
    [key: string]: string
  };
  lastMessage: ServerMessage;
}

interface Context extends AppContext {
  locale: string,
  params: { id: string }
}

export default function Profile (props: {locale: string, id: string}) {
  const {locale, id} = props;
  const { t } = useTranslation('common');
  const [file, setFile] = useState<File | null>(null);
  const classes = useStyles();
  const { getUserById, getRequests, getAllRoomsIds, check } = ApiServices();
  const { user, useChatState } = useSelector((state: InitialState)  => state);
  const { username, imagePath } = user;
  const { notification } = useChatState;
  const inputRef = useRef(null);
  const { showNotification } = useChat();
  const { onLoadingPage } = PagesServices();

  useEffect(() => {
    onLoadingPage(getUserById, getRequests, getAllRoomsIds, check);
  }, [])

  useEffect(() => {
    showNotification(notification)
  }, [notification])

  const onChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  }

  return (
    <div style={{display: 'grid', gridTemplateColumns: '88px 1fr'}}>
      <SideBar locale={locale}/>
      <div className={classes.profile}>
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
        </Box>
        <Modal
          open={Boolean(file)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Crop image={file} id={id} setFile={setFile} inputRef={inputRef}/>
        </Modal>
      </div>
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