import {useRouter} from "next/router";
import apiServices from "../../services/apiServices";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import * as React from 'react';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import Header from "../components/header/Header";
import {ChatWindow} from "../components/chatWindow/ChatWindow";
import {InitialState} from "../../redux/reducers";

export default function Room(props: any) {
  const { locale, room } = props;
  const { t } = useTranslation('common');
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
      <ChatWindow {...room}/>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { getRoomInfo } = apiServices()
  const { id } = context.query;
  const { locale } = context;
  const room = await getRoomInfo(id);

  return {
    props: {
      room: room.data,
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}