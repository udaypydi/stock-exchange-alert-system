import { 
    EXPERT_SIGNAL_NAME_CHANGE, 
    EXPERT_SIGNAL_INDICATOR_CHANGE,
    EXPERT_SIGNAL_INDICATOR_PARAM_CHANGE,
    EXPERT_SIGNAL_CURRENCY_CHANGE,
    EXPERT_SIGNAL_TRADE_LOTS_CHANGE,
    EXPERT_SIGNAL_ALERTS_SELECT,
    TOGGLE_LOADING_STATE,
    NOTIFY_SUCCESS_ACTION,
    PROFIT_LOSS_CHANGE,
 } from './expertsignalform.constant';
import { createAutoSignal } from './expertsignalform.api';
import history from '../../history';

export function toggleLoadingStatus() {
    return {
        type: TOGGLE_LOADING_STATE,
    }

}
export function expertSignalNameChange(name) {
    return {
        type: EXPERT_SIGNAL_NAME_CHANGE,
        value: name,
    };
}

export function notifySuccessAction(flag) {
    return {
        type : NOTIFY_SUCCESS_ACTION,
        flag
    };
}

export const submitExpertSignalData = (data) => (dispatch) => {
    dispatch(toggleLoadingStatus());
    createAutoSignal(data)
        .then((res) => {
            dispatch(toggleLoadingStatus());
            dispatch(notifySuccessAction(true));
            setTimeout(() => {
                dispatch(notifySuccessAction(false));
                dispatch(history.push('/follow-experts'));
            }, 1000);
    });
}

export function expertSignalIndicatorChange(value) {
    return {
        type: EXPERT_SIGNAL_INDICATOR_CHANGE,
        value,
    };
}

export function expertSignalIndicatorParamChange(value, key) {
    return {
        type: EXPERT_SIGNAL_INDICATOR_PARAM_CHANGE,
        payload: {
            value,
            key,
        },
    };
}

export function expertSignalCurrencyChange(value) {
    return {
        type: EXPERT_SIGNAL_CURRENCY_CHANGE,
        value,
    }
}


export function expertSignalTradeLotsChange(value) {
    return {
        type: EXPERT_SIGNAL_TRADE_LOTS_CHANGE,
        value,
    };
}

export function expertSignalAlertsSelect(value) {
    return {
        type: EXPERT_SIGNAL_ALERTS_SELECT,
        value,
    };
}

export function profitLossTargetChange(key, value) {
    return {
        type: PROFIT_LOSS_CHANGE,
        payload: {
            key,
            value,
        }
    }
}

export function devitaionConstantGenerator() {
    const deviationConstant = [];
    for (let index = 1; index <= 10; index ++) {
        deviationConstant.push({
            key: index,
            value: index,
            text: index,
        });
    }
    return deviationConstant;
}
