import { SIGN_IN_USER, SIGN_UP_USER } from './auth.constant';
import { userLogIn } from './auth.api';
import history from '../../history';

export function updateUserLogInData(json) {
    return {
        type: SIGN_IN_USER,
        payload: json,
    };
}

export const signInUser = (userData) => (dispatch) => {
    userLogIn(userData)
        .then(json => {
            dispatch(updateUserLogInData(json));
            history.push('/home');
        })
        .catch((err) => {
            console.log(err);
        });
};
