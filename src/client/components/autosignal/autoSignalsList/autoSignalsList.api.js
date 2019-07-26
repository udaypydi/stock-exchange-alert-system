export const fetchAutoSignalsList = () => fetch('http://localhost:1000/get-auto-signals').then(res => res.json());
