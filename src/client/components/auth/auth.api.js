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


export const generateOTP = (userData) => fetch('/generate-otp', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
}).then(res => res.json());

export const validateOTP = (userData) => fetch('/validate-otp', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData),
}).then(res => res.json());


export const forgotPassword = (email) => fetch('/reset-password', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email }),
}).then(res => res.json());

export const resetPassword = (data) => fetch('/reset-user-data', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
}).then(res => res.json());
