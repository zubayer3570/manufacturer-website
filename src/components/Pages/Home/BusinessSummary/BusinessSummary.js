import React from 'react';

const BusinessSummary = () => {
    return (
        <div className='font-bold p-12'>
            <h1 className='text-4xl text-orange-600 text-center mt-8 mb-4'>Our Business Statistics</h1>
            <h1 className='text-xl text-center mb-12'>Proof of the trust we have!</h1>
            <div className='grid grid-cols-3'>
                <div className='shadow p-12 rounded-lg mx-8 bg-red-100'>
                    <h1 className='text-2xl text-center'>Served Customers!</h1>
                    <p className='text-2xl text-center'>200k</p>
                </div>
                <div className='shadow p-12 mx-8 rounded-lg bg-green-200'>
                    <h1 className='text-2xl text-center'>Return Customers!</h1>
                    <p className='text-2xl text-center'>85%</p>
                </div>
                <div className='shadow p-12 mx-8 rounded-lg bg-yellow-200'>
                    <h1 className='text-2xl text-center'>Annual Revenue</h1>
                    <p className='text-2xl text-center'>3+ Billion USD</p>
                </div>
            </div>
        </div>
    );
};

export default BusinessSummary;