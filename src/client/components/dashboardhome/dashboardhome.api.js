import { BASE_URL } from 'src/index.constants';

export const fetchCurrencyExchangeData = () => fetch(`/get-exchange-rates`).then(res => res.json());

export const fetchAlertsCount = () => fetch('/get-alerts-count').then(res => res.json());
