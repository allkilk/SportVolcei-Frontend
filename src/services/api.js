import axios from 'axios';

// L'URL base per le API del backend
// Durante lo sviluppo locale: http://localhost:5000/api
// Quando la tua app è online: l'URL del tuo backend deployato su Render/Railway (es. https://sportvolcei-backend.onrender.com/api)
// Usa process.env.REACT_APP_API_URL per prendere la variabile dal file .env.example (o dall'ambiente di deployment)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor per aggiungere il token JWT a ogni richiesta autorizzata
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token; // Il backend si aspetta il token nell'header 'x-auth-token'
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;