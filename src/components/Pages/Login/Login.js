import React from 'react';
import { useForm } from 'react-hook-form';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../Shared/GoogleLogin/GoogleLogin';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        signInWithEmailAndPassword(data.email, data.password)
    }
    if (loading) {
        return <Loading message='Signing in' />
    }
    if (user) {
        navigate(from, { replace: true })
    }
    return (
        <div className='mx-4 lg:mx-0'>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-[500px] p-4 lg:p-12 bg-[whitesmoke] mx-auto mt-12 rounded-lg'>
                <h1 className='font-bold text-2xl text-center mb-6'>Login</h1>
                <input type="text" {...register('email', { required: true })} placeholder="enter email" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                <input type="password" {...register('password', { required: true })} placeholder="enter password" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                {
                    error ? <p className='text-[red] font-bold'>{error.message}</p> : undefined
                }
                <input type="submit" className='btn mb-4' />
                <br />
                <Link to='/register' className='font-bold'>I Don't have an account?</Link>
                <p className='text-center font-bold text-xl mt-4'>Or</p>
                <GoogleLogin />
            </form>
        </div>
    );
};

export default Login;