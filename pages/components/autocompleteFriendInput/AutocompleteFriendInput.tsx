import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import {Avatar} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Paper from "@mui/material/Paper";
import {useDispatch} from "react-redux";

import ApiServices from "../../../services/apiServices";
import {useStyles} from "../../profile/id.styles";
import apiServices from "../../../services/apiServices";
import {setUserOutReqs} from "../../../redux/actions";

export const AutocompleteFriendInput = ({setSnackBarText, id}: {setSnackBarText: Function, id: string}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('common');
  const { findUser } = ApiServices();
  const [initialSearch, setInitialSearch] = useState(true)
  const [options, setOptions] = useState<any[]>([]);
  const [text, setText] = useState('');
  const { friendRequest } = apiServices();

  const onChange = (e: any) => {
    if (initialSearch) {
      setInitialSearch(false)
    }
    setText(e.target.value.toString())
  }

  const onChangeText = async () => {
    const res = await findUser(text, id);
    if (Array.isArray(res.data)) {
      setOptions(res.data)
    } else {
      setOptions([])
    }
  }

  useEffect(() => {
    if (text.length > 0) {
      onChangeText()
    } else {
      setOptions([])
    }
  }, [text])

  const onClickAddFriend = async (e: any, idUser: string, idFriend: string) => {
    e.stopPropagation()
    const res = await friendRequest(idUser, idFriend);
    if ('data' in res && typeof res.data === 'string') {
      setSnackBarText(t(res.data))
      return
    }
    if ('data' in res && 'outReqs' in res.data) {
      dispatch(setUserOutReqs(res.data.outReqs));
      setSnackBarText(t(res.data.text));
      return
    }
    if(!('data' in res)) {
      setSnackBarText(t('smthWrong'))
      return
    }
  }

  return (<Autocomplete
    size='small'
    id='friendNameInput'
    options={options}
    sx={{width: '100%', marginBottom: '10px' }}
    noOptionsText={initialSearch ? t('write') : t('notFound')}
    getOptionLabel={(option) => [option.username, option.email].toString()}
    renderOption={(props, option) => {
      return (<Paper
        className={classes.userPaperNoCursor}
        key={option.id}
        elevation={0}
      >
        <Avatar sx={{marginLeft: '6px', width: 26, height: 26}} alt="Avatar"
                src={option.imagePath ? `http://localhost:8080/${option.imagePath}` : ''}/>
        <div style={{marginLeft: '12px'}}>{option.username}</div>
        <PersonAddIcon
          sx={{marginLeft: 'auto', marginRight: '10px', width: '18px', cursor: 'pointer'}}
          onClick={e => onClickAddFriend(e, id, option.id)}
        />
      </Paper>)
    }}
    renderInput={(params) =>
      <TextField
        {...params}
        label={t('autocompleteLabel')}
        value={text}
        onBlur={() => setInitialSearch(true)}
        onChange={onChange}
      />
      }
  />)
}