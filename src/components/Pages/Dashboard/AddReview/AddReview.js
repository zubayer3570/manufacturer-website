import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';

const AddReview = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const [user, loading] = useAuthState(auth)
    if (loading) {
        return <Loading message='User is Loading' />
    }
    const onSubmit = (data) => {
        const review = {
            name: user.displayName,
            rating: data.rating,
            thoughts: data.thoughts
        }
        console.log(review)
        fetch('http://localhost:5000/addReview', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ review })
        })
            .then(res => navigate('/'))
    }
    return (
        <div className='px-4 lg:p-0'>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-[500px] p-8 lg:px-12 pt-6 pb-2 bg-[whitesmoke] mx-auto mt-4 rounded-lg'>
                <h1 className='text-xl font-bold text-center mb-4'>Add a Review</h1>
                <input type="text" {...register('rating', { required: true })} placeholder="Give us a Rating" className="input input-bordered w-full mb-2 font-bold" />
                <br />
                <textarea type="text" {...register('thoughts', { required: true })} placeholder="Enter Your thoughts" className="input input-bordered w-full mb-2 font-bold h-24" />
                <br />
                <input type="submit" value='Submit' className='btn mb-4' />
            </form>
        </div>
    );
};

export default AddReview;