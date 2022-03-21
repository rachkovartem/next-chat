import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';
import * as React from "react";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {useDispatch, useSelector} from "react-redux";

import {InitialState} from "../../redux/reducers";
import {setCurrentRoom} from "../../redux/actions";

export const SideBar = ({locale}: {locale: string}) => {
  const drawerWidth = 88;
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const { socket } = useSelector((state: InitialState)  => state);
  const routerOptionLocale = locale === 'ru' ? 'en' : 'ru';
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const onClickLogout = async () => {
    socket?.disconnect();
    localStorage.clear();
    document.cookie = 'access_token' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = 'refresh_token' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    await router.push(`/`);
  }

  return <Box
    component="nav"
    sx={{ width: drawerWidth,
      height: '100vh',
      boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.08)'
    }}
    aria-label="mailbox folders"
  >

    <Drawer
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper':
          {
            boxSizing: 'border-box',
            width: drawerWidth
          },
      }}
      open
    >
      <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      >
        <ListItem
          button
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px'
          }}
          onClick={() => router.push(`/profile/${localStorage.getItem('id')}`)}
        >
          <HomeTwoToneIcon fontSize={'large'} />
        </ListItem>
        <ListItem
          button
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px'
          }}
          onClick={() => router.push(`/friends/${localStorage.getItem('id')}`)}
        >
          <PeopleAltTwoToneIcon fontSize={'large'} />
        </ListItem>
        <ListItem
          button
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px'
          }}
          onClick={() => {
            router.push(`/room/${localStorage.getItem('id')}`)
            dispatch(setCurrentRoom(null))
          }}
        >
          <ForumTwoToneIcon  fontSize={'large'} />
        </ListItem>
        <ListItem
          onClick={() => router.push({ pathname, query }, asPath, { locale: routerOptionLocale })}
          button
          sx={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <LanguageIcon/>
          <div>
            {routerOptionLocale.toUpperCase()}
          </div>
        </ListItem>
        <ListItem
          button
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
          onClick={onClickLogout}
        >
          <LogoutIcon />
        </ListItem>
      </List>
    </Drawer>
  </Box>
}