export const userLogIn = (userData) => fetch('/sign-in', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: userData.email, password: userData.password }),
}).then(res => res.json());

export const userSignUp = (userData) => fetch('/sign-up', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
}).then(res => res.json());
