import {Room} from "../../pages/profile/[id]";

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
    password?: string
}

interface InitialState {
    user: User,
    profileTab: string,
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
       inReqs: [],
       outReqs: [],
       password: ''
   },
   profileTab: 'friends',
}

const reducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'SET_PROFILE_TAB':
            return {
                ...state,
                profileTab: action.payload
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
        default: return state
    }
}

export {reducer};
export type { InitialState };
