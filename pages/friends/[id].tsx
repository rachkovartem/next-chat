import {AutocompleteFriendInput} from "../components/autocompleteFriendInput/AutocompleteFriendInput";
import ButtonGroup from "@mui/material/ButtonGroup";
import {Button, Chip} from "@mui/material";
import {setUser, setUserInReqs, setUserOutReqs} from "../../redux/actions";
import {FriendsTab} from "../components/friendsTab/FriendsTab";
import {GroupsTab} from "../components/groupsTab/GroupsTab";
import {InReqsTab} from "../components/inReqsTab/InReqsTab";
import {OutReqsTab} from "../components/outReqsTab/OutReqsTab";
import * as React from "react";
import {useTranslation} from "next-i18next";
import ApiServices from "../../services/ApiServices";
import {useEffect, useRef, useState} from "react";
import {useStyles} from "../profile/id.styles";
import {NextRouter, useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {InitialState} from "../../redux/reducers";
import {useChat} from "../../hooks/useChat";
import {useSnackbar} from "notistack";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {AppContext} from "next/app";
import {SideBar} from "../components/sideBar/sideBar";
import {PagesServices} from "../../services/PagesServices";

interface Context extends AppContext {
  locale: string,
  params: { id: string }
}

export default function Friends (props: {locale: string, id: string}) {

  const {locale, id} = props;
  const { t } = useTranslation('common');
  const { rejectFriendReq, createGroupRoom } = ApiServices();
  const classes = useStyles();
  const [groupChatMembers, setGroupChatMembers] = useState<{username: string, id: string}[]>([]);
  const isBrowser = typeof window !== 'undefined';
  const router = useRouter();
  const { user } = useSelector((state: InitialState)  => state);
  const { objFriends, inReqs, outReqs } = user;
  const dispatch = useDispatch();
  const { showNotification, notification, } = useChat();
  const { onLoadingPage } = PagesServices();
  const { enqueueSnackbar } = useSnackbar();
  const { getUserById, getRequests, getAllRoomsIds, check } = ApiServices();

  useEffect(() => {
    onLoadingPage(getUserById, getRequests, getAllRoomsIds, check);
  }, [])

  useEffect(() => {
    showNotification(notification)
  }, [notification])

  const onClickRejectReq = async (idUser: string, idFriend: string, idReq: string) => {
    const res = await rejectFriendReq(idUser, idFriend, idReq);
    dispatch(setUserInReqs(res.data.inReqs));
    dispatch(setUserOutReqs(res.data.outReqs));
  }

  const onClickCreateGroupChat = async (members: {username: string, id: string}[], idUser: string) => {
    const res = await createGroupRoom(members, idUser);
    if ('data' in res && typeof res.data === 'string') {
      enqueueSnackbar(t(res.data))
      return
    } else if ('data' in res) {
      await router.push(`/room/${res.data.roomRes.roomId}`);
    } else {
      console.log('err')
    }
  }

  const onClickRoom = async (roomId: string) => {
    await router.push(`/room/${roomId}`);
  }

  const friendsTabProps = {isBrowser, objFriends, id, groupChatMembers, setGroupChatMembers, enqueueSnackbar};

  const groupChatInput = groupChatMembers.length > 0
    ? <Paper className={classes.groupChatPaper}>
      {groupChatMembers.map((member) => {
        return (
          <Chip
            key={member.id}
            label={member.username}
            onDelete={() => setGroupChatMembers((prevState) => prevState.filter(item => item.id !== member.id))}
          />
        );
      })}
      <AddCircleIcon
        sx={{alignSelf: 'center', marginLeft: 'auto', cursor: 'pointer'}}
        onClick={() => onClickCreateGroupChat(
          [...groupChatMembers, { username: user.username, id: user.id }],
          user.id)}
      />
    </Paper>
    : null;

  return <div style={{display: 'grid', gridTemplateColumns: '88px 1fr'}}>
    <SideBar locale={locale}/>
      <div className={classes.friendsWrapper}>
        <div>
          <Paper
            sx={{
              padding: '10px 10px 10px',
              gridArea: 'groups',
            }} elevation={3}>
            <AutocompleteFriendInput enqueueSnackbar={enqueueSnackbar} id={id}/>
          </Paper>
          <Paper sx={{
            padding: '5px 10px 10px',
            gridArea: 'groups',
            marginTop: '10px',
          }} elevation={3}>
            <h3>{t('groups')}</h3>
            <GroupsTab onClickRoom={onClickRoom}/>
          </Paper>
        </div>
        <div>
          <Paper
            sx={{
              padding: '5px 10px 10px',
              gridArea: 'friends',
            }} elevation={3}>
            <h3>{t('friends')}</h3>
            {groupChatInput}
            <FriendsTab {...friendsTabProps} />
          </Paper>
        </div>
        <Paper sx={{
          padding: '5px 10px 10px',
          gridArea: 'recents',
        }} elevation={3}>
          <h3>{t('recents')}</h3>
        </Paper>
        <Paper sx={{
          padding: '5px 10px 10px',
          gridArea: 'inreqs',
        }} elevation={3}>
          <h3>{t('inRequests')}</h3>
          <InReqsTab enqueueSnackbar={enqueueSnackbar} inReqs={inReqs} id={id} onClickRejectReq={onClickRejectReq}/>
        </Paper>
        <Paper sx={{
          padding: '5px 10px 10px',
          gridArea: 'outreqs',
        }} elevation={3}>
          <h3>{t('outRequests')}</h3>
         <OutReqsTab outReqs={outReqs} id={id} onClickRejectReq={onClickRejectReq} />
        </Paper>
      </div>
    </div>
}

export async function getServerSideProps(context: Context) {
  const { locale, params } = context;

  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
      id: params.id
    },
  }
}