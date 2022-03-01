import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {Avatar, Button} from "@mui/material";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import { ChangeLocal } from "../changeLocal/ChangeLocal";
import * as React from 'react';
import {Room} from "../../profile/[id]";

export default function Header(props: {locale: string, room: any | null}) {

  const { locale, room } = props;
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const router = useRouter();

  const onClickLogout = async () => {
    await router.push(`/`);
    localStorage.clear();
    document.cookie = 'access_token' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = 'refresh_token' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  const chatName = room
    ? room.groupRoom
      ? <div>{room.roomId}</div>
      : <div>{room.participants.map((user: any) => {
        return (<>
          <Avatar sx={{marginLeft: '6px'}} alt="Avatar" src={user.imagePath ? `http://localhost:8080/${user.imagePath}` : ''}/>
          <div style={{marginLeft: '12px'}}>{user.username}</div>
        </>)
      })}</div>
    : null;

  return (
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}>
        <ChangeLocal locale={locale} />
          <div>{chatName}</div>
        <div style={{display: 'flex', justifyContent: 'end', marginTop: '10px'}}>
          <Button
            sx={{
              marginRight: '20px',
              background: '#a8edea',
              color: '#3b3b3b'
            }}
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
  )
}