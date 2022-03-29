import {useState} from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import * as React from "react";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import LogoutIcon from "@mui/icons-material/Logout";
import {sideBarStyles} from "./BottomNavigation.styles";
import {useRouter} from "next/router";
import {setCurrentRoom} from "../../redux/actions";
import {useDispatch} from "react-redux";

export const BottomNavigationMobile = ({onClickLogout} : {onClickLogout: Function}) => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const classes = sideBarStyles();
  const dispatch = useDispatch();

  return (
    <Box className={classes.bottomNavigationBox}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          icon={<HomeTwoToneIcon fontSize={'large'} />}
          onClick={() => router.push(`/profile/${localStorage.getItem('id')}`)}
        />
        <BottomNavigationAction
          icon={<PeopleAltTwoToneIcon fontSize={'large'} />}
          onClick={() => router.push(`/friends/${localStorage.getItem('id')}`)}
        />
        <BottomNavigationAction
          icon={<ForumTwoToneIcon  fontSize={'large'} />}
          onClick={() => {
            router.push(`/room/${localStorage.getItem('id')}`)
            dispatch(setCurrentRoom(null))
          }}
        />
        <BottomNavigationAction
          icon={<LogoutIcon />}
          onClick={() => onClickLogout()}
        />
      </BottomNavigation>
    </Box>
  );
}