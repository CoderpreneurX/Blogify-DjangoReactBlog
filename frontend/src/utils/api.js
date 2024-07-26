import axios from 'axios'
import { getAccessToken } from './token'

const baseURL = import.meta.env.VITE_API_BASE_URL

export const client = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

client.interceptors.request.use((config) => {
    const accessToken = getAccessToken()

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
}, (error) => {
    return Promise.reject(error)
})