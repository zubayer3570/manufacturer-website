import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';

const useCheckAdmin = (email) => {
    const [userState, setUserState] = useState(false)
    useEffect(() => {
        fetch('http://localhost:5000/checkAdmin', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
            .then(res => res.json())
            .then(data => {
                setUserState(data.message)
            })
    }, [email])
    return [userState, setUserState];
};

export default useCheckAdmin;