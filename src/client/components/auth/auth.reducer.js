import { SIGN_IN_USER, USER_INIT_STATE } from './auth.constant';
import { UPDATE_USER_DATA } from 'components/home/home.constant';
import { LOG_OUT_USER } from 'commons/header/header.component';
import { FOLLOW_UNFOLLOW_EXPERT } from 'components/followexperts/followexperts.constant';

export default function userReducer(state = USER_INIT_STATE, action) {
    switch(action.type) {
        case SIGN_IN_USER:
            return { ...state, isLoggedIn: action.payload.isLoggedin, email: action.payload.userId.email };

        case UPDATE_USER_DATA:
                return { 
                    ...state, 
                    isLoggedIn: action.payload.isLoggedIn, 
                    email: action.payload.email, 
                    following: action.payload.following,
                    name: action.payload.name,
                };

        case LOG_OUT_USER:
                return { ...state, isLoggedIn: false, email: '' };

        case FOLLOW_UNFOLLOW_EXPERT:
                return { ...state, following: [...action.followedExperts] };

        default:
            return { ...state };
    }
};
