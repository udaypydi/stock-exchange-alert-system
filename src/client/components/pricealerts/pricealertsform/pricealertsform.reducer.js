import { 
    PRICE_ALERT_NAME_CHANGE, 
    PRICE_ALERT_SIGNAL_INIT_STATE,
    PRICE_ALERT_CURRENCY_PAIR,
    PRICE_ALERT_PRICE_CHANGE,
    PRICE_ALERT_TIME_FRAME_CHANGE,
    PRICE_ALERT_TIME_INTERVAL_CHANGE,
    PRICE_ALERT_TIME_OUT_CHANGE,
    PRICE_ALERT_TYPE_SELECT,
    POPULATE_PRICE_ALERTS,
} from './pricealertsform.constant';

export default function priceAlertsReducer(state = PRICE_ALERT_SIGNAL_INIT_STATE, action) {
    switch(action.type) {
        case PRICE_ALERT_NAME_CHANGE:
            return { ...state, name: action.value };
        
        case PRICE_ALERT_CURRENCY_PAIR:
            return { ...state, currencyPair: action.value };

        case PRICE_ALERT_PRICE_CHANGE:
            return { ...state, price: action.value };
        
        case PRICE_ALERT_TIME_FRAME_CHANGE:
            return { ...state, timeFrame: action.value };
        
        case PRICE_ALERT_TIME_INTERVAL_CHANGE:
            return { ...state, timeBetweenAlerts: action.value };

        case PRICE_ALERT_TIME_OUT_CHANGE:
            return { ...state, timeOutHours: action.value };

        case PRICE_ALERT_TYPE_SELECT: {
            const { alerts } = state;
            let newAlerts = [];
            const alertIndex = alerts.indexOf(action.value);

            if (alertIndex === -1) {
                if (action.value === 'both') {
                    if (alerts.length == 2) {
                        newAlerts = []
                    } else {
                        newAlerts = ['high', 'low'];
                    }
                } else {
                    newAlerts = [...alerts, action.value];
                }
            } else {
                newAlerts = alerts.splice(alertIndex, 1);
            }

            return {
                ...state,
                alerts: newAlerts,
            }
        }

        case POPULATE_PRICE_ALERTS:
            return { ...action.payload };
                
        default:
            return { ...state };
    }
}
