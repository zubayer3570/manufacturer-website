import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const Purchase = () => {
    const { id } = useParams()
    const [disable, setDisable] = useState(false)
    const { data, isLoading } = useQuery('toolDetails', () => (
        fetch(`http://localhost:5000/toolDetails/${id}`)
            .then(res => res.json())
    ))
    const availableQuantity = data?.availableQuantity
    const [quantity, setQuantity] = useState(0)
    const minimumOrder = parseInt(data?.minimumOrder)
    let errorMessage;
    useEffect(() => {
        setQuantity(minimumOrder)
    }, [minimumOrder])
    const numberQuantity = parseInt(quantity)
    useEffect(() => {
        if (numberQuantity < minimumOrder || numberQuantity > availableQuantity || !numberQuantity) {
            setDisable(true)
        }
        else {
            setDisable(false)
        }
    }, [numberQuantity, minimumOrder, availableQuantity])

    if (numberQuantity < minimumOrder) {
        errorMessage = "Amount is smaller than minimum order!"
    }
    else if (numberQuantity > availableQuantity) {
        errorMessage = "Amount is larger than available quantity!"

    }
    else if (!numberQuantity) {
        errorMessage = "Enter a number!"
    }
    if (isLoading) {
        return <Loading message='Tool Details Loading' />
    }
    //place order function
    const placeOrder = () => {
        fetch('http://localhost:5000/placeOrder', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify()
        })
    }


    return (
        <>
            <div class=" bg-base-200 m-12 rounded-lg pb-12">
                <h1 class="text-3xl font-bold p-8 text-center">Tool Details</h1>
                <div className='hero-content flex-col lg:flex-row px-20'>
                    <img src={data.imgUrl} class="max-w-sm rounded-lg shadow-2xl mr-20" alt='' />
                    <div className='font-bold'>
                        <h1 class="text-5xl">{data.name}</h1>
                        <p class="py-6">{data.description}</p>
                        <p class="pb-2">Available Quantity: {data.availableQuantity}</p>
                        <p className='mb-4'>Minimum Order Quantity: {data.minimumOrder}</p>
                        <p className='pb-2'>How many do you want to buy?</p>
                        <input type='text' value={quantity || ''} onChange={(e) => setQuantity(e.target.value)} class="input input-bordered w-full max-w-xs" />
                        <br />
                        <p className='font-bold text-[red]'>{errorMessage}</p>
                        <br />
                        <button disabled={disable} class="btn btn-primary">Place Order</button>
                        <button disabled={disable} class="btn btn-primary ml-4">Go to Payment</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Purchase;