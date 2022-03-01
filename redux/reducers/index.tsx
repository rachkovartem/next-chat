import {User} from "../../pages/profile/[id]";

interface InitialState {
    user: User,
    profileTab: string
}

const initialState : InitialState = {
   user: {
       id: '',
       email: '',
       username: '',
       imagePath: '',
       friends: [],
       objFriends: [],
       friendRequests: [],
       fullGroupRooms: [],
       password: ''
   },
   profileTab: 'friends'
}

const reducer = (state = initialState, action: { type: string, payload: any }) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        default: return state
        case 'SET_PROFILE_TAB':
            return {
                ...state,
                profileTab: action.payload
            }
    }
}

export {reducer};
export type { InitialState };
