import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import ApiServices from "../../../services/apiServices";
import {User} from '../../profile/[id]'


export const AutocompleteFriendInput = () => {
  const { t } = useTranslation('common');
  const { findUser } = ApiServices();
  const [options, setOptions] = useState<string[]>([]);
  const [text, setText] = useState('');

  const onChange = (e: any) => {
    setText(e.target.value)
  }

  const onChangeText = async () => {
    const res = await findUser(text);
    console.log(res.data)
    const arr = res.data.map((item: User) => item.username)
    if (Array.isArray(arr)) {
      setOptions(arr)
    } else {
      setOptions([])
    }

  }

  useEffect(() => {
    onChangeText()
  }, [text])
  return (<Autocomplete
    disablePortal
    id="friendNameInput"
    options={options}
    sx={{ width: '100%', marginBottom: '10px' }}
    renderInput={(params) =>
      <TextField
        {...params}
        label={t('autocompleteLabel')}
        value={text}
        onChange={onChange}
      />}
  />)
}