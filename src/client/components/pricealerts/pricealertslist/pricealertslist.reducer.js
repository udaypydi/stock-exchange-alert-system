import { FETCH_ALL_PRICE_ALERTS_SIGNALS, PRICE_ALERT_SIGNAL_LIST_INITIAL_STATE } from './pricealertslist.constant';

export default function PriceAlertsListReducer(state = PRICE_ALERT_SIGNAL_LIST_INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_ALL_PRICE_ALERTS_SIGNALS:
            return {
                ...state,
                signalsList: action.payload,
            };

        default:
            return { ...state };
    }
}
