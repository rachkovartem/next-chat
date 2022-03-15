import {Message, Room} from "../../pages/profile/[id]";
import {FriendRoom} from "../reducers";
import {ServerMessage} from "../../hooks/useChat";

export const setUser = (value: any) => {
    return {
        type: 'SET_USER',
        payload: value
    }
}

export const setFullRooms = (value: (FriendRoom | Room)[]) => {
    return {
        type: 'SET_FULL_ROOMS',
        payload: value
    }
}

export const setUserObjFriends = (value: any) => {
    return {
        type: 'SET_USER_OBJFRIENDS',
        payload: value
    }
}

export const setCurrentRoom = (value: Room | null) => {
    return {
        type: 'SET_CURRENT_ROOM',
        payload: value
    }
}

export const setUserInReqs = (value: any) => {
    return {
        type: 'SET_USER_INREQS',
        payload: value
    }
}

export const setUserOutReqs = (value: any) => {
    return {
        type: 'SET_USER_OUTREQS',
        payload: value
    }
}

export const setUserImagePath = (value: string) => {
    return {
        type: 'SET_USER_IMAGE_PATH',
        payload: value
    }
}

export const setRequestLoading = (value: boolean) => {
    return {
        type: 'SET_REQUEST_LOADING',
        payload: value
    }
}

export const setRequestError = (value: string | null) => {
    return {
        type: 'SET_REQUEST_ERROR',
        payload: value
    }
}

export const setUseChatStateConnected = (value: boolean) => {
    return {
        type: 'SET_USECHATSTATE_CONNECTED',
        payload: value
    }
}

export const setUseChatSateUser = (id: string | null, username: string | null) => {
    return {
        type: 'SET_USECHATSTATE_USER',
        payload: {id, username}
    }
}

export const setUseChatSateUsersOnline = (users: string[]) => {
    return {
        type: 'SET_USECHATSTATE_USERSONLINE',
        payload: users
    }
}

export const setUseChatSateMessages = (messages: ServerMessage[]) => {
    return {
        type: 'SET_USECHATSTATE_MESSAGES',
        payload: messages
    }
}

export const setUseChatSateNotification = (message: ServerMessage) => {
    return {
        type: 'SET_USECHATSTATE_NOTIFICATION',
        payload: message
    }
}

export const setUseChatSateLastMessages = (messages: {[roomId: string]: Message}) => {
    return {
        type: 'SET_USECHATSTATE_LASTMESSAGES',
        payload: messages
    }
}

export const setUseChatSateSocketLoading = (value: boolean) => {
    return {
        type: 'SET_USECHATSTATE_SOCKETLOADING',
        payload: value
    }
}


