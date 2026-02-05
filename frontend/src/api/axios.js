import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // Pointing to your backend
});

// Automatically add the Token to every request if it exists
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).token
        : null;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;