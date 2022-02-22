import 'react-image-crop/dist/ReactCrop.css';
import {Avatar, Button, Modal} from "@mui/material";
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

interface User {
  id: string,
  email: string,
  registrationDate: string,
  username: string,
  imagePath: string,
  requests: {
    inReqs: {
      id: string,
      userSenderId: string,
      userRecipientId: string,
      userRecipientStatus: boolean
    } [],
    outReqs: {
        id: string,
        userSenderId: string,
        userRecipientId: string,
        userRecipientStatus: boolean
      } [],
    reqUsers: {
        id: string,
        username: string,
        email: string,
        password: string,
        registration: string,
        friends: string[],
        friendsRequests: string[],
        imagePath: string;
      }[]
  }

  password?: string
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

export default function Profile (props: { user: User, users: User[], locale: string }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user, users } = props;
  const { id, email, registrationDate, username, imagePath, requests } = user;
  const [file, setFile] = useState<File | null>(null);
  const { createRoom, uploadImage, friendRequest } = apiServices();
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(requests)

  const onClickUser = async (id1: string, id2: string) => {
    const res = await createRoom([id1, id2])
    if (res.status === 201) {
      await router.push(`/room/${res.data.roomId}`);
    }
  }

  const onChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  }

  const onClickAddFriend = async (e: any, idUser: string, idFriend: string) => {
    e.stopPropagation()
    const res = await friendRequest(idUser, idFriend)
    console.log(res)
  }

  const friends = <div style={{width: '100%', display: state.tab === 'friends' ? 'block' : 'none'}}>
    {users
      .filter((user) => user.id !== id)
      .map((user) => (
        <Paper
          sx={{display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            cursor: 'pointer'}}
          key={user.id}
          elevation={3}
          onClick={() => onClickUser(id, user.id)}
        >
          <Avatar sx={{marginLeft: '6px'}} alt="Avatar" src={user.imagePath ? `http://localhost:8080/${user.imagePath}` : ''}/>
          <div style={{marginLeft: '12px'}}>{user.username}</div>
          <PersonAddIcon
            sx={{marginLeft: 'auto', marginRight: '10px', width: '18px'}}
            onClick={e => onClickAddFriend(e, id, user.id)}
          />
        </Paper>)
      )
    }
  </div>
  const inReqs = <div style={{width: '100%', display: state.tab === 'in' ? 'block' : 'none'}}>
    {requests.inReqs.map((req: any) => {
      return <Paper
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        key={req.id}
        elevation={3}
      >
        <Avatar sx={{marginLeft: '6px'}} alt="Avatar"
                src={requests.reqUsers[req.userSenderId].imagePath ? `http://localhost:8080/${requests.reqUsers[req.userSenderId].imagePath}` : ''}/>
        <div style={{marginLeft: '12px'}}>{requests.reqUsers[req.userSenderId].username}</div>
        <PersonAddIcon
          sx={{marginLeft: 'auto', marginRight: '10px', width: '18px'}}
        />
      </Paper>
    })}
  </div>

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Header {...props}/>
      <Box
        sx={{
          margin: '50px auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 250px)',
          gap: '200px',
          alignItems: 'center',
          '& .MuiPaper-root': {
            m: 1,
            height: 50,
          },
        }}
      >
        <div
          style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
        >
          <Avatar
            sx={{marginLeft: '6px', width: 100, height: 100}}
            alt="Avatar"
            src={imagePath ? `http://localhost:8080/${imagePath}` : ''}
          />
          <p style={{margin: '20px 0 0 0'}}>{username}</p>
          <Button
            sx={{marginTop: '10px'}}
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
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <ButtonGroup sx={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}} size="medium" aria-label="small button group">
            <Button onClick={() => dispatch('friends')} sx={{fontSize: '10px'}} key="friends">{t('friends')}</Button>
            <Button onClick={() => dispatch('in')} sx={{fontSize: '10px'}} key="inRequests">{t('inRequests')}</Button>
            <Button onClick={() => dispatch('out')} sx={{fontSize: '10px'}} key="outRequests">{t('outRequests')}</Button>
          </ButtonGroup>
          {friends}
          {inReqs}
        </div>
      </Box>
      <Modal
        open={Boolean(file)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Crop image={file} id={id} setFile={setFile}/>
      </Modal>
    </div>
  )
}

export async function getServerSideProps(context: Context) {
  const { locale } = context;
  const { getUserById, getAllUsers, getRequests } = apiServices();
  const responseUser = await getUserById(context.params.id);
  const { id, email, registration, username, imagePath, friends, friendsRequests} = responseUser.data;
  const requests = await getRequests(friendsRequests, id)
  const date = new Date(Number(registration));
  const registrationDate = {
    day: date.getDate(),
    month: date.getMonth()+1,
    year: date.getFullYear(),
  }

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
        registrationDate: registrationDate || null,
        friends: friends || null,
        requests: requests.data || null
      },
      users: res.data },
  }
}