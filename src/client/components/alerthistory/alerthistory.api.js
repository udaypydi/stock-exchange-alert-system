import { BASE_URL } from 'src/index.constants';

export const getAllAlerts = () => fetch(`${BASE_URL}/get-alerts`).then(res => res.json());
