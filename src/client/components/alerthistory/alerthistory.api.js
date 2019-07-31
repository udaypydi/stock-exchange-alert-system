export const getAllAlerts = () => fetch('http://localhost:1000/get-alerts').then(res => res.json());
