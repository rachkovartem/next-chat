import React, {useState} from 'react';
import {Menu, MenuItem} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import apiServices from "../../../services/apiServices";
import {useTranslation} from "next-i18next";
import {t} from "i18next";
import {string} from "prop-types";

// @ts-ignore
const MenuComponent = ({user, id, menuAnchorEl, groupChatMembers, setGroupChatMembers, setSnackBarText, setMenuAnchorEl}) => {

  const open = Boolean(menuAnchorEl);
  const { removeFriend } = apiServices();
  const { t } = useTranslation('common');

  const handleClickMenu = (e: any) => {
    if (e) {
      e.stopPropagation();
    }
    setMenuAnchorEl(null);
  };

  const onClickRemoveFriend = async (e: any, idUser: string, idFriend: string) => {
    handleClickMenu(e);
    console.log(idFriend)
    const res = await removeFriend(idUser, idFriend);
    console.log(res.data)
    window.location.reload()
  }

  const onClickAddToGroupChat = async (e: any, id: string, username: string) => {
    handleClickMenu(e);
    console.log(id)
    console.log(username)
    if (groupChatMembers.some((member: {id: string, username: string}) => member.id === id)) {
      setSnackBarText(t('userAlreadyAdded'))
      return
    }
    setGroupChatMembers((prevState: {id: string, username: string}[]) => [...prevState, {id, username}])
  }

  return (
    <Menu
      id={user.id}
      autoFocus={false}
      anchorEl={menuAnchorEl}
      open={open}
      onClose={handleClickMenu}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem key={`add-${user.id}`} onClick={(e) => onClickAddToGroupChat(e, user.id, user.username)}>
        <GroupAddIcon sx={{marginRight: '10px'}}/>
        {t('addToGroupChat')}
      </MenuItem>
      <MenuItem key={`remove-${user.id}`} onClick={(e) => onClickRemoveFriend(e, id, user.id)}>
        <PersonRemoveIcon sx={{marginRight: '10px'}}/>
        {t('removeFriend')}
      </MenuItem>
    </Menu>
  );
};

export default MenuComponent;