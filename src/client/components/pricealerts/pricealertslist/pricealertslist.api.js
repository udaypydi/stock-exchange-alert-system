export const fetchAutoSignalsList = () => fetch(`/get-price-alert-signals`).then(res => res.json());

export const deleteSignalFromList = (id) => fetch(`/delete-price-alert-signal?id=${id}`).then(res => res.json());
