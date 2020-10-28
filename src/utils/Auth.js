
export const BASE_URL = 'https://register.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then((response) => {
        debugger;
        return response.json();
    })
    .then((res)=> {
        return res;
    })
    .catch((err) => console.log(err));
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then((response => response.json()))
    .then((data) => {
        if (data.user){
            localStorage.setItem('jwt', data.jwt);
            return data;
        } else {
            return;
        }
    })
    .catch(err => console.log(err));
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(res => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`) 
    })
    .then(data => data)
    .catch((err) => console.log(err));
}