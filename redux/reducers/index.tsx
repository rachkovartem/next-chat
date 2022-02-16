interface listItem {
    _id: string, 
    text: string, 
    ready: boolean,
    date: string
}

interface InitialState {
    list: listItem[],
    filteredList: listItem[],
    filter: 'all' | 'ready' | 'notready',
    loginServerError: true | false
}

const initialState : InitialState = {
    list: [],
    filteredList: [],
    filter: 'all',
    loginServerError: false
}

const reducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'SET_LOGIN_SERVER_ERROR':
            return {
                ...state,
                loginServerError: action.payload
            }
        case 'SET_FILTERED_DATA':
            return {
                ...state,
                filteredList: [...action.payload]
            }
        case 'TOGGLE_READY':
            return {
                ...state,
                list: state.list.map(item => {
                    if (item._id === action.payload) {
                        item.ready = !item.ready
                    }
                    return item
                })
            }
        case 'DELETE_ITEM':
            return {
                ...state,
                list: [...state.list.filter(item => item._id !== action.payload)],
                filteredList: [...state.list.filter(item => item._id !== action.payload)]
            }
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }
        case 'SET_DATA':
            return {
                ...state,
                list: action.payload
            }
        default: return state
    }
}

export {reducer};
export type { InitialState, listItem };
