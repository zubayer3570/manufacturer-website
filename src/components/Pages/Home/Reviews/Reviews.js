import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../../Shared/Loading/Loading';

const Reviews = () => {
    const { data: reviews, isLoading, refetch } = useQuery('reviews', () =>
        fetch('http://localhost:5000/getReview')
            .then(res => res.json())
    )
    if (isLoading) {
        return <Loading message='Reviews are Loading' />
    }
    return (
        <>
            <h1 className='text-4xl text-center font-bold mt-20'>Reviews</h1>
            < div className='grid grid-cols-1 lg:grid-cols-3 p-8' >
                {
                    reviews?.map(review => (
                        <div key={review._id} className="bg-base-100 shadow-md m-2 bg-[white] lg:flex rounded-lg">
                            <div className="card-body">
                                <h2 className="card-title font-bold">Rating: <span className='text-[green]'>{review.rating}/5</span></h2>
                                <h2 className="card-title font-bold">{review.name}</h2>
                                <p className='font-bold'>{review.thoughts}</p>
                            </div>
                        </div>
                    ))
                }
            </div >
        </>
    );
};

export default Reviews;