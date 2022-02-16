import { useDispatch, useSelector } from 'react-redux';
import { setFilteredData, setData } from '../../../redux/actions';
import { useState } from 'react';
import { InitialState } from '../../../redux/reducers';
import apiServices from '../../../services/apiServices';
import {default as MuiListItem} from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {ListItemText} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ListItem = (props: {text: string, ready: boolean, _id: string}) => {

    const {text, ready, _id} = props;
    const dispatch = useDispatch();
    const { filter } = useSelector((state: InitialState) => state);
    const [onChanging, setOnChanging] = useState(false);
    const [inputText, setInputText] = useState(text);
    const { deleteItemOnServer, updateItemOnServer, changeTextOnServer, getFilteredList } = apiServices();

    const toggleOnChanging = () => {
        setOnChanging(!onChanging);
    }

    const onDelete = async(id: string) => {
        const res = await deleteItemOnServer(id);
        if (res.deleted) {
            const items = await getFilteredList(filter);
            dispatch(setFilteredData(items));
            dispatch(setData(items));

        }
    }

    const onUpdate = async(id: string, ready: boolean) => {
        const res = await updateItemOnServer(id, !ready);
        if (res.affected === 1) {
            const items = await getFilteredList(filter);
            dispatch(setFilteredData(items));
        }
    }

    const onClickChange = async () => {
        if (onChanging) {
          if (inputText.length === 0) return
            const res = await changeTextOnServer(_id, inputText);
            if (res.affected === 1) {
                const items = await getFilteredList(filter);
                dispatch(setFilteredData(items));
                dispatch(setData(items));
            }
        }
        toggleOnChanging();
    }

    const onChangeText = (e: any) => {
        setInputText(e.target.value);
    }

    const textView = onChanging ?
    <input style={{'color': '#fff', border: '1px solid black', paddingLeft: '10px', marginRight: '20px'}} onChange={onChangeText} type="text" className="form-control-plaintext" value={inputText}/> :
    <p className="list__item-text">{inputText}</p>

    const listItemClassName = ready ? 'list__item list__item_ready list-group-item' : 'list__item list-group-item';
    const bgColor = ready ? 'rgba(136,255,176,0.38)' : 'rgba(0,0,0,0)';
    return (
          <MuiListItem
            sx={{backgroundColor: bgColor, borderRadius: '5px'}}
            secondaryAction={
              <>
                <IconButton sx={{mr: '5px'}} onClick={() => onClickChange()} edge="end" aria-label="edit">
                  {onChanging ? <CheckCircleIcon/> : <EditIcon/>}
                </IconButton>
                <IconButton sx={{mr: '5px'}} onClick={() => onUpdate(_id, ready)} edge="end" aria-label="ready">
                  {ready ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                </IconButton>
                <IconButton onClick={() => onDelete(_id)} edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
              </>
            }
          >   {onChanging
              ? <input
                       onChange={onChangeText}
                       type="text"
                       className="list__item-change-text "
                       value={inputText}/>
             :<ListItemText
                  primary={inputText}
                />}
          </MuiListItem>
    )
}

export default ListItem;