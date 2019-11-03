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
    STOP_LOSS: 'You will be notified with a loss alert and the alerts will stop once a loss is occured',
    TARGET_PROFIT: 'You will be notified with a profit alert and the alerts will stop once a profit is occured',
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
export const EXPERT_SIGNAL_NAME_CHANGE = 'EXPERT_SIGNAL_NAME_CHANGE';
export const EXPERT_SIGNAL_FORM_SUBMIT = 'EXPERT_SIGNAL_FORM_SUBMIT';
export const EXPERT_SIGNAL_INDICATOR_CHANGE = 'EXPERT_SIGNAL_INDICATOR_CHANGE';
export const EXPERT_SIGNAL_INDICATOR_PARAM_CHANGE = 'EXPERT_SIGNAL_INDICATOR_PARAM_CHANGE';
export const EXPERT_SIGNAL_CURRENCY_CHANGE = 'EXPERT_SIGNAL_CURRENCY_CHANGE';
export const EXPERT_SIGNAL_TIME_FRAME_CHANGE = 'EXPERT_SIGNAL_TIME_FRAME_CHANGE';
export const EXPERT_SIGNAL_TRADE_LOTS_CHANGE = 'EXPERT_SIGNAL_TRADE_LOTS_CHANGE';
export const EXPERT_SIGNAL_ALERTS_SELECT = 'EXPERT_SIGNAL_ALERTS_SELECT';
export const EXPERT_SIGNAL_INTERVAL_CHANGE = 'EXPERT_SIGNAL_INTERVAL_CHANGE';
export const PROFIT_LOSS_CHANGE = 'PROFIT_LOSS_CHANGE';
export const TOGGLE_LOADING_STATE = 'TOGGLE_LOADING_STATE';
export const NOTIFY_SUCCESS_ACTION = 'NOTIFY_SUCCESS_ACTION';
export const RESET_EXPERT_ALERTS_FORM = 'RESET_EXPERT_ALERTS_FORM';
export const POPULATE_EXPERT_SIGNAL_DATA = 'POPULATE_EXPERT_SIGNAL_DATA';

// Reducer form state 
export const EXPERT_SIGNAL_FORM_INITIAL_STATE = {
    signalName: '',
    currencyPair: '',
    price: '',
    alerts: [],
    timeFrame: '',
    timeBetweenAlerts: '',
    timeOutHours: 3,
    executionLimit: {
        total: '',
        daily: '',
    },
    stopLoss: '',
    targetProfit: '',
    addToProfile: true,
};

export const expiryTimeOptions = () => {
    let expiryTimeOptions = [];
    for (let i = 2; i <= 20; i = i + 2) {
        expiryTimeOptions.push({
            name: i,
            text: `${i} days` ,
            value: i,
        });
    }

    return expiryTimeOptions;
}

export const sampleData = [{"symbol":"XAUUSD","bid":1488,"ask":1489.5,"price":1488.75,"timestamp":1568465823},{"symbol":"XAGUSD","bid":17.433,"ask":17.464,"price":17.4485,"timestamp":1568465823},{"symbol":"EURUSD","bid":1.1074,"ask":1.1076,"price":1.1075,"quota_used":5749,"timestamp":1568465823},{"symbol":"GBPUSD","bid":1.24978,"ask":1.2507,"price":1.25024,"timestamp":1568465823},{"symbol":"AUDUSD","bid":0.68753,"ask":0.68858,"price":0.688055,"timestamp":1568465823},{"symbol":"NZDUSD","bid":0.63739,"ask":0.63827,"price":0.63783,"timestamp":1568465823},{"symbol":"USDCAD","bid":1.3285,"ask":1.32897,"price":1.32873,"timestamp":1568465823},{"symbol":"USDCHF","bid":0.9897,"ask":0.9906,"price":0.99015,"timestamp":1568465823},{"symbol":"USDJPY","bid":108.057,"ask":108.155,"price":108.106,"timestamp":1568465823},{"symbol":"EURGBP","bid":0.88552,"ask":0.88612,"price":0.88582,"timestamp":1568465823},{"symbol":"EURCHF","bid":1.0958,"ask":1.09704,"price":1.09642,"timestamp":1568465823},{"symbol":"EURJPY","bid":119.694,"ask":119.747,"price":119.7205,"timestamp":1568465823}];
