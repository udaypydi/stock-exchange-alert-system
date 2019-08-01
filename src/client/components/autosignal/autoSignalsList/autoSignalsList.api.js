import { BASE_URL } from 'src/index.constants';

export const fetchAutoSignalsList = () => fetch(`/get-auto-signals`).then(res => res.json());

export const deleteSignalFromList = (id) => fetch(`/delete-auto-signal?id=${id}`).then(res => res.json());