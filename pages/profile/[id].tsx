import {Button} from "@mui/material";
import {useRouter} from "next/router";
import apiServices from "../../services/apiServices";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Header from "../components/header/Header";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function Profile (props: any) {
  const router = useRouter();
  const { id, email, registrationDate, users } = props;
  const { createRoom } = apiServices();

  const onClickUser = async (id1: string, id2: string) => {
    const res = await createRoom([id1, id2])
    if (res.status === 201) {
      await router.push(`/room/${res.data.roomId}`);
    }
  }

  return (
    <>
      <Header {...props}/>
      <Box
        sx={{
          margin: '50px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          alignItems: 'center',
          cursor: 'pointer',
          '& .MuiPaper-root': {
            m: 1,
            height: 100,
          },
        }}
      >
        {users
          .filter((user:{[key: string]: string}) => user.id !== id)
          .map((user: {[key: string]: string}) => (
          <Paper
            sx={{display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'}}
            key={user.id}
            elevation={3}
            onClick={() => onClickUser(id, user.id)}
          >
            {user.username}
          </Paper>))}
      </Box>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  const { getUserById, getAllUsers } = apiServices();
  const responseUser = await getUserById(context.params.id);
  const { id, email, registration } = responseUser.data;
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
      id,
      email,
      registrationDate,
      users: res.data },
  }
}