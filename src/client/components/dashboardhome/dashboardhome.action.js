import { FETCH_CURRENCY_DATA,  DEMO_DATA_JSON, CURRENCIES } from './dashboardhome.constant';
import { fetchCurrencyExchangeData } from './dashboardhome.api';

function updateCurrency(currencyData) {
    return {
        type: FETCH_CURRENCY_DATA,
        value: currencyData,
    }
}

export const fetchCurrencyData = () => (dispatch) => {
    const currencyExchange = {};
    DEMO_DATA_JSON['currencyExchange'].forEach((json, index) => {
        currencyExchange[CURRENCIES[index]] = json.map(data => ({
            date: data.date,
            uv: parseFloat(data.currencyValue['1. open'])
        }));
    });

    dispatch(updateCurrency(currencyExchange));
}

export function formatChartData(currency) {
    return currency.map(data => ({
        name: data.date,
        uv: parseFloat(data.currencyValue['1. open']),
    }))
}

