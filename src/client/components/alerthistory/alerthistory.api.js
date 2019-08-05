import { BASE_URL } from 'src/index.constants';

export const getAllAlerts = () => fetch(`/get-alerts`).then(res => res.json());

export const getExpertAlerts = () => fetch(`/get-expert-alerts`).then(res => res.json());
