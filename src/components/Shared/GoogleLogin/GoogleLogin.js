import React from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../Loading/Loading';

const GoogleLogin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from.pathname || '/'
    const [signInWithGoogle, googleUser, loading, error] = useSignInWithGoogle(auth)
    let errorMessage;
    if (googleUser) {
        const user = { email: googleUser.user.email }
        fetch('http://localhost:5000/getToken', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ user })
        })
            .then(res => res.json())
            .then(data => {
                const userCredential = {
                    name: googleUser.user.displayName,
                    email: googleUser.user.email,
                    photoURL: googleUser.user.photoURL
                }
                fetch("http://localhost:5000/addUser", {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ userCredential })
                })
                    .then(res => {
                        localStorage.setItem('accessToken', data.accessToken)
                        navigate(from, { replace: true })
                    })
            })
    }
    if (loading) {
        return <Loading message='Signin in' />
    }
    if (error) {
        errorMessage = error.message
    }
    if (loading) {
        return <Loading message='User is Loading' />
    }

    return (
        <div className=''>
            <p className='text-[red] font-bold text-center p-2'>{errorMessage}</p>
            <img onClick={() => signInWithGoogle()} src="https://i.ibb.co/tcj0NRb/btn-google-signin-dark-pressed-web-2x.png" className='w-60 mx-auto' alt="" />
        </div>
    );
};

export default GoogleLogin;