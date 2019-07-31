import { FETCH_ALERTS } from './alerthistory.constant';

export default function AlertsHistoryReducer(state = [], action) {
    switch(action.type) {
        case FETCH_ALERTS:
            return [ ...state, ...action.payload];
        
        default:
            return state;
    }
}
