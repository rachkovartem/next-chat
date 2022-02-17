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
  const { id, users } = props;

  return (
    <>
      <Header {...props}/>
      <div>
        <Button
          sx={{marginTop: '10px',
            marginLeft: '20px',
            background: '#a8edea',
            color: '#3b3b3b'}}
          onClick={() => router.push(`/room/${id}`)}
          variant="contained"
        >TO LIST
        </Button>
      </div>

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
        {users.map((user: {[key: string]: string}) => (
          <Paper
            sx={{display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'}}
            key={user.id}
            elevation={3}
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