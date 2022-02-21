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
const debounce = require('lodash.debounce');
import {forwardRef} from "react";

interface User {
  id: string,
  email: string,
  registrationDate: string,
  username: string,
  imagePath: string,
  password?: string
}

interface Context extends AppContext {
  locale: string,
  params: { id: string }
}

export default function Profile (props: { user: User, users: User[] }) {
  const router = useRouter();
  const { user, users } = props;
  const { id, email, registrationDate, username, imagePath } = user;
  const [file, setFile] = useState<string | number | readonly string[] | undefined>();
  const { createRoom, uploadImage } = apiServices();
  console.log(props)
  const onClickUser = async (id1: string, id2: string) => {
    const res = await createRoom([id1, id2])
    if (res.status === 201) {
      await router.push(`/room/${res.data.roomId}`);
    }
  }

  const onChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  }

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
        <div>
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
            </Paper>))}
        </div>
      </Box>
      <Modal
        open={Boolean(file)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Crop image={file} id={id}/>
      </Modal>
    </div>

  )
}

export async function getServerSideProps(context: Context) {
  const { locale } = context;
  const { getUserById, getAllUsers } = apiServices();
  const responseUser = await getUserById(context.params.id);
  const { id, email, registration, username, imagePath } = responseUser.data;
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
      },
      users: res.data },
  }
}