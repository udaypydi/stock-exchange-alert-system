export const FETCH_CURRENCY_DATA = 'FETCH_CURRENCY_DATA';
export const UPDATE_GRAPH_DATA = 'UPDATE_GRAPH_DATA';

export const DASHBOARD_HOME_INITIAL_STATE = {
	currencyGraphs: [],
	alertsGraph: [],
	isLoading: false,
};

export const CURRENCIES = ['eurusd', 'usdjpy', 'usdgyd', 'audnzd'];

export const CURRENCY_GRAPH_DATA = [{
    domain: [1, 1.19],
    colors: ['#163469', '#FE9E15'],
	exchange: 'EUR/USD',
	strokeColor: '#4D95F3',
},
{
    domain: [107, 109],
    colors: ['#4ECDE4', '#06BB8A'],
	exchange: 'USD/JPY',
	strokeColor: '#4D95F3',
},
{
    domain: [206, 208],
    colors: ['#e81a24', '#FEEADA'],
	exchange: 'USD/GYD',
	strokeColor: '#FEEADA',
},
{
    domain: [1, 1.1],
    colors: ['#038FDE', '#007CD3'],
    exchange: 'AUD/NZD'
}
];


export const ALERT_SIGNAL_HISTORY = [];


export const ALERT_SIGNAL_HISTORY_DEMO = [
	{
		date: '2019-07-26',
		alerts: 12,
	},
	{
		date: '2019-07-27',
		alerts: 100,
	},
	{
		date: '2019-07-28',
		alerts: 200,
	},
	{
		date: '2019-07-29',
		alerts: 30,
	},
	{
		date: '2019-07-30',
		alerts: 300,
	},
	{
		date: '2019-08-01',
		alerts: 120,
	},
	{
		date: '2019-08-02',
		alerts: 90,
	},
	{
		date: '2019-08-03',
		alerts: 400,
	},
	{
		date: '2019-08-04',
		alerts: 180,
	},
];

export const IS_LOADING = 'IS_GRAPH_LOADING';

export const COLOR_MAPPING = {
	GRAPH_0: {
		colors: ['#163469', '#FE9E15'],
		strokeColor: '#4D95F3',
	},
	GRAPH_1: {
		colors: ['#4ECDE4', '#06BB8A'],
		strokeColor: '#4D95F3',
	},
	GRAPH_2: {
		colors: ['#e81a24', '#FEEADA'],
		strokeColor: '#FEEADA',
	},
	GRAPH_3: {
		colors: ['#038FDE', '#007CD3'],
	}
}