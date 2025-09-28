import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Proxied to backend
    withCredentials: true,
});

export default api;