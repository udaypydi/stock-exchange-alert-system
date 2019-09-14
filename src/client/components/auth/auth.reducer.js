import { SIGN_IN_USER, USER_INIT_STATE, UPDATE_USER_PROFILE_PIC } from './auth.constant';
import { UPDATE_USER_DATA } from 'components/home/home.constant';
import { LOG_OUT_USER } from 'commons/header/header.component';
import { FOLLOW_UNFOLLOW_EXPERT } from 'components/followexperts/followexperts.constant';

export default function userReducer(state = USER_INIT_STATE, action) {
    switch(action.type) {
        case SIGN_IN_USER: {
            if (!action.payload.isLoggedIn) {
                return {
                    ...state,
                    userLoginError: action.payload.message,
                };
            }
            return { 
                ...state, isLoggedIn: action.payload.isLoggedin, 
                email: action.payload.userId.email,
                following: action.payload.userId.following,
                name: action.payload.userId.name,
                alerts: action.payload.userId.alerts,
                profilePic: action.payload.userId.profile_pic,
                bannerURL: action.payload.userId.banner_url,
                followers: action.payload.userId.followers,
                userLoginError: '',
            };
        }

        case UPDATE_USER_DATA:
                return { 
                    ...state, 
                    isLoggedIn: action.payload.isLoggedIn, 
                    email: action.payload.email, 
                    following: action.payload.following,
                    name: action.payload.name,
                    alerts: action.payload.alerts,
                    profilePic: action.payload.profile_pic,
                    bannerURL: action.payload.banner_url,
                    followers: action.payload.followers,
                    activeGraphs: action.payload.active_graphs,
                    phoneNumber: action.payload.phoneNumber,
                    location: action.payload.location,
                };

        case UPDATE_USER_PROFILE_PIC: {
            if (action.key === 'profile') {
                return {
                    ...state,
                    profilePic: action.url,
                };
            }
            return {
                ...state,
                bannerURL: action.url,
            };
                
        }
                

        case LOG_OUT_USER:
                return { ...state, isLoggedIn: false, email: '' };

        case FOLLOW_UNFOLLOW_EXPERT:
                return { ...state, following: [...action.followedExperts] };

        default:
            return { ...state };
    }
};
