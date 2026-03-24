import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Interceptor to add auth token if available (using localStorage for simplicity)
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.userId) {
        // Here we could add a token header if JWT was implemented
        // config.headers.Authorization = `Bearer ${user.token}`;
        config.headers['X-User-Id'] = user.userId;
        config.headers['X-User-Role'] = user.role;
    }
    return config;
});

export default api;
