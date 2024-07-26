import { client } from "./api"
import { setTokensToLocalStorage, getAccessToken, isTokenExpired, refreshAccessToken } from "./token"

const loginUserURL = import.meta.env.VITE_API_USER_LOGIN_URL
const registerUserURL = import.meta.env.VITE_API_USER_REGISTER_URL

export async function loginUser(formData) {
    return client.post(
        loginUserURL,
        formData,
    ).then((response) => {
        switch (response.status) {
            case 200:
                const tokens = response.data
                setTokensToLocalStorage(tokens)
                return {
                    message: 'Login successful!',
                    type: 'success'
                }
        }
    }).catch((error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    return {
                        message: 'No such user exists!',
                        type: 'failure'
                    }
                default:
                    return {
                        message: 'An unknown error occured, please try later!',
                        type: 'failure'
                    }
            }
        } else {
            return {
                message: 'Seems like the servers are down, please try later!',
                type: 'failure'
            }
        }
    })
}

export async function registerUser(formData) {
    return client.post(
        registerUserURL,
        formData,
    ).then((response) => {
        switch (response.status) {
            case 201:
                return {
                    message: 'User registration successful!',
                    type: 'success'
                }
        }
    }).catch((error) => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    return {
                        message: 'An account with that username already exists!',
                        type: 'failure'
                    }
                default:
                    return {
                        message: 'An unknown error occured, please try later!',
                        type: 'failure'
                    }
            }
        } else {
            return {
                message: 'Seems like the servers are down, please try later!',
                type: 'failure'
            }
        }
    })
}

export async function isUserAuthenticated() {
    const accessToken = getAccessToken()
    const isAccessTokenExpired = isTokenExpired(accessToken)

    return new Promise((resolve, reject) => {
        if (isAccessTokenExpired) {
            // return false
            refreshAccessToken().then((response) => {
                console.log(response)
                resolve(true)
            }).catch((error) => {
                console.error(error)
                reject(false)
            })
        } else {
            resolve(true)
        }
    })
}