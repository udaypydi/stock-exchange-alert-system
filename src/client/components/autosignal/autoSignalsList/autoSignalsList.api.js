import { BASE_URL } from 'src/index.constants';

export const fetchAutoSignalsList = () => fetch(`${BASE_URL}/get-auto-signals`).then(res => res.json());

export const deleteSignalFromList = (id) => fetch(`${BASE_URL}/delete-auto-signal?id=${id}`).then(res => res.json());