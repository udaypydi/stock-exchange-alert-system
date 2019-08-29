import { FETCH_CURRENCY_DATA,  IS_LOADING, CURRENCIES } from './dashboardhome.constant';
import { fetchCurrencyExchangeData } from './dashboardhome.api';

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

export const fetchCurrencyData = () => (dispatch) => {
    let currencyExchange = [];
    dispatch(isGraphLoading());
    fetchCurrencyExchangeData()
        .then(res => {
            if (res.status === 200) {
                currencyExchange = res['currencyExchange'].map((json, index) => {
                    let min = parseFloat(json.currencyData[0].currencyValue['4. close']);
                    let max = parseFloat(json.currencyData[0].currencyValue['4. close']);

                    return {
                        data: json.currencyData.map(data => {
                        
                        if (parseFloat(data.currencyValue['4. close']) < min) {
                            min = parseFloat(data.currencyValue['4. close']);
                        }

                        if (parseFloat(data.currencyValue['4. close']) > max) {
                            max = parseFloat(data.currencyValue['4. close']);
                        }

                        return {
                            date: data.date,
                            price: parseFloat(data.currencyValue['4. close'])
                        }
                    }),
                    currency: json.currencyName,
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
            
        })  
    
}

export function formatChartData(currency) {
    return currency.map(data => ({
        name: data.date,
        price: parseFloat(data.currencyValue['1. open']),
    }))
}

