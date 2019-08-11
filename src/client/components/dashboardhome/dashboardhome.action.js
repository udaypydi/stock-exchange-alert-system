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
    const currencyExchange = {};
    dispatch(isGraphLoading());
    fetchCurrencyExchangeData()
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem('currencyExchange', JSON.stringify(res));
                res['currencyExchange'].forEach((json, index) => {
                    currencyExchange[CURRENCIES[index]] = json.map(data => ({
                        date: data.date,
                        price: parseFloat(data.currencyValue['4. close'])
                    }));
                });
                dispatch(isGraphLoading());
                dispatch(updateCurrency(currencyExchange));
            }
            if (res.status === 500) {
                const response = JSON.parse(localStorage.getItem('currencyExchange'));
                response['currencyExchange'].forEach((json, index) => {
                    currencyExchange[CURRENCIES[index]] = json.map(data => ({
                        date: data.date,
                        price: parseFloat(data.currencyValue['4. close'])
                    }));
                });
                dispatch(isGraphLoading());
                dispatch(updateCurrency(currencyExchange));
            }
            
        })  
    
}

export function formatChartData(currency) {
    return currency.map(data => ({
        name: data.date,
        price: parseFloat(data.currencyValue['1. open']),
    }))
}

