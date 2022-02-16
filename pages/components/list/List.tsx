import ListItem from '../listItem/ListItem';
import {useTranslation} from "next-i18next";

const List = ({filteredList}: any) => {
  const { t } = useTranslation('common');
  const view = filteredList && filteredList.length > 0
    ? <ul className="list list-group">
          {filteredList?.map((li: any) => <ListItem key={li._id} {...li}/>)}
      </ul>
    :  <div className='list__placeholder'>{t('noCases')}</div>

  return (
    <>
        {view}
    </>
  )
}

export default List;