import {setUser} from "../redux/actions";
import {useRouter} from "next/router";
import {useChat} from "../hooks/useChat";
import {useDispatch, useSelector} from "react-redux";
import {InitialState} from "../redux/reducers";

export const PagesServices = () => {
  const { useChatState } = useSelector((state: InitialState)  => state);
  const { user } = useChatState;
  const dispatch = useDispatch();
  const router = useRouter();

  const onLoadingPage = async (
    getUserById: Function,
    getRequests: Function,
    getAllRoomsIds: Function,
    check: Function
  ) => {
    const resCheck = await check();
    if ('status' in resCheck && resCheck.status !== 200) {
      await router.push('/')
      return
    } else {
      localStorage.setItem('id', resCheck.data.id);
      localStorage.setItem('email', resCheck.data.email);
      localStorage.setItem('username', resCheck.data.username);
    }
    const id = localStorage.getItem('id') || '';
    const responseUser = await getUserById(id);
    const { friendsRequests } = responseUser.data;
    const requests = await getRequests(friendsRequests, id);
    const res = {
      ...responseUser.data,
      inReqs: requests.data.inReqs,
      outReqs: requests.data.outReqs,
    }
    dispatch(setUser(res));
  }

  return {onLoadingPage}
}
