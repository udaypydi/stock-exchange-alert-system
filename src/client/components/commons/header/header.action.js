import { SIDEBAR_TOGGLE_STATUS, LOG_OUT_USER } from './header.constant';
import { logOutUser } from './header.api';
import history from '../../../history'

export function sideBarToggleStatus() {
    return {
        type: SIDEBAR_TOGGLE_STATUS,
    };
}

export function userLogOut() {
    return {
        type: LOG_OUT_USER,
    };
}

export const signOutUser = () => (dispatch) => {
    logOutUser()
        .then(json => {
            history.push('/sign-in');
            dispatch(userLogOut());
        });
}
