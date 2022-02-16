export const setFilteredData = (value: {_id: any, text: string, ready: boolean}[]) => {
    return {
        type: 'SET_FILTERED_DATA',
        payload: value
    }
}

export const deleteItem = (id: string) => {
    return {
        type: 'DELETE_ITEM',
        payload: id
    }
}

export const toggleReady = (id: string) => {
    return {
        type: 'TOGGLE_READY',
        payload: id
    }
}

export const setFilter = (value: 'all' | 'ready' | 'notready') => {
    return {
        type: 'SET_FILTER',
        payload: value
    }
}

export const setData = (value: {_id: any, text: string, ready: boolean}[]) => {
    return {
        type: 'SET_DATA',
        payload: value
    }
}

export const setLoginServerError = (value: boolean) => {
    return {
        type: 'SET_LOGIN_SERVER_ERROR',
        payload: value
    }
}