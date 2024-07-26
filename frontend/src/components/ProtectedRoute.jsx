import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserAuthenticated } from '../utils/auth';
import { refreshAccessToken } from '../utils/token';
import Loading from './Loading'

export default function ProtectedRoute({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [intervalId, setIntervalId] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        isUserAuthenticated().then((response) => {
            if (response) {
                console.log(`User is authenticated? ${response}`)
                setIsLoading(false)
                const interval = setInterval(() => {
                    refreshAccessToken();
                    console.log('Token refreshed!')
                }, 60 * 29 * 1000);
                setIntervalId(interval)
            } else {
                console.log('Bund vajj gayi')
                navigate('/login')
            }
        }).catch((error) => {
            console.error(error)
            navigate('/login')
        })

        // Clean up the interval on unmount
        return () => {
            if (intervalId) {
                clearInterval(intervalId)
                console.log('Left the protected route')
            }
        };
    }, []);

    return (
        <div>
            {isLoading ? <Loading /> : children}
        </div>
    );
}
