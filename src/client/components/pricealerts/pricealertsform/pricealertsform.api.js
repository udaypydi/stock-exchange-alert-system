export const createPriceAlerts = (payload) => fetch('/create-price-alerts', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
}).then(res => res.json());


export const fetchAlertById = (id) => fetch(`/price-alert-byid?id=${id}`).then(res => res.json());
