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
import Header from "../components/header/Header";
import {ChatWindow} from "../components/chatWindow/ChatWindow";

export default function Room(props: any) {

  const { locale, roomId } = props;
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { filteredList } = useSelector((state: InitialState) => state);
  const router = useRouter();
  const { check } = apiServices();

  const onLoad = async () => {
    const res = await check();
    if ('status' in res && res.status !== 200) {
      router.push('/')
    }
  }
  useEffect(() => {
    onLoad()
  }, [])

  return (
    <>
      <Header {...props}/>
      <ChatWindow roomId={roomId}/>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  return {
    props: {
      roomId: context.query.id,
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}