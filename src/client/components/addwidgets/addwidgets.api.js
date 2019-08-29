export const AddCurrencyPair = (data) => fetch('/add-currency-pair', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
}).then(res => res.json());


export const deleteCurrencyPair = (index) => fetch(`/delete-currency-pair?currencypair=${index}`, {
    method: 'GET',
    credentials: 'include',
}).then(res => res.json());
