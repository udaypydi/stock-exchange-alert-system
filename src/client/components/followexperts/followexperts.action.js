import { FOLLOW_UNFOLLOW_EXPERT } from './followexperts.constant';
import { toggleExpertFollow } from './followexperts.api';

function followUnfollowExpert(experts) {
    return {
        type: FOLLOW_UNFOLLOW_EXPERT,
        followedExperts: experts.following,
    };
}

export const expertsFollow = (email) => (dispatch) => {
    toggleExpertFollow(email)
        .then(json => {
            dispatch(followUnfollowExpert(json));
        });
}