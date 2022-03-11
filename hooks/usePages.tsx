import {setUser} from "../redux/actions";
import ApiServices from "../services/ApiServices";
import {NextRouter} from "next/router";

export const usePages = () => {
  const onLoadingPage = async ({
      connectToRoom,
      dispatch,
      router
    } : {
      connectToRoom: Function,
      dispatch: Function,
      router: NextRouter
    }) => {
    const { getUserById, getRequests, getAllRoomsIds, check } = ApiServices();
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
    const rooms = await getAllRoomsIds(id);
    if ('data' in rooms) {
      await Promise.all(rooms.data.map((roomId: string) => connectToRoom(roomId)))
    }
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
