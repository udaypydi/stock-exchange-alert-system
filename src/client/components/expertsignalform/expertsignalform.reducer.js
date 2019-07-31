import { 
    EXPERT_SIGNAL_NAME_CHANGE, 
    EXPERT_SIGNAL_INDICATOR_CHANGE,
    EXPERT_SIGNAL_INDICATOR_PARAM_CHANGE,
    EXPERT_SIGNAL_CURRENCY_CHANGE,
    EXPERT_SIGNAL_TRADE_LOTS_CHANGE,
    EXPERT_SIGNAL_ALERTS_SELECT,
    TOGGLE_LOADING_STATE,
    NOTIFY_SUCCESS_ACTION,
    EXPERT_SIGNAL_FORM_INITIAL_STATE,
    PROFIT_LOSS_CHANGE,
} from './expertsignalform.constant';

export default function ExpertSignalFormReducer(state = EXPERT_SIGNAL_FORM_INITIAL_STATE, action) {
    switch( action.type) {
        case EXPERT_SIGNAL_NAME_CHANGE:
            return {
                ...state,
                signalName: action.value,
            };
        
        case EXPERT_SIGNAL_INDICATOR_CHANGE:
            return { ...state, indicator: action.value };
        
        case EXPERT_SIGNAL_CURRENCY_CHANGE:
            return { ...state, currencyPair: action.value };

        case EXPERT_SIGNAL_TRADE_LOTS_CHANGE:
            return { ...state, tradeLots: action.value };

        case EXPERT_SIGNAL_ALERTS_SELECT: 
            return {
                ...state,
                alerts: action.value,
            };
            
        case EXPERT_SIGNAL_INDICATOR_PARAM_CHANGE: {
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

        case PROFIT_LOSS_CHANGE: {
            let newState = { ...state };

            if (action.payload.key === 'loss') {
                newState.stopLoss = action.payload.value;
            } else {
                newState.targetProfit = action.payload.value;
            }
            return { ...newState };
        }
            

        
        case TOGGLE_LOADING_STATE:
            return { ...state, isLoading: !state.isLoading, isSuccess: null };

        case NOTIFY_SUCCESS_ACTION:
            return { ...state, isSuccess: action.flag };

        default: 
            return { ...state };
    }
}
