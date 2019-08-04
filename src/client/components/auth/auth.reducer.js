import { SIGN_IN_USER, USER_INIT_STATE } from './auth.constant';
import { UPDATE_USER_DATA } from 'components/home/home.constant';
import { LOG_OUT_USER } from 'commons/header/header.component';

export default function userReducer(state = USER_INIT_STATE, action) {
    switch(action.type) {
        case SIGN_IN_USER:
            return { ...state, isLoggedIn: action.payload.isLoggedin, email: action.payload.userId.email };

        case UPDATE_USER_DATA:
                return { ...state, isLoggedIn: action.payload.isLoggedIn, email: action.payload.email };

        case LOG_OUT_USER:
                return { ...state, isLoggedIn: false, email: '' };

        default:
            return { ...state };
    }
};
