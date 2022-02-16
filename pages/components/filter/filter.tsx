import apiServices from '../../../services/apiServices';
import {useDispatch, useSelector} from "react-redux";
import {InitialState} from "../../../redux/reducers";
import {setFilter, setFilteredData} from "../../../redux/actions";
import {FormControl, NativeSelect} from "@mui/material";
import {useTranslation} from "next-i18next";

const Filter = () => {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const { getFilteredList } = apiServices();
    const { filter } = useSelector((state: InitialState) => state);

    const onChangeInput = async (e: any) => {
        dispatch(setFilter(e.target.value));
        const items = await getFilteredList(e.target.value);
        dispatch(setFilteredData(items));
    }

    return (
          <FormControl>
              <NativeSelect
                sx={{width: '400px', height: '48px'}}
                value={filter}
                inputProps={{
                  name: 'filter',
                  id: 'demo-simple-select-label',
                }}
                onChange={onChangeInput}
              >
                  <option value={'all'}>{t('filterAll')}</option>
                  <option value={'ready'}>{t('filterReady')}</option>
                  <option value={'notready'}>{t('filterNotReady')}</option>
              </NativeSelect>
          </FormControl>
    )
}

export default Filter;