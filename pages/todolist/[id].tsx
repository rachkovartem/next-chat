import {useEffect} from "react";
import {useSelector} from "react-redux";
import Input from "../components/input/Input";
import Filter from "../components/filter/filter";
import List from "../components/list/List";
import {InitialState} from "../../redux/reducers";
import {useDispatch} from "react-redux";
import {setData, setFilteredData, setLoginServerError} from "../../redux/actions";
import {useRouter} from "next/router";
import apiServices from "../../services/apiServices";
import {Button} from "@mui/material";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import { ChangeLocal } from "../components/changeLocal/ChangeLocal";

export default function ToDoList(props: any) {
  const { locale } = props;
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { filteredList } = useSelector((state: InitialState) => state);
  const router = useRouter();
  const { getFilteredList } = apiServices();

  useEffect(() => {
    const getDataOnLoaded = async () => {
        const onDataLoaded = (data: any) => {
          dispatch(setData(data));
          dispatch(setFilteredData(data));
        }
        let data = await getFilteredList('all');
        if (!data) return
        if (Array.isArray(data)) {
          onDataLoaded(data);
          return
        }
        if ('status' in data && data.status === 403) {
          dispatch(setLoginServerError(true));
          await router.push(`/`);
        } else {
          console.log('Error')
          await router.push(`/`);
        }
    };
    getDataOnLoaded()
  }, []);

  const onClickLogout = async () => {
    await router.push(`/`);
    localStorage.clear();
    document.cookie = 'access_token' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = 'refresh_token' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    dispatch(setData([]));
    dispatch(setFilteredData([]));
    dispatch(setLoginServerError(true))
  }

  return (
    <>
      <div style={{display: 'flex', alignItems: 'flex-start'}}>
        <ChangeLocal locale={locale} />
        <div style={{display: 'flex', marginTop: '10px'}}>
          <Button
            sx={{marginRight: '20px',
              background: '#a8edea',
              color: '#3b3b3b'}}
            onClick={() => router.push(`/profile/${localStorage.getItem('id')}`)}
            variant="contained"
          >{t('profile')}
          </Button>
          <Button
            sx={{marginRight: '20px',
              background: '#a8edea',
              color: '#3b3b3b'}}
            onClick={onClickLogout}
            variant="contained"
          >{t('logout')}</Button>
        </div>
      </div>

      <div className="inputs">
        <Input/>
        <Filter/>
      </div>
      <List filteredList={filteredList}/>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { locale } = context;
  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}