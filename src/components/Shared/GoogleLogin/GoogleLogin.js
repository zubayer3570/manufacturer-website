import React from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../Loading/Loading';

const GoogleLogin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from.pathname || '/'
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
    let errorMessage;
    if (user) {
        navigate(from, { replace: true })
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