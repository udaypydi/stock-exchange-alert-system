export const fetchExperts = () => fetch('/fetch-experts', {
    method: 'GET',
    credentials: 'include',
}).then(res => res.json());


export const toggleExpertFollow = (email) => fetch('/follow-unfollow-expert', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email }),
}).then(res => res.json());
