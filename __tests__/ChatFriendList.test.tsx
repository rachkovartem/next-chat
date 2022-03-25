import {render, screen} from "@testing-library/react";
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import {withTestRouter} from "../helpers/withTestRouter";
import {ChatFriendList} from "../components/chatFriendsList/ChatFriendsList";
import axios from "axios";
import {testState} from "../helpers/constants";
import * as actions from '../redux/actions/index';
import configureStore from 'redux-mock-store'
import createMockStore from "redux-mock-store";

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

jest.mock(
  'axios',
  () => {
    return {
      create: jest.fn(
        () => ({
          get: jest.fn(),
          post: jest.fn(),
          interceptors: {
            request: { use: jest.fn(), eject: jest.fn() },
            response: { use: jest.fn(), eject: jest.fn() }
          }
        })
      )
    }
  }
)

describe('ChatFriendList element', () => {
  // const axiosMock = axios.create()
  // const mockStore = configureStore();
  // let response: any;
  // beforeEach(() => {
  //   const store = mockStore(testState)
  //   response = {
  //     data: {
  //       fullRooms: testState.fullRooms,
  //       roomId: testState.currentRoomId
  //     }
  //   }
  //   render(
  //     withTestRouter(
  //       <Provider store={store}>
  //         <ChatFriendList/>
  //       </Provider>
  //     )
  //   );
  // })

  test('Friends list',  async () => {
    // // @ts-ignore
    // axiosMock.post.mockReturnValue(response);
    // // @ts-ignore
    // axiosMock.get.mockReturnValue(response);
    // const rooms = await screen.findAllByTestId('roomItem')
  });

})