export const userLogIn = () => fetch('/sign-in', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: 'uday@gmail.com', password: '123456' }),
}).then(res => res.json());

export const userSignUp = (userData) => fetch('/sign-up', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
});
