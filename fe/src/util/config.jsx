import axios from 'axios';
import { history } from '../history';

export const domain = 'http://localhost:8080';
export const USERLOGIN = 'userLogin';
export const http = axios.create({
    baseURL: domain,
    timeout: 30000,
});

// API interceptors
http.interceptors.request.use((config) => {
    config.headers = { ...config.headers };
    let token = getStorageJSON('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

http.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            history.push('/login');
        }
        return Promise.reject(err);
    }
);

// Cấu hình localStorage
export const { saveStorageJSON, getStorageJSON, clearStorageJSON } = {
    saveStorageJSON: (name, data) => {
        localStorage.setItem(name, JSON.stringify(data));
    },
    getStorageJSON: (name) => {
        const sData = localStorage.getItem(name);
        if (sData) {
            try {
                return JSON.parse(sData);
            } catch (e) {
                console.error(`Error parsing JSON from localStorage key "${name}":`, e);
                return null;
            }
        }
        return null;
    },
    clearStorageJSON: (name) => {
        localStorage.removeItem(name);
    },
};