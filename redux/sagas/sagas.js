import { call, put, takeEvery, all, takeLatest, actionChannel, take } from 'redux-saga/effects'
import ApiServices from "../../services/ApiServices";
import {setFullRoomsFailed, setFullRoomsRequested, setFullRoomsSucceeded} from "../actions";
const { getAllUserRooms } = ApiServices();

function* fetchAllUserRooms (action) {
    try {
        yield put(setFullRoomsFailed(false));
        const {data} = yield call(getAllUserRooms, action.payload);
        yield put(setFullRoomsSucceeded(data));
    } catch (e) {
        yield put(setFullRoomsFailed(true));
    }
}

export function* fullRoomsFetchRequestedWatcherSagaWITHCHANNEL() {
    const requestChannel = yield actionChannel('SET_FULL_ROOMS_REQUESTED')
    while (true) {
        const action = yield take(requestChannel)
        yield call(fetchAllUserRooms, action)
    }
}

export function* fullRoomsFetchRequestedWatcherSaga() {
    yield takeLatest('SET_FULL_ROOMS_REQUESTED', fetchAllUserRooms)
}

export function* someSaga() {
    console.log('someSaga')
}

function* mySaga() {

    yield all([
        fullRoomsFetchRequestedWatcherSaga(),
        someSaga()
    ])
}

export default mySaga;