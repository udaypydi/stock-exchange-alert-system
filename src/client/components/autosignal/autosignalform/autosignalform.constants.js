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

export const FORM_TOOLIPS = {
    SIGNAL_NAME: 'Name your signal',
    CURRENCY_PAIR: 'The currency pair',
    SIGNAL_TYPE: 'Select the type of signal',
    TRADE_LOTS: 'Trade lots are the number of trades you want to buy or sell',
    INDICATOR: 'The technical indicator to apply to the alert. Some indicators have additional parameters and condition options.',
    TIME_OUT: 'After execution, the alert will be inactive for this many seconds. This is useful to prevent too frequent executions.',
    TIME_FRAME: 'The time interval based on which the indicator is calculated.',
    PARAMETERS:  'The parameters based on which to calculate the technical indicator',
}

export const periodValueDropdownGenerator = () => {
    const periodValueDropdown = [];

    for (let i = 2; i <= 200; i ++) {
        periodValueDropdown.push({
            key: i,
            value: i,
            text: i,
        });
    }

    return periodValueDropdown;
}

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

export const OHLC = [
    {
        key: 'close',
        value: 'close',
        text: 'Close',
    },
    {
        key: 'high',
        value: 'high',
        text: 'High',
    },
    {
        key: 'low',
        value: 'low',
        text: 'Low',
    },
    {
        key: 'open',
        value: 'open',
        text: 'Open',
    },
    {
        key: '(H + L)/2',
        value: 'high_low',
        text: '(H + L)/2',
    }
]

export const INDICATOR_CONSTANTS = [
    {
        key: 'Simple Moving Average',
        value: 'simple_moving_average',
        text: 'Simple Moving Average',
    },
    {
        key: 'Exponential Moving Average',
        value: 'exponential_moving_average',
        text: 'Exponential Moving Average',
    },
    {
        key: 'MACD(Moving Average Convergence Divergence)',
        value: 'macd',
        text: 'MACD(Moving Average Convergence Divergence)',
    },
    {
        key: 'RSI(Relative Strength Index)',
        value: 'rsi',
        text: 'RSI(Relative Strength Index)',
    },
    {
        key: 'Bollinger Bands',
        value: 'bollinger_bands',
        text: 'Bollinger Bands',
    },
];

export const INDICATOR_KEY_VALUE_MAP = {
    simple_moving_average: 'Simple Moving Average',
    exponential_moving_average: 'Exponential Moving Average',
    macd: 'MACD(Moving Average Convergence Divergence)',
    rsi: 'RSI(Relative Strength Index)',
    bollinger_bands: 'Bollinger Bands',
};

export const MACD_PARAMETERS = {
    fast: [
        {
            key: 6,
            value: 6,
            text: 6,
        },
        {
            key: 12,
            value: 12,
            text: 12,
        },
        {
            key: 15,
            value: 15,
            text: 15,
        }
    ],

    slow: [
        {
            key: 13,
            value: 13,
            text: 13,
        },
        {
            key: 26,
            value: 26,
            text: 26,
        },
        {
            key: 35,
            value: 35,
            text: 35,
        }
    ],

    signal: [
        {
            key: 5,
            value: 5,
            text: 5,
        },
        {
            key: 9,
            value: 9,
            text: 9,
        },
        {
            key: 10,
            value: 10,
            text: 10,
        }
    ]
};


// action types 
export const AUTO_SIGNAL_NAME_CHANGE = 'AUTO_SIGNAL_NAME';
export const AUTO_SIGNAL_FORM_SUBMIT = 'AUTO_SIGNAL_FORM_SUBMIT';
export const AUTO_SIGNAL_INDICATOR_CHANGE = 'AUTO_SIGNAL_INDICATOR_CHANGE';
export const AUTO_SIGNAL_INDICATOR_PARAM_CHANGE = 'AUTO_SIGNAL_INDICATOR_PARAM_CHANGE';
export const AUTO_SIGNAL_CURRENCY_CHANGE = 'AUTO_SIGNAL_CURRENCY_CHANGE';
export const AUTO_SIGNAL_TIME_FRAME_CHANGE = 'AUTO_SIGNAL_TIME_FRAME_CHANGE';
export const AUTO_SIGNAL_TRADE_LOTS_CHANGE = 'AUTO_SIGNAL_TRADE_LOTS_CHANGE';
export const AUTO_SIGNAL_ALERTS_SELECT = 'AUTO_SIGNAL_ALERTS_SELECT';
export const AUTO_SIGNAL_INTERVAL_CHANGE = 'AUTO_SIGNAL_INTERVAL_CHANGE';
export const TOGGLE_LOADING_STATE = 'TOGGLE_LOADING_STATE';
export const NOTIFY_SUCCESS_ACTION = 'NOTIFY_SUCCESS_ACTION';
export const UPDATE_INDICATOR_ALERTS_TIMEOUT_HOURS = 'UPDATE_INDICATOR_ALERTS_TIMEOUT_HOURS';
// Reducer form state 

export const AUTO_SIGNAL_FORM_INITIAL_STATE = {
    currencyPair: '',
    timeFrame: '',
    alerts: [],
    tradeLots: 0,
    indicator: '',
    indicatorParameters: {
        period: '',
        ohlc: '',
        fast: '',
        slow: '',
        signal: '',
        level: '',
        deviation: '', 
    },
    signalTimeFrame: {
        timeOutHours: 3,
        timeZone: '',
        timeOut: 120,
    },
    signalName: '',
    addToProfile: false,
    isLoading: false,
    isSuccess: false,
};

