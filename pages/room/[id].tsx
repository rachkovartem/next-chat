import {useRouter} from "next/router";
import apiServices from "../../services/apiServices";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import * as React from 'react';
import {useEffect, useState} from "react";

import Header from "../components/header/Header";
import {ChatWindow} from "../components/chatWindow/ChatWindow";

export default function Room(props: any) {

  const { locale, roomId } = props;
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
      <ChatWindow roomId={roomId}/>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { getRoomInfo } = apiServices()
  const { id } = context.query;
  const { locale } = context;

  const room = await getRoomInfo(id);
  console.log(room.data)

  return {
    props: {
      roomId: id,
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}