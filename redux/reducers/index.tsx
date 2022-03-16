import {Message, Room} from "../../pages/profile/[id]";
import {ServerMessage} from "../../hooks/useNotification";
import {Socket} from "socket.io-client";

export interface InReq {
    id: string,
    userSenderId: string,
    userRecipientId: string,
    userRecipientStatus: boolean,
    sender: User,
}

export interface OutReq {
    id: string,
    userSenderId: string,
    userRecipientId: string,
    userRecipientStatus: boolean,
    recipient: User,
}

export interface FriendRoom extends User {
    roomId: string,
    groupRoom: boolean,
    lastMessage: ServerMessage,
    fullParticipants?: User[],
  }

interface User {
    id: string,
    email: string,
    username: string,
    imagePath: string,
    friends: string[],
    objFriends: User[],
    groupRooms: string[],
    friendRequests: string[],
    fullGroupRooms: Room[],
    inReqs: InReq[],
    outReqs: OutReq[],
    friendsRoomsIds: {[key: string]: string},
    fullRooms: FriendRoom[] & Room [],
    password?: string
}

interface InitialState {
    user: User,
    fullRooms: FriendRoom[] | Room [],
    currentRoom: Room | null,
    loading: boolean,
    error: string | null,
    useChatState: {
        connected: boolean,
        user: {id: string | null, username: string | null},
        usersOnline: string[],
        messages: ServerMessage[],
        notification: ServerMessage | null,
        lastMessages: {[roomId: string]: Message},
        socketLoading: boolean,
    },
    socket: null | Socket,
}

const initialState : InitialState = {
    user: {
       id: '',
       email: '',
       username: '',
       imagePath: '',
        groupRooms: [],
       friends: [],
       objFriends: [],
       friendRequests: [],
       fullGroupRooms: [],
       friendsRoomsIds: {},
       inReqs: [],
       outReqs: [],
       fullRooms:[],
       password: ''
   },
    fullRooms: [],
    currentRoom: null,
    loading: false,
    error: null,
    useChatState: {
        connected: false,
        user: {id: null, username: null},
        usersOnline: [],
        messages: [],
        notification: null,
        lastMessages: {},
        socketLoading: false,
    },
    socket: null,
}

const reducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            }
        case 'SET_FULL_ROOMS':
            return {
                ...state,
                fullRooms: [...action.payload],
            }
        case 'SET_CURRENT_ROOM':
            return {
                ...state,
                currentRoom: action.payload ? {...action.payload} : null,
            }
        case 'SET_USER_OBJFRIENDS':
            return {
                ...state,
                user: {
                    ...state.user,
                    objFriends: action.payload,
                }
            }
        case 'SET_USER_INREQS':
            return {
                ...state,
                user: {
                    ...state.user,
                    inReqs: action.payload,
                }
            }
        case 'SET_USER_OUTREQS':
            return {
                ...state,
                user: {
                    ...state.user,
                    outReqs: action.payload,
                }
            }
        case 'SET_USER_IMAGE_PATH':
            return {
                ...state,
                user: {
                    ...state.user,
                    imagePath: action.payload,
                }
            }
        case `SET_REQUEST_LOADING`:
            return {
                ...state,
                loading: action.payload,
            }
        case `SET_REQUEST_ERROR`:
            return {
                ...state,
                error: action.payload,
            }
        case 'SET_USECHATSTATE_CONNECTED':
            return {
                ...state,
                useChatState: {
                    ...state.useChatState,
                    connected: action.payload
                }
            }
        case 'SET_USECHATSTATE_USER':
            return {
                ...state,
                useChatState: {
                    ...state.useChatState,
                    user: {
                        id: action.payload.id,
                        username: action.payload.username,
                    }
                }
            }
        case 'SET_USECHATSTATE_USERSONLINE':
            return {
                ...state,
                useChatState: {
                    ...state.useChatState,
                    usersOnline: action.payload,
                }
            }
        case 'SET_USECHATSTATE_MESSAGES':
            return {
                ...state,
                useChatState: {
                    ...state.useChatState,
                    messages: action.payload,
                }
            }
        case 'SET_USECHATSTATE_NOTIFICATION':
            return {
                ...state,
                useChatState: {
                    ...state.useChatState,
                    notification: action.payload,
                }
            }
        case 'SET_USECHATSTATE_LASTMESSAGES':
            return {
                ...state,
                useChatState: {
                    ...state.useChatState,
                    lastMessages: action.payload,
                }
            }
        case 'SET_USECHATSTATE_SOCKETLOADING':
            return {
                ...state,
                useChatState: {
                    ...state.useChatState,
                    socketLoading: action.payload,
                }
            }
        case 'SET_SOCKET':
            return {
                ...state,
                socket: action.payload,
            }
        default: return state
    }
}

export {reducer};
export type { InitialState };
