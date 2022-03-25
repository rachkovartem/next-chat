import {AutocompleteFriendInput} from "../../components/autocompleteFriendInput/AutocompleteFriendInput";
import {Chip, SxProps} from "@mui/material";
import * as React from "react";
import {useTranslation} from "next-i18next";
import {useEffect, useState} from "react";
import { useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {AppContext} from "next/app";

import ApiServices from "../../services/ApiServices";
import {InitialState} from "../../redux/reducers";
import {SideBar} from "../../components/sideBar/sideBar";
import {PagesServices} from "../../services/PagesServices";
import {setFullRooms, setSocket, setUser, setUserInReqs, setUserOutReqs, updateFullRooms} from "../../redux/actions";
import {FriendsTab} from "../../components/friendsTab/FriendsTab";
import {GroupsTab} from "../../components/groupsTab/GroupsTab";
import {InReqsTab} from "../../components/inReqsTab/InReqsTab";
import {OutReqsTab} from "../../components/outReqsTab/OutReqsTab";
import {useSocket} from "../../hooks/useSocket";
import {ServerMessage, useNotification} from "../../hooks/useNotification";
import {Theme} from "@mui/system";
import {friendsStyles} from "../../styles/friends.styles";
import {GroupRoomItem} from "../../components/chatFriendsList/groupRoomItem/GroupRoomItem";
import {FriendRoomItem} from "../../components/chatFriendsList/friendRoomItem/FriendRoomItem";
import {RecentsTab} from "../../components/recentsTab/RecentsTab";

interface Context extends AppContext {
  locale: string,
  params: { id: string }
}

export default function Friends (props: {locale: string, id: string}) {
  const { createSocket, setOnlineListeners } = useSocket();
  const {locale, id} = props;
  const { t } = useTranslation('common');
  const { rejectFriendReq, createGroupRoom } = ApiServices();
  const classes = friendsStyles();
  const [groupChatMembers, setGroupChatMembers] = useState<{username: string, id: string}[]>([]);
  const isBrowser = typeof window !== 'undefined';
  const router = useRouter();
  const { socket, user, useChatState, fullRooms } = useSelector((state: InitialState)  => state);
  const { objFriends, inReqs, outReqs } = user;
  const { notification, usersOnline } = useChatState;
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const { onLoadingPage } = PagesServices();
  const { enqueueSnackbar } = useSnackbar();
  const { getUserById, getRequests, getAllRoomsIds, check, getAllUserRooms, createRoom } = ApiServices();
  const scrollStyle: SxProps<Theme> = {
    overflowY: 'scroll',
    scrollbarColor: '#a8a8a8 rgba(255,255,255,0)',     /* «цвет ползунка» «цвет полосы скроллбара» */
    scrollbarWidth: 'thin',  /* толщина */
    '&::-webkit-scrollbar': {
      width: '3px', /* ширина для вертикального скролла */
      height: '3px', /* высота для горизонтального скролла */
      backgroundColor: 'rgba(255,255,255,0)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#a8a8a8',
      borderRadius: '9px',
      boxShadow: 'inset 1px 1px 10px #a8a8a8',
    }
  }
  const boxShadow = '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)';

  useEffect(() => {
    const res = onLoadingPage(getUserById, getRequests, getAllRoomsIds, check);
    res.then(res => dispatch(setUser(res)));
  }, []);

  useEffect(() => {
    if (!user.id) return
    const resFullRooms = getAllUserRooms(user.id)
    resFullRooms.then(res => dispatch(setFullRooms(res.data)))
  }, [user.id])

  useEffect(() => {
    if (!socket) {
      dispatch(setSocket(createSocket()));
    }
    if (socket) {
      socket.on('messages:add', (serverMessage: ServerMessage[]) => {
        showNotification(serverMessage[0])
        dispatch(updateFullRooms(serverMessage[0].roomId))
      })
      setOnlineListeners({socket, usersOnline});
    }
    return () => {
      socket?.removeAllListeners();
    }
  }, [socket]);

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
      console.log('err');
    }
  }

  const onClickUser = async (id1: string, id2: string) => {
    const res = await createRoom([id1, id2])
    if (res.status === 201) {
      await router.push(`/room/${res.data.roomId}`);
    }
  }

  const onClickRoom = async (roomId: string) => {
    await router.push(`/room/${roomId}`);
  }

  const friendsTabProps = {isBrowser, objFriends, id, groupChatMembers, setGroupChatMembers, enqueueSnackbar, onClickUser};

  const groupChatInput = groupChatMembers.length > 0
    ? <Paper className={classes.groupChatPaper}>
      {
        groupChatMembers.map((member) => {
          return (
            <Chip
              key={member.id}
              label={member.username}
              onDelete={() =>
                setGroupChatMembers(
                  (prevState) =>
                    prevState.filter(item => item.id !== member.id)
                )}
            />
          );
        })
      }
      <AddCircleIcon
        sx={{
          alignSelf: 'center',
          marginLeft: 'auto',
          cursor: 'pointer'
          }}
        onClick={() => onClickCreateGroupChat(
          [...groupChatMembers, { username: user.username, id: user.id }],
          user.id
        )}
      />
    </Paper>
    : null;

  return <div style={{display: 'grid', gridTemplateColumns: '88px 1fr', backgroundColor: '#EAEAEA', height: '100%'}}>
    <SideBar locale={locale}/>
    <div className={classes.friendsWrapper}>
      <div style={{height: '100%', gridArea: 'groups', display: 'flex', flexDirection: 'column'}}>
        <Paper
          sx={{
            padding: '5px 10px 10px',
            borderRadius: '20px',
          }}
          elevation={3}
        >
          <AutocompleteFriendInput enqueueSnackbar={enqueueSnackbar} id={id}/>
        </Paper>
        <div
          style={{
          gridArea: 'groups',
          marginTop: '22px',
          borderRadius: '20px',
          overflow: 'hidden',
          height: '100%',
          boxShadow
          }}
        >
          <Paper
            sx={{
            padding: '13px 10px 10px 20px',
            borderRadius: '20px',
            height: '100%',
            ...scrollStyle,
          }}
            elevation={3}
          >
            <h3>{t('groups')}</h3>
            <GroupsTab onClickRoom={onClickRoom}/>
          </Paper>
        </div>
      </div>
      <div style={{
        gridArea: 'friends',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow,
      }}
      >
        <Paper
          sx={{
            padding: '13px 10px 10px 20px',
            borderRadius: '20px',
            height: '100%',
            ...scrollStyle,
          }}
          elevation={3}
        >
          <h3>{t('friends')}</h3>
          {groupChatInput}
          <FriendsTab {...friendsTabProps} />
        </Paper>
      </div>
      <div style={{
        gridArea: 'recents',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow,
        }}
      >
        <Paper
          sx={{
          padding: '13px 10px 10px 20px',

          borderRadius: '20px',
          height: '100%',
          ...scrollStyle,
        }}
          elevation={3}
        >
          <h3>{t('recents')}</h3>
          <div>
            <RecentsTab fullRooms={fullRooms} user={user} onClickRoom={onClickRoom} onClickUser={onClickUser} />
          </div>
        </Paper>
      </div>
      <div style={{
        gridArea: 'inreqs',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow,
        }}
      >
        <Paper
          sx={{
            padding: '13px 10px 10px 20px',
            borderRadius: '20px',
            height: '100%',
            ...scrollStyle,
          }}
          elevation={3}
        >
          <h3>{t('inRequests')}</h3>
          <InReqsTab
            enqueueSnackbar={enqueueSnackbar}
            inReqs={inReqs}
            id={id}
            onClickRejectReq={onClickRejectReq}
          />
        </Paper>
      </div>
      <div
        style={{
          gridArea: 'outreqs',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow,
        }}
      >
        <Paper
          sx={{
            padding: '13px 10px 10px 20px',
            borderRadius: '20px',
            height: '100%',
            ...scrollStyle,
          }}
          elevation={3}
        >
          <h3>{t('outRequests')}</h3>
          <OutReqsTab outReqs={outReqs} id={id} onClickRejectReq={onClickRejectReq} />
        </Paper>
      </div>
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