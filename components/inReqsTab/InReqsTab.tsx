import Paper from "@mui/material/Paper";
import {Avatar} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import * as React from "react";
import {setUserInReqs, setUserObjFriends} from "../../redux/actions";
import {useDispatch} from "react-redux";
import ApiServices from "../../services/ApiServices";
import {useTranslation} from "next-i18next";
import {InReq} from "../../redux/reducers";
import {profileStyles} from "../../styles/profile.styles";

export const InReqsTab =
  ({
      enqueueSnackbar,
      inReqs,
      id,
      onClickRejectReq
    } : {
    enqueueSnackbar: Function,
    inReqs: InReq[],
    id: string,
    onClickRejectReq: Function,
  }) => {
  const dispatch = useDispatch();
  const { approveFriendReq } = ApiServices();
  const classes = profileStyles();
  const { t } = useTranslation('common');
  const onClickApproveReq = async (idUser: string, idFriend: string, idReq: string) => {
    const res = await approveFriendReq(idUser, idFriend, idReq);
    if (typeof res.data === 'string') {
      enqueueSnackbar(t(res.data))
      return
    }
    dispatch(setUserObjFriends(res.data.objFriends));
    dispatch(setUserInReqs(res.data.inReqs));
  }

  return <div style={{width: '100%'}}>

    {inReqs.map((req: any) => {
      return <Paper
        className={classes.userPaperNoCursor}
        key={req.id}
        elevation={0}
      >
        <Avatar
          sx={{marginLeft: '6px'}}
          alt="Avatar"
          src={req.sender.imagePath ? `http://localhost:8080/${req.sender.imagePath}` : ''}/>
        <div style={{marginLeft: '12px'}}>{req.sender.username}</div>
        <AddCircleRoundedIcon
          sx={{marginLeft: 'auto', width: '18px', cursor: 'pointer'}}
          onClick={() => onClickApproveReq(id, req.userSenderId, req.id)}
        />
        <RemoveCircleOutlineRoundedIcon
          sx={{marginLeft: '5px', marginRight: '10px', width: '18px', cursor: 'pointer'}}
          onClick={() => onClickRejectReq(id, req.userSenderId, req.id)}
        />
      </Paper>
    })}
  </div>
}