import React from 'react';

const History = () => {
    return (
        <>
            <h1 class="text-5xl font-bold text-center mt-44">Our History!</h1>
            <div class="hero-content flex-col lg:flex-row-reverse m-8">
                <img src="https://i.ibb.co/HzpkCDm/old-factory.jpg" class="max-w-sm rounded-lg shadow-2xl" alt='' />
                <div>
                    <h1 class="text-5xl font-bold">We Date Back to <span className='text-red-800'>1967</span></h1>
                    <p class="py-6">We have a long history in this field. So you can be sure to get the best poduct from us.</p>
                    <button class="btn btn-primary">Order Now!</button>
                </div>
            </div>
        </>
    );
};

export default History;