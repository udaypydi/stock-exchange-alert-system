import Moment from 'moment';
import { 
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
import { createAutoSignal } from './autosignalform.api';
import history from '../../../history';

export function toggleLoadingStatus() {
    return {
        type: TOGGLE_LOADING_STATE,
    }

}
export function autoSignalNameChange(name) {
    return {
        type: AUTO_SIGNAL_NAME_CHANGE,
        value: name,
    };
}

export function notifySuccessAction(flag) {
    return {
        type : NOTIFY_SUCCESS_ACTION,
        flag
    };
}

export const submitAutoSignalData = (data) => (dispatch) => {
    dispatch(toggleLoadingStatus());
    createAutoSignal(data)
        .then((res) => {
            dispatch(toggleLoadingStatus());
            dispatch(notifySuccessAction(true));
            setTimeout(() => {
                dispatch(notifySuccessAction(false));
                dispatch(history.push('/auto-signals'));
            }, 1000);
    });
}

export function autoSignalIndicatorChange(value) {
    return {
        type: AUTO_SIGNAL_INDICATOR_CHANGE,
        value,
    };
}

export function autoSignalIndicatorParamChange(value, key) {
    return {
        type: AUTO_SIGNAL_INDICATOR_PARAM_CHANGE,
        payload: {
            value,
            key,
        },
    };
}

export function autoSignalCurrencyChange(value) {
    return {
        type: AUTO_SIGNAL_CURRENCY_CHANGE,
        value,
    }
}

export function autoSignalTimeFrameChange(value) {
    return {
        type: AUTO_SIGNAL_TIME_FRAME_CHANGE,
        value,
    }
}

export function autoSignalTradeLotsChange(value) {
    return {
        type: AUTO_SIGNAL_TRADE_LOTS_CHANGE,
        value,
    };
}

export function autoSignalAlertsSelect(value) {
    return {
        type: AUTO_SIGNAL_ALERTS_SELECT,
        value,
    };
}

export function autoSignalIntervalUpdate(value, key) {
    let newValue = value;
    if (key === 'startTime' || key === 'endTime') {
        value = new Date(Moment.utc(value))
    }

    return {
        type: AUTO_SIGNAL_INTERVAL_CHANGE,
        payload: {
            value: newValue,
            key,
        }
    };
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

