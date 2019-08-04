import { BASE_URL } from 'src/index.constants';

export const createAutoSignal = (data) => fetch(`/create-auto-signal`, {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
}).then(res => res.json());
