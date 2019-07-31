export const fetchAutoSignalsList = () => fetch('http://localhost:1000/get-auto-signals').then(res => res.json());

export const deleteSignalFromList = (id) => fetch(`http://localhost:1000/delete-auto-signal?id=${id}`).then(res => res.json());