import {useSelector} from "react-redux";
import {InitialState} from "../../redux/reducers";
import {useDispatch} from "react-redux";
import {setLoginServerError} from "../../redux/actions";
import {useRouter} from "next/router";
import apiServices from "../../services/apiServices";
import {Button, TextField} from "@mui/material";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import { ChangeLocal } from "../components/changeLocal/ChangeLocal";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import {useChat} from "../../hooks/useChat";

export default function Main(props: any) {
  const { messages, sendMessage } = useChat();
  const { locale } = props;
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { filteredList } = useSelector((state: InitialState) => state);
  const router = useRouter();
  const [userMessage, setUserMessage] = useState('');
  const { check } = apiServices();

  const onLoad = async () => {
    const res = await check();
    if ('status' in res && res.status !== 200) {
      router.push('/')
    }
    console.log(res)
  }
  useEffect(() => {
    onLoad()
  }, [])

  const onClickSend = () => {
    if (userMessage.length === 0) return
    sendMessage(userMessage);
  }

  const onClickLogout = async () => {
    await router.push(`/`);
    localStorage.clear();
    document.cookie = 'access_token' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = 'refresh_token' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    dispatch(setLoginServerError(true))
  }

  return (
    <>
      <div style={{display: 'flex', alignItems: 'flex-start'}}>
        <ChangeLocal locale={locale} />
        <div style={{display: 'flex', marginTop: '10px'}}>
          <Button
            sx={{marginRight: '20px',
              background: '#a8edea',
              color: '#3b3b3b'}}
            onClick={() => router.push(`/profile/${localStorage.getItem('id')}`)}
            variant="contained"
          >{t('profile')}
          </Button>
          <Button
            sx={{marginRight: '20px',
              background: '#a8edea',
              color: '#3b3b3b'}}
            onClick={onClickLogout}
            variant="contained"
          >{t('logout')}</Button>
        </div>
      </div>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          '& .MuiPaper-root': {
            m: 1,
            width: '50vw',
            height: '50vh',
          },
        }}
      >
        <Paper elevation={3}>{messages.map((item, index) => <div key={index} >{item}</div>)}</Paper>
        <TextField
          id="outlined-message"
          label={t('Enter text...')}
          placeholder={t('Enter text...')}
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <Button
          sx={{marginRight: '20px',
            background: '#a8edea',
            color: '#3b3b3b'}}
          variant="contained"
          onClick={onClickSend}
        >{t('send')}
        </Button>
      </Box>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}