export const setUser = (value: any) => {
    return {
        type: 'SET_USER',
        payload: value
    }
}

export const setProfileTab = (value: string) => {
    return {
        type: 'SET_PROFILE_TAB',
        payload: value
    }
}

export const setUserObjFriends = (value: any) => {
    return {
        type: 'SET_USER_OBJFRIENDS',
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