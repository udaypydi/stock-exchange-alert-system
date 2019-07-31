import { BASE_URL } from 'src/index.constants';

export const createAutoSignal = (data) => fetch(`${BASE_URL}/create-expert-signals`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
}).then(res => res.json());
