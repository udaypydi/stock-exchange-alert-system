import { SIGN_IN_USER, SIGN_UP_USER, UPDATE_USER_PROFILE_PIC } from './auth.constant';
import { userLogIn } from './auth.api';
import { getUserState } from 'components/home/home.action';
import history from '../../history';

export function updateUserLogInData(json) {
    return {
        type: SIGN_IN_USER,
        payload: json,
    };
}

export function updateUserProfilePic(imageUrl, key) {
    return {
        type: UPDATE_USER_PROFILE_PIC,
        url: imageUrl,
        key,
    };
}

export const signInUser = (userData) => (dispatch) => {
    userLogIn(userData)
        .then(json => {
            dispatch(updateUserLogInData(json));
            if (json.isLoggedin) {
                dispatch(getUserState());
                history.push('/home');
            }
        })
        .catch((err) => {
            console.log(err);
        });
};
