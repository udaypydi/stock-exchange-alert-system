import { SIGN_IN_USER, SIGN_UP_USER } from './auth.constant';
import { userLogIn } from './auth.api';

export function updateUserLogInData(json) {
    return {
        type: SIGN_IN_USER,
        payload: json,
    };
}

export const signInUser = () => (dispatch) => {
    userLogIn()
        .then(json => {
            dispatch(updateUserLogInData(json));
        })
        .catch((err) => {
            console.log(err);
        });
};
