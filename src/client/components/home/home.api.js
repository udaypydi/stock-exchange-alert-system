export const  getUser =  () => fetch('/get-user', {
    credentials: 'include',
    method: 'GET'
}).then(res => res.json());