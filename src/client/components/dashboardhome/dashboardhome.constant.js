export const FETCH_CURRENCY_DATA = 'FETCH_CURRENCY_DATA';
export const DASHBOARD_HOME_INITIAL_STATE = {
    eurusd: [],
    usdjpy: [],
    usdgyd: [],
    audnzd: [],
};

export const CURRENCIES = ['eurusd', 'usdjpy', 'usdgyd', 'audnzd'];

export const CURRENCY_GRAPH_DATA = [{
    domain: [1, 1.2],
    colors: ['#15D0F8', '#12B1D3'],
    exchange: 'EUR/USD'
},
{
    domain: [107, 109],
    colors: ['#15D0F8', '#12B1D3'],
    exchange: 'USD/JPY'
},
{
    domain: [206, 208],
    colors: ['#A8EB12', '#051937'],
    exchange: 'USD/GYD'
},
{
    domain: [1, 1.1],
    colors: ['#15D0F8', '#12B1D3'],
    exchange: 'AUD/NZD'
}
];

export const DEMO_DATA_JSON = {
	"status": 200,
	"currencyExchange": [
		[{
			"date": "2019-07-26",
			"currencyValue": {
				"1. open": "1.1155",
				"2. high": "1.1157",
				"3. low": "1.1125",
				"4. close": "1.1127"
			}
		}, {
			"date": "2019-07-25",
			"currencyValue": {
				"1. open": "1.1142",
				"2. high": "1.1143",
				"3. low": "1.1134",
				"4. close": "1.1138"
			}
		}, {
			"date": "2019-07-24",
			"currencyValue": {
				"1. open": "1.1152",
				"2. high": "1.1156",
				"3. low": "1.1126",
				"4. close": "1.1140"
			}
		}, {
			"date": "2019-07-23",
			"currencyValue": {
				"1. open": "1.1208",
				"2. high": "1.1209",
				"3. low": "1.1144",
				"4. close": "1.1152"
			}
		}, {
			"date": "2019-07-22",
			"currencyValue": {
				"1. open": "1.1218",
				"2. high": "1.1225",
				"3. low": "1.1205",
				"4. close": "1.1208"
			}
		}, {
			"date": "2019-07-21",
			"currencyValue": {
				"1. open": "1.1215",
				"2. high": "1.1220",
				"3. low": "1.1212",
				"4. close": "1.1218"
			}
		}, {
			"date": "2019-07-19",
			"currencyValue": {
				"1. open": "1.1249",
				"2. high": "1.1268",
				"3. low": "1.1202",
				"4. close": "1.1221"
			}
		}, {
			"date": "2019-07-18",
			"currencyValue": {
				"1. open": "1.1227",
				"2. high": "1.1282",
				"3. low": "1.1204",
				"4. close": "1.1249"
			}
		}, {
			"date": "2019-07-17",
			"currencyValue": {
				"1. open": "1.1210",
				"2. high": "1.1234",
				"3. low": "1.1198",
				"4. close": "1.1227"
			}
		}, {
			"date": "2019-07-16",
			"currencyValue": {
				"1. open": "1.1261",
				"2. high": "1.1263",
				"3. low": "1.1200",
				"4. close": "1.1211"
			}
		}, {
			"date": "2019-07-15",
			"currencyValue": {
				"1. open": "1.1272",
				"2. high": "1.1284",
				"3. low": "1.1252",
				"4. close": "1.1261"
			}
		}],
		[{
			"date": "2019-07-26",
			"currencyValue": {
				"1. open": "108.5870",
				"2. high": "108.7300",
				"3. low": "108.5400",
				"4. close": "108.7230"
			}
		}, {
			"date": "2019-07-25",
			"currencyValue": {
				"1. open": "108.1670",
				"2. high": "108.2170",
				"3. low": "108.1200",
				"4. close": "108.1670"
			}
		}, {
			"date": "2019-07-24",
			"currencyValue": {
				"1. open": "108.2190",
				"2. high": "108.2770",
				"3. low": "107.9200",
				"4. close": "108.1650"
			}
		}, {
			"date": "2019-07-23",
			"currencyValue": {
				"1. open": "107.8930",
				"2. high": "108.2900",
				"3. low": "107.7900",
				"4. close": "108.2190"
			}
		}, {
			"date": "2019-07-22",
			"currencyValue": {
				"1. open": "107.8080",
				"2. high": "108.0700",
				"3. low": "107.6800",
				"4. close": "107.8900"
			}
		}, {
			"date": "2019-07-21",
			"currencyValue": {
				"1. open": "107.7800",
				"2. high": "107.8200",
				"3. low": "107.6700",
				"4. close": "107.8080"
			}
		}, {
			"date": "2019-07-19",
			"currencyValue": {
				"1. open": "107.4920",
				"2. high": "107.9780",
				"3. low": "107.3000",
				"4. close": "107.7000"
			}
		}, {
			"date": "2019-07-18",
			"currencyValue": {
				"1. open": "107.9590",
				"2. high": "108.0160",
				"3. low": "107.1800",
				"4. close": "107.4880"
			}
		}, {
			"date": "2019-07-17",
			"currencyValue": {
				"1. open": "108.2360",
				"2. high": "108.3300",
				"3. low": "107.8300",
				"4. close": "107.9580"
			}
		}, {
			"date": "2019-07-16",
			"currencyValue": {
				"1. open": "107.8630",
				"2. high": "108.3770",
				"3. low": "107.8100",
				"4. close": "108.2320"
			}
		}, {
			"date": "2019-07-15",
			"currencyValue": {
				"1. open": "107.8790",
				"2. high": "108.1100",
				"3. low": "107.7700",
				"4. close": "107.8630"
			}
		}],
		[{
			"date": "2019-07-25",
			"currencyValue": {
				"1. open": "207.4800",
				"2. high": "207.9800",
				"3. low": "206.0800",
				"4. close": "207.4800"
			}
		}, {
			"date": "2019-07-24",
			"currencyValue": {
				"1. open": "206.0800",
				"2. high": "207.9800",
				"3. low": "206.0800",
				"4. close": "206.0800"
			}
		}, {
			"date": "2019-07-23",
			"currencyValue": {
				"1. open": "206.8600",
				"2. high": "207.9800",
				"3. low": "206.0800",
				"4. close": "206.0800"
			}
		}, {
			"date": "2019-07-22",
			"currencyValue": {
				"1. open": "206.0800",
				"2. high": "207.9800",
				"3. low": "206.0800",
				"4. close": "206.8600"
			}
		}, {
			"date": "2019-07-21",
			"currencyValue": {
				"1. open": "206.0800",
				"2. high": "206.0800",
				"3. low": "206.0800",
				"4. close": "206.0800"
			}
		}, {
			"date": "2019-07-19",
			"currencyValue": {
				"1. open": "206.0800",
				"2. high": "206.8500",
				"3. low": "206.0800",
				"4. close": "206.0800"
			}
		}, {
			"date": "2019-07-18",
			"currencyValue": {
				"1. open": "207.0600",
				"2. high": "207.9800",
				"3. low": "206.0800",
				"4. close": "206.0800"
			}
		}, {
			"date": "2019-07-17",
			"currencyValue": {
				"1. open": "206.4900",
				"2. high": "207.9800",
				"3. low": "206.4900",
				"4. close": "206.8500"
			}
		}, {
			"date": "2019-07-16",
			"currencyValue": {
				"1. open": "206.8500",
				"2. high": "207.9800",
				"3. low": "206.4900",
				"4. close": "206.4900"
			}
		}, {
			"date": "2019-07-15",
			"currencyValue": {
				"1. open": "207.4800",
				"2. high": "207.9800",
				"3. low": "206.8500",
				"4. close": "206.8500"
			}
		}, {
			"date": "2019-07-14",
			"currencyValue": {
				"1. open": "207.4800",
				"2. high": "207.4800",
				"3. low": "207.4800",
				"4. close": "207.4800"
			}
		}],
		[{
			"date": "2019-07-26",
			"currencyValue": {
				"1. open": "1.0430",
				"2. high": "1.0438",
				"3. low": "1.0424",
				"4. close": "1.0434"
			}
		}, {
			"date": "2019-07-25",
			"currencyValue": {
				"1. open": "1.0415",
				"2. high": "1.0416",
				"3. low": "1.0406",
				"4. close": "1.0410"
			}
		}, {
			"date": "2019-07-24",
			"currencyValue": {
				"1. open": "1.0447",
				"2. high": "1.0448",
				"3. low": "1.0391",
				"4. close": "1.0415"
			}
		}, {
			"date": "2019-07-23",
			"currencyValue": {
				"1. open": "1.0407",
				"2. high": "1.0455",
				"3. low": "1.0401",
				"4. close": "1.0448"
			}
		}, {
			"date": "2019-07-22",
			"currencyValue": {
				"1. open": "1.0418",
				"2. high": "1.0423",
				"3. low": "1.0382",
				"4. close": "1.0406"
			}
		}, {
			"date": "2019-07-21",
			"currencyValue": {
				"1. open": "1.0404",
				"2. high": "1.0421",
				"3. low": "1.0396",
				"4. close": "1.0417"
			}
		}, {
			"date": "2019-07-19",
			"currencyValue": {
				"1. open": "1.0424",
				"2. high": "1.0432",
				"3. low": "1.0387",
				"4. close": "1.0414"
			}
		}, {
			"date": "2019-07-18",
			"currencyValue": {
				"1. open": "1.0411",
				"2. high": "1.0446",
				"3. low": "1.0399",
				"4. close": "1.0425"
			}
		}, {
			"date": "2019-07-17",
			"currencyValue": {
				"1. open": "1.0465",
				"2. high": "1.0470",
				"3. low": "1.0402",
				"4. close": "1.0411"
			}
		}, {
			"date": "2019-07-16",
			"currencyValue": {
				"1. open": "1.0471",
				"2. high": "1.0484",
				"3. low": "1.0439",
				"4. close": "1.0464"
			}
		}, {
			"date": "2019-07-15",
			"currencyValue": {
				"1. open": "1.0486",
				"2. high": "1.0491",
				"3. low": "1.0441",
				"4. close": "1.0475"
			}
		}]
	]
};
