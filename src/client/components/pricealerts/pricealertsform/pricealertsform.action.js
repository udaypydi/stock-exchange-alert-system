import { 
    PRICE_ALERT_NAME_CHANGE,
    PRICE_ALERT_CURRENCY_PAIR,
    PRICE_ALERT_PRICE_CHANGE,
    PRICE_ALERT_TIME_FRAME_CHANGE,
    PRICE_ALERT_TIME_INTERVAL_CHANGE,
    PRICE_ALERT_TIME_OUT_CHANGE,
    PRICE_ALERT_TYPE_SELECT,
} from './pricealertsform.constant';
import { createPriceAlerts } from './pricealertsform.api';


export function priceAlertNameChange(value) {
    return {
        type: PRICE_ALERT_NAME_CHANGE,
        value,
    };
}

export function priceAlertCurrencyPair(value) {
    return {
        type: PRICE_ALERT_CURRENCY_PAIR,
        value,
    }
}

export function priceAlertPriceChange(value) {
    return {
        type: PRICE_ALERT_PRICE_CHANGE,
        value,
    };
}


export function priceAlertTimeFrameChange(value) {
    return {
        type: PRICE_ALERT_TIME_FRAME_CHANGE,
        value,
    };
}

export function priceAlertTimeIntervalChange(value) {
    return {
        type: PRICE_ALERT_TIME_INTERVAL_CHANGE,
        value,
    }
};

export function priceAlertTimeOutHoursChange(value) {
    return {
        type: PRICE_ALERT_TIME_OUT_CHANGE,
        value,
    };
}

export function priceAlertTypeSelect(key) {
    return {
        type: PRICE_ALERT_TYPE_SELECT,
        value: key,
    };
}

export function createTraderPriceAlerts(payload) {
    createPriceAlerts(payload)
        .then(json => {
            console.log(json);
        })
}