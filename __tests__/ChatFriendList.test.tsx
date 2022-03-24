import {render, screen} from "@testing-library/react";
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import {withTestRouter} from "../helpers/withTestRouter";
import {ChatFriendList} from "../components/chatFriendsList/ChatFriendsList";
import configureStore, {MockGetState, MockStoreEnhanced} from 'redux-mock-store';
import {initialState} from "../redux/reducers";
import axios from "axios";
import * as actions from '../redux/actions/index'

const mockStore = configureStore([]);
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

jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(),
      post: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() }
      }
    }))
  }
})

describe('ChatFriendList element', () => {
  const axiosMock = axios
  let store: MockStoreEnhanced<unknown, {}>;
  let response: {data: any};
  beforeEach(() => {
    response = {
      data: {
        fullRooms: [
      {
        id: '08653c83-8a5a-49c6-8d37-fdeb05655bb3',
        username: 'Jennifer Psaki',
        email: 'psaki@psaki',
        password: '$2b$10$dL3luXDS.ShMbLast2bVwuf5fXqNkl24aznzk25DP4e8ZB3wSUTyG',
        registration: '1648046554634',
        friends: [
          '27d314e7-427f-494e-a672-37c013a16255'
        ],
        groupRooms: [],
        friendsRequests: [],
        imagePath: 'https://ik.imagekit.io/nxinxzljr65/de1fd3e339e74ef3fe54bd05c079fde2_QC6klz7wh',
        roomId: '3bae935f-fd1d-4148-814f-17f3e73d7e3c',
        groupRoom: false,
        lastMessage: {
          messageId: 'ce60ad51-8aaf-4a53-8472-7365fde73342',
          roomId: '3bae935f-fd1d-4148-814f-17f3e73d7e3c',
          senderId: '27d314e7-427f-494e-a672-37c013a16255',
          senderUsername: 'Rachkov Artem',
          message: '4t4sdf',
          sendingDate: '1648046636456'
        }
      },
      {
        id: 'dfddc651-b55a-473f-a8b6-72358839838e',
        username: 'Vladimir Zhirinovsky',
        email: 'zhirinovsky@zhirinovsky',
        password: '$2b$10$SBUchtuXj9fuNFGIr7zvp.mtSvdTgRJ4UZdFwzvdI/Mc5qA0MaHfy',
        registration: '1648046363158',
        friends: [
          '27d314e7-427f-494e-a672-37c013a16255'
        ],
        groupRooms: [],
        friendsRequests: [],
        imagePath: 'https://ik.imagekit.io/nxinxzljr65/4677908833bd10a9d48b3f7a726b24b2_bSyTSztT6d',
        roomId: '36fbc526-4951-4749-a7c7-652c000b50e2',
        groupRoom: false,
        lastMessage: {
          messageId: '672a513e-c6a2-4ff7-ae3e-91c64f617bc6',
          roomId: '36fbc526-4951-4749-a7c7-652c000b50e2',
          senderId: 'dfddc651-b55a-473f-a8b6-72358839838e',
          senderUsername: 'Vladimir Zhirinovsky',
          message: 'ret',
          sendingDate: '1648046419453'
        }
      },
      {
        roomId: '656f78f9-93fb-4d58-81bc-88f5c09c9e58',
        participants: '27d314e7-427f-494e-a672-37c013a16255,4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4,9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
        groupRoom: true,
        creationDate: '1646218594186',
        fullParticipants: [
          {
            id: '27d314e7-427f-494e-a672-37c013a16255',
            username: 'Rachkov Artem',
            email: '123@123',
            password: '$2b$10$NuQZIwUPSJ.S0BEvJof9xuEZF/4nBGG1Frm6MtAqoVS13rSy.3NE2',
            registration: '1646204709864',
            friends: [
              '2d9e3e0d-2952-44fd-841e-b6d2b5b07622',
              '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
              '53cd4964-bf97-4de3-a87b-0f6015dc7253',
              'f5ec049c-243f-4de2-bb5e-2d19d0185a86',
              '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4',
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986',
              '2c045227-97a2-458a-ae10-b25ec35251d6',
              '54249bec-7354-4893-91b6-78a322b077ee',
              'dfddc651-b55a-473f-a8b6-72358839838e',
              '08653c83-8a5a-49c6-8d37-fdeb05655bb3'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              '6b3093c3-ea8b-4ebb-b28a-cfa5922a33f9',
              'ab206c75-d968-4a56-9d59-a2061030dcc0',
              '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/5c6aaac65b26b77edb28907751d2b684_OkBajWQb-'
          },
          {
            id: '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4',
            username: 'Donald Trump',
            email: '123456789@123456789',
            password: '$2b$10$T.bvi3WeKOgDFtAmrn8QOuQ2TOFsCM7yxsN51ksyBg5X0TU9rIRvi',
            registration: '1646205111093',
            friends: [
              '27d314e7-427f-494e-a672-37c013a16255',
              '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
              '3df8bc3f-7ce8-406c-b9a5-fa6436e8d986'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              'ab206c75-d968-4a56-9d59-a2061030dcc0',
              '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/8cab3297c8a5a4f950f98b3460ce588f_OuJkTZfidl'
          },
          {
            id: '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
            username: 'Vladimir Putin',
            email: '123456@123456',
            password: '$2b$10$CCf5CB0t/INynsPPoVcfRO7ORv3M0ypTQR4pk1mhhi/uJsGSH0QjS',
            registration: '1646204895375',
            friends: [
              '27d314e7-427f-494e-a672-37c013a16255',
              '4655a9cb-a7e0-4d3a-b234-0fac9ebd6cf4'
            ],
            groupRooms: [
              'c50b7d5d-697a-4e92-9d1b-758ad7d83698',
              '656f78f9-93fb-4d58-81bc-88f5c09c9e58'
            ],
            friendsRequests: [],
            imagePath: 'https://ik.imagekit.io/nxinxzljr65/18b3cddd9ae9b0a1dd574a7c9a8bd726_aKHyBqD2c'
          }
        ],
        lastMessage: {
          messageId: '897447a3-5753-48db-b900-15630a26d4ad',
          roomId: '656f78f9-93fb-4d58-81bc-88f5c09c9e58',
          senderId: '9d0ca04b-bf48-4f98-9f2f-4d0abc7d825b',
          senderUsername: 'Vladimir Putin',
          message: '3t43',
          sendingDate: '1647864775798'
        }
      }
        ]
      }
    }
    store = mockStore({initialState})

  })

  test('Friends list',  async () => {
    // @ts-ignore
    axiosMock.create.mockReturnValue(response);
    render(
      withTestRouter(
        <Provider store={store}>
          <ChatFriendList/>
        </Provider>
      )
    );
    store.dispatch(actions.setFullRooms(response.data.fullRooms))
    const rooms = await screen.findAllByTestId('roomItem')
  });

})