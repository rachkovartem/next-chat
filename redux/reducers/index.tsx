interface InitialState {
    user: any
}

const initialState : InitialState = {
   user: null
}

const reducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'SET_LOGIN_SERVER_ERROR':
            return {
                ...state,
                loginServerError: action.payload
            }
        default: return state
    }
}

export {reducer};
export type { InitialState };
