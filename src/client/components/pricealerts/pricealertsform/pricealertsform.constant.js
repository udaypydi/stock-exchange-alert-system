export const PRICE_ALERT_NAME_CHANGE = 'PRICE_ALERT_NAME_CHANGE';
export const PRICE_ALERT_CURRENCY_PAIR = 'PRICE_ALERT_CURRENCY_PAIR';
export const PRICE_ALERT_PRICE_CHANGE = 'PRICE_ALERT_PRICE_CHANGE';
export const PRICE_ALERT_TIME_FRAME_CHANGE = 'PRICE_ALERT_TIME_FRAME_CHANGE';
export const PRICE_ALERT_TIME_INTERVAL_CHANGE = 'PRICE_ALERT_TIME_INTERVAL_CHANGE';
export const PRICE_ALERT_TIME_OUT_CHANGE = 'PRICE_ALERT_TIME_OUT_CHANGE';
export const PRICE_ALERT_TYPE_SELECT = 'PRICE_ALERT_TYPE_SELECT';
export const CREATE_PRICE_ALERTS = 'CREATE_PRICE_ALERTS';

export const PRICE_ALERT_SIGNAL_INIT_STATE = {
    name: '',
    currencyPair: '',
    price: '',
    alerts: [],
    timeFrame: '',
    timeBetweenAlerts: '',
    timeOutHours: 3,
};

export const FORM_TOOLIPS = {
    SIGNAL_NAME: 'Name your signal',
    CURRENCY_PAIR: 'The currency pair',
    SIGNAL_TYPE: 'The direction.',
    PRICE: 'The price at which the alert has to be sent. ',
    TIME_OUT: 'After execution, the alert will be inactive for this many seconds. This is useful to prevent too frequent executions.',
    TIME_FRAME: 'Fetch the currency between this specific time frame',
}

export const CURRENCY_OPTIONS = [
    {
        key: 'XAUUSD',
        name: 'XAUUSD',
        value: 'XAUUSD',
        text: 'XAUUSD',
    },
    {
        key: 'XAGUSD',
        name: 'XAGUSD',
        value: 'XAGUSD',
        text: 'XAGUSD',
    },
    {
        key: 'EURUSD',
        name: 'EURUSD',
        value: 'EURUSD',
        text: 'EURUSD',
    },
    {
        key: 'GBPUSD',
        name: 'GBPUSD',
        value: 'GBPUSD',
        text: 'GBPUSD',
    },
    {
        key: 'AUDUSD',
        name: 'AUDUSD',
        value: 'AUDUSD',
        text: 'AUDUSD',
    },
    {
        key: 'NZDUSD',
        name: 'NZDUSD',
        value: 'NZDUSD',
        text: 'NZDUSD',
    },
    {
        key: 'USDCAD',
        name: 'USDCAD',
        value: 'USDCAD',
        text: 'USDCAD',
    },
    {
        key: 'USDCHF',
        name: 'USDCHF',
        value: 'USDCHF',
        text: 'USDCHF',
    },
    {
        key: 'USDJPY',
        name: 'USDJPY',
        value: 'USDJPY',
        text: 'USDJPY',
    },
    {
        key: 'EURGBP',
        name: 'EURGBP',
        value: 'EURGBP',
        text: 'EURGBP',
    },
    {
        key: 'EURCHF',
        name: 'EURCHF',
        value: 'EURCHF',
        text: 'EURCHF',
    },
    {
        key: 'EURJPY',
        name: 'EURJPY',
        value: 'EURJPY',
        text: 'EURJPY',
    },
];


export const TIMEFRAME_OPTIONS = [
    {
        key: '5 min',
        value: '5min',
        text: '5 min',
    },
    {
        key: '30 min',
        value: '30min',
        text: '30 min',
    },
    {
        key: '1 hour',
        value: '1 hour',
        text: '1 hour',
    },
    {
        key: '4 hour',
        value: '4hour',
        text: '4 hour',
    },
    {
        key: '1 day',
        value: '1day',
        text: '1 day',
    },
    {
        key: '1 week',
        value: '1week',
        text: '1 week',
    },
];
