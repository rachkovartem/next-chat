import {useDispatch} from "react-redux";
import {setLoginServerError} from "../../../redux/actions";
import {useRouter} from "next/router";
import {Button} from "@mui/material";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import { ChangeLocal } from "../changeLocal/ChangeLocal";
import * as React from 'react';

export default function Header(props: any) {

  const { locale } = props;
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const router = useRouter();

  const onClickLogout = async () => {
    await router.push(`/`);
    localStorage.clear();
    document.cookie = 'access_token' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = 'refresh_token' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    dispatch(setLoginServerError(true))
  }

  return (
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
  )
}