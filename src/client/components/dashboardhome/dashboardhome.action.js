import { FETCH_CURRENCY_DATA,  IS_LOADING, UPDATE_GRAPH_DATA } from './dashboardhome.constant';
import { fetchCurrencyExchangeData, fetchAlertsCount } from './dashboardhome.api';

function updateCurrency(currencyData) {
    return {
        type: FETCH_CURRENCY_DATA,
        value: currencyData,
    }
}

function isGraphLoading() {
    return {
        type: IS_LOADING,
    };
}

function updateAlertsGraph(data) {
    return {
        type: UPDATE_GRAPH_DATA,
        payload: data,
    };
}

export const fetchCurrencyData = () => (dispatch) => {
    let currencyExchange = [];
    dispatch(isGraphLoading());
    fetchCurrencyExchangeData()
        .then(res => {
            if (res.status === 200) {
                currencyExchange = res['currencyExchange'].map((json, index) => {
                    const historicalDataKeys = Object.keys(json.historicalData);
                    const { historicalData } = json;
                    let min = parseFloat(json.historicalData[historicalDataKeys[0]]);
                    let max = parseFloat(json.historicalData[historicalDataKeys[0]]);

                    return {
                        data: historicalDataKeys.map(key => {
                        
                        if (parseFloat(historicalData[key]) < min) {
                            min = parseFloat(historicalData[key]);
                        }

                        if (parseFloat(historicalData[key]) > max) {
                            max = parseFloat(historicalData[key]);
                        }

                        return {
                            date: key,
                            price: parseFloat(historicalData[key])
                        }
                    }),
                    currency: json.currencyPair,
                    graphStyle: json.graphStyle,
                    domain: [max - min < 0.5 ? min : min - 0.5, max],
                }}
                );
                dispatch(isGraphLoading());
                dispatch(updateCurrency(currencyExchange));
            }
            if (res.status === 500) {
                dispatch(isGraphLoading());
                // dispatch(updateCurrency([]));
            }
            
        });


    fetchAlertsCount()
        .then((json) => {
            dispatch(updateAlertsGraph(json.alerts));
        });
}

export function formatChartData(currency) {
    return currency.map(data => ({
        name: data.date,
        price: parseFloat(data.currencyValue['1. open']),
    }))
}
