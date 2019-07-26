export const createAutoSignal = (data) => fetch('http://localhost:1000/create-auto-signal', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
}).then(res => res.json());
