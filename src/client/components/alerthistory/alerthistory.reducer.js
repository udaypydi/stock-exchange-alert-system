import { FETCH_ALERTS } from './alerthistory.constant';

export default function AlertsHistoryReducer(state = [], action) {
    switch(action.type) {
        case FETCH_ALERTS:
            return [...action.payload];
        
        default:
            return state;
    }
}
