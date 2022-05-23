import React from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const Register = () => {
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const navigate = useNavigate()
    const [createUserWithEmailAndPassword, user, loading, creatingUserError] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true })
    const [updateProfile, updating] = useUpdateProfile(auth);
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const displayName = data.displayName
        const email = data.email
        const password = data.password
        const photo = data.photo[0]
        const formData = new FormData()
        formData.append('image', photo)
        createUserWithEmailAndPassword(email, password)
        fetch("https://api.imgbb.com/1/upload?key=293822df47575bbb82fd79b3d7121123", {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(dataImg => {
                const photoURL = dataImg.data.url
                updateProfile({ displayName, photoURL })
                fetch("http://localhost:5000/addUser", {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ email: data.email })
                })
                    .then(res => navigate(from))
            })
    }
    if (loading) {
        return <Loading message='Signing in' />
    }
    if (updating) {
        return <Loading message='updating profile' />
    }
    if (user?.email) {
        navigate(from)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-[500px] p-12 bg-[whitesmoke] mx-auto mt-12 rounded-lg'>
            <input type="text" {...register('displayName', { required: true })} placeholder="Enter Your Name" className="input input-bordered w-full mb-2 font-bold" />
            <br />
            <input type="file" {...register('photo', { required: true })} placeholder="Enter email" className="input input-bordered w-full mb-2 font-bold" />
            <br />
            <input type="email" {...register('email', { required: true })} placeholder="Enter email" className="input input-bordered w-full mb-2 font-bold" />
            <br />
            <input type="password" {...register('password', { required: true })} placeholder="Enter password" className="input input-bordered w-full mb-2 font-bold" />
            <br />
            {
                creatingUserError ? <p className='text-[red] font-bold'>{creatingUserError.message}</p> : undefined
            }
            <input type="submit" className='btn mb-4' />
            <br />
            <Link to='/login' className='font-bold'>Already have an account?</Link>
        </form>
    );
};

export default Register;