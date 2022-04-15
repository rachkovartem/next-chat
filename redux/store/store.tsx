import {compose, createStore, applyMiddleware} from 'redux';
import { reducer } from '../reducers';
import createSagaMiddleware from 'redux-saga';
import mySaga, {fullRoomsFetchRequestedWatcherSagaWITHCHANNEL} from '../sagas/sagas'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}

let enhancer: any = '';

if (typeof window !== 'undefined') {
    enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware)));
// sagaMiddleware.run(mySaga);
sagaMiddleware.run(fullRoomsFetchRequestedWatcherSagaWITHCHANNEL);

export default store;