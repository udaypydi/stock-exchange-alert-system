import { ALERT_TIMING_CHANGE, ALERT_TIMING_INIT_STATE } from './alerttiming.constant';
import { POPULATE_PRICE_ALERTS } from '../../pricealerts/pricealertsform/pricealertsform.constant';
import { POPULATE_INDICATOR_SIGNAL } from '../../autosignal/autosignalform/autosignalform.constants';

export default function AlertTimingReducer(state = ALERT_TIMING_INIT_STATE, action) {
    switch(action.type) {
        case ALERT_TIMING_CHANGE: 
            return { ...state, [action.key]: action.value };
        
        case POPULATE_PRICE_ALERTS:
        case POPULATE_INDICATOR_SIGNAL:
            return { total: action.payload.total, daily: action.payload.daily };

        default:
            return { ...state };
    }
}
