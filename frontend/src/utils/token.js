import { jwtDecode } from 'jwt-decode'
import { client } from './api'

const refreshTokenURL = import.meta.env.VITE_API_TOKEN_REFRESH_URL

export function getAccessToken() {
    return localStorage.getItem('access')
}

export function getRefreshToken() {
    return localStorage.getItem('refresh')
}

export function setTokensToLocalStorage(tokens) {
    localStorage.setItem('access', tokens.access)
    localStorage.setItem('refresh', tokens.refresh)
}

export function isTokenExpired(token) {
    if (token) {
        const expirationTime = jwtDecode(token).exp
        const currentTime = Math.floor(Date.now() / 1000)
        console.log(currentTime >= expirationTime)
        return currentTime >= expirationTime
    } else {
        return true
    }
}

export async function refreshAccessToken() {
    const refreshToken = getRefreshToken()
    return new Promise((resolve, reject) => {
        if (!isTokenExpired(refreshToken)) {
            const data = {
                'refresh': refreshToken
            }
            client.post(
                refreshTokenURL,
                data
            ).then((response) => {
                const tokens = {
                    refresh: refreshToken,
                    access: response.data.access
                }
                setTokensToLocalStorage(tokens)
                resolve('Tokens refreshed')
            }).catch((error) => {
                reject(error.data)
            })
        } else {
            reject('Invalid refresh token!')
        }
    })
}