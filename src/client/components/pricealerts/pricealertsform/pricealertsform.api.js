export const createPriceAlerts = (payload) => fetch('/create-price-alerts', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
}).then(res => res.json());
