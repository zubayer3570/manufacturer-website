import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from 'react-query';
const Payment = () => {
    const { orderID } = useParams()
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const [cardErrorMessage, setCardErrorMessage] = useState('')
    const [success, setSuccess] = useState('')
    const [transId, setTransId] = useState('')

    //get the order
    const { data: order } = useQuery('getOrder', () =>
        fetch(`http://localhost:5000/getPayment/${orderID}`)
            .then(res => res.json())
    )

    //extract the price
    const price = parseFloat(order?.price.split('$')[1]) * order?.quantity

    //send price to server
    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))
    }, [price])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        setSuccess('')
        if (error) {
            setCardErrorMessage(error?.message)
        } else {
            setCardErrorMessage('')
        }
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: order.userName,
                        email: order.email
                    }
                }
            }
        )
        if (intentError) {
            setCardErrorMessage(intentError?.message)
        } else {
            setSuccess(`Your Payment is Successful, Transaction Id: ${paymentIntent.id}`)
            console.log(paymentIntent)
            setCardErrorMessage('')
            setTransId(paymentIntent.id)
            fetch('http://localhost:5000/updatePayment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ orderID: orderID, transId: paymentIntent.id })
            })
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit} className='m-auto w-[90%] lg:w-[40%] h-[300px] my-12 px-20 pt-8 shadow-lg rounded-lg'>
                <p className='font-bold text-xl text-red-500 mb-8'>Bill: {price} USD</p>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {
                    cardErrorMessage ? <p className='text-[red]'>{cardErrorMessage}</p> : ''
                }
                {
                    success ? <p className='text-[green] font-bold'>{success}</p> : ''
                }
                <button type="submit" disabled={!stripe || !clientSecret} className='btn btn-dark mt-8'>
                    Pay
                </button>
            </form>

        </>
    );
};

export default Payment;