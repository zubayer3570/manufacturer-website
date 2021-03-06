import React, { useEffect, useState } from 'react';


const useCheckAdmin = (email) => {
    const [userState, setUserState] = useState(false)
    useEffect(() => {
        fetch('https://manufacturer-website.herokuapp.com/checkAdmin', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
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