import { BASE_URL } from 'src/index.constants';

export const getAllAlerts = () => fetch(`/get-alerts`).then(res => res.json());
