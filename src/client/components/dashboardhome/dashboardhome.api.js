import { BASE_URL } from 'src/index.constants';

export const fetchCurrencyExchangeData = () => fetch(`${BASE_URL}/get-exchange-rates`).then(res => res.json());