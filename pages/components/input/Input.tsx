import { useState } from 'react';
import apiServices from '../../../services/apiServices';
import {useSelector} from "react-redux";
import {InitialState} from "../../../redux/reducers";
import {useDispatch} from "react-redux";
import {setData, setFilteredData} from "../../../redux/actions";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import {useTranslation} from "next-i18next";

const Input = () => {
    const { t } = useTranslation('common');
    const { addItemOnServer, getFilteredList } = apiServices();
    const [text, setText] = useState('');
    const [error, setError] = useState(false);
    const { list } = useSelector((state: InitialState) => state);
    const { filter } = useSelector((state: InitialState) => state);
    const dispatch = useDispatch();

    const onChangeInput = (e: any): void => {
        setText(e.target.value);
        setError(false);
    }

    const onClickAdd = async () => {
        if (text === '' || list.some((item: { text: string; }) => item.text === text)) {
            setError(true)
            return
        }
        const userId = localStorage.getItem('id');
        const email = localStorage.getItem('email');

        const id = await addItemOnServer({text, ready: false, userId, email});
        
        if (!id) {
            setText('error, reload page');
            return
        }
        setText('');
        const items = await getFilteredList(filter);
        dispatch(setData(items));
        dispatch(setFilteredData(items));
    }

    const onPressKey = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onClickAdd()
        }
    }

    const errorClassName = error ? 'inputs__error-text inputs__error-text_visible': 'inputs__error-text';
    return (
        <div>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, background: 'rgba(255,255,255,0.47)'}}
              >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={t('inputPlaceholder')}
                    inputProps={{ 'aria-label': 'Enter text...' }}
                    onChange={onChangeInput}
                    value={text}
                    onKeyDown={onPressKey}
                  />
                  <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                  <IconButton onClick={onClickAdd} color="primary" sx={{ p: '10px' }} aria-label="directions">
                      <AddIcon />
                  </IconButton>
              </Paper>
              <p className={errorClassName}>{t('alreadyExist')}</p>
        </div>
    )
}

export default Input;