import { UPDATE_USER_DATA } from './home.constant';
import { getUser } from './home.api';

export function updateUserState(json) {
    console.log('update user data', json);
    return {
        type: UPDATE_USER_DATA,
        payload: json,
    };
}

export const getUserState = () => (dispatch) => {
    getUser()
        .then(json => {
            dispatch(updateUserState(json));
        });
}
