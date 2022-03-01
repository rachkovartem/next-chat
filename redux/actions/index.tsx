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