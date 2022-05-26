import React from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import GoogleLogin from '../../Shared/GoogleLogin/GoogleLogin';
import Loading from '../../Shared/Loading/Loading';

const Register = () => {
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const navigate = useNavigate()
    const [createUserWithEmailAndPassword, user, loading, creatingUserError] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true })
    const [updateProfile, updating, error] = useUpdateProfile(auth);
    const { register, handleSubmit } = useForm();
    if (loading) {
        return <Loading message='Signing in' />
    }
    if (updating) {
        return <Loading message='updating profile' />
    }
    if (user?.email) {
        navigate(from)
    }
    if (error) {
        console.log(error)
    }
    const onSubmit = async (data) => {
        const email = data.email
        const password = data.password
        const photo = data.photo[0]
        const formData = new FormData()
        formData.append('image', photo)
        await createUserWithEmailAndPassword(email, password)
        fetch("https://api.imgbb.com/1/upload?key=293822df47575bbb82fd79b3d7121123", {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(dataImg => {
                const displayName = data.name
                const photoURL = dataImg.data.url
                const userCredential = {
                    name: data.name,
                    photoURL: dataImg.data.url,
                    email: data.email,
                    phone: data.phone
                }
                updateProfile({ displayName, photoURL })
                fetch("https://manufacturer-website.herokuapp.com/addUser", {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ userCredential })
                })
                    .then(res => navigate(from), { replace: true })
            })
    }

    return (
        <div className='mx-4 lg:mx-0'>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-[500px] p-4 lg:p-12 bg-[whitesmoke] mx-auto mt-12 rounded-lg'>
                <h1 className='font-bold text-2xl text-center mb-6'>Register</h1>
                <input type="text" {...register('name', { required: true })} placeholder="Enter Your Name" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                <input type="file" {...register('photo', { required: true })} placeholder="Enter Your Photo" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                <input type="email" {...register('email', { required: true })} placeholder="Enter email" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                <input type="text" {...register('phone', { required: true })} placeholder="Enter Your Phone Number" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                <input type="password" {...register('password', { required: true })} placeholder="Enter password" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                {
                    creatingUserError ? <p className='text-[red] font-bold'>{creatingUserError.message}</p> : undefined
                }
                <input type="submit" className='btn mb-4' />
                <br />
                <Link to='/login' className='font-bold'>Already have an account?</Link>
                <p className='text-center font-bold text-xl mt-4'>Or</p>
                <GoogleLogin />
            </form>
        </div>
    );
};

export default Register;