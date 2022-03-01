import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {Avatar, AvatarGroup, Button} from "@mui/material";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import { ChangeLocal } from "../changeLocal/ChangeLocal";
import * as React from 'react';
import {Room} from "../../profile/[id]";
import {InitialState} from "../../../redux/reducers";

export default function Header(props: {locale: string, room: any | null}) {
  const { user } = useSelector((state: InitialState) => state);
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

  const avatar = (participant: {id: string, imagePath: string}) =>
    <Avatar
      key={participant.id}
      sx={{marginLeft: '6px'}}
      alt="Avatar"
      src={participant.imagePath ? `http://localhost:8080/${participant.imagePath}` : ''}
    />

  const chatName = room
    ? room.groupRoom
      ? <div style={{
        display: 'flex',
        marginTop: '10px',
        justifyContent: 'center',
        alignItems: 'center'}}
        >
          <AvatarGroup sx={{justifyContent: 'flex-end'}} max={4} spacing={'small'} total={room.participants.length}>
            {room.participants
              .filter((participant: any) => participant.id !== user.id)
              .map((participant: any) => {
                return avatar(participant)})
              }
          </AvatarGroup>
          <p style={{margin: '0 0 0 10px'}}>{room.roomId}</p>
        </div>
      : <div>{room.participants.filter((participant: any) => participant.id !== user.id).map((participant: any) => {
        return (
          <div
            key={participant.id}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5px',
            }}
          >
            {avatar(participant)}
            <div style={{marginLeft: '12px'}}>{participant.username}</div>
          </div>)
      })}</div>
    : null;

  return (
      <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr 1fr'}}>
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