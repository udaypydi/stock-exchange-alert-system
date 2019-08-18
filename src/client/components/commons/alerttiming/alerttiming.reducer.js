import { ALERT_TIMING_CHANGE, ALERT_TIMING_INIT_STATE } from './alerttiming.constant';

export default function AlertTimingReducer(state = ALERT_TIMING_INIT_STATE, action) {
    switch(action.type) {
        case ALERT_TIMING_CHANGE: 
            return { ...state, [action.key]: action.value };
        
        default:
            return { ...state };
    }
}
