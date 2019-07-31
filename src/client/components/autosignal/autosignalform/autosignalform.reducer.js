import { 
    AUTO_SIGNAL_FORM_INITIAL_STATE, 
    AUTO_SIGNAL_NAME_CHANGE,
    AUTO_SIGNAL_INDICATOR_CHANGE,
    AUTO_SIGNAL_INDICATOR_PARAM_CHANGE,
    AUTO_SIGNAL_CURRENCY_CHANGE,
    AUTO_SIGNAL_TIME_FRAME_CHANGE,
    AUTO_SIGNAL_TRADE_LOTS_CHANGE,
    AUTO_SIGNAL_ALERTS_SELECT,
    AUTO_SIGNAL_INTERVAL_CHANGE,
    TOGGLE_LOADING_STATE,
    NOTIFY_SUCCESS_ACTION,
} from './autosignalform.constants';

export default function AutoSignalFormReducer(state = AUTO_SIGNAL_FORM_INITIAL_STATE, action) {
    switch( action.type) {
        case AUTO_SIGNAL_NAME_CHANGE:
            return {
                ...state,
                signalName: action.value,
            };
        
        case AUTO_SIGNAL_INDICATOR_CHANGE:
            return { ...state, indicator: action.value };
        
        case AUTO_SIGNAL_CURRENCY_CHANGE:
            return { ...state, currencyPair: action.value };

        case AUTO_SIGNAL_TIME_FRAME_CHANGE:
            return { ...state, timeFrame: action.value };

        case AUTO_SIGNAL_TRADE_LOTS_CHANGE:
            return { ...state, tradeLots: action.value };

        case AUTO_SIGNAL_ALERTS_SELECT: {
            const { alerts } = state;
            let newAlerts = [];
            const alertIndex = alerts.indexOf(action.value);

            if (alertIndex === -1) {
                if (action.value === 'both') {
                    if (alerts.length == 2) {
                        newAlerts = []
                    } else {
                        newAlerts = ['buy', 'sell'];
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
            
        case AUTO_SIGNAL_INDICATOR_PARAM_CHANGE: {
            const { payload } = action;
            const { key, value } = payload;

            return {
                ...state,
                indicatorParameters: {
                    ...state.indicatorParameters,
                    [key]: value,
                },
            };
        }

        case AUTO_SIGNAL_INTERVAL_CHANGE:
            return {
                ...state,
                signalTimeFrame: {
                    ...state.signalTimeFrame,
                    [action.payload.key]: action.payload.value,
                },
            };
        
        case TOGGLE_LOADING_STATE:
            return { ...state, isLoading: !state.isLoading, isSuccess: null };

        case NOTIFY_SUCCESS_ACTION:
            return { ...state, isSuccess: action.flag };

        default: 
        return { ...state };
    }
}
