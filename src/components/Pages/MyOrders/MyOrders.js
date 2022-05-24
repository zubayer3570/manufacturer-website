import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const MyOrders = () => {
    const [user, userLoading] = useAuthState(auth)
    const { data: myOrders, isLoading, refetch } = useQuery('myOrders', () => (
        fetch(`http://localhost:5000/myOrders/${user.email}`)
            .then(res => res.json())
    ))
    if (userLoading) {
        return <Loading message='User is Loading' />
    }
    if (isLoading) {
        return <Loading message='Data is loading' />
    }
    const cancelOrder = (id) => {
        fetch('http://localhost:5000/cancelOrder', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ orderId: id })
        })
            .then(res => refetch())
    }
    return (
        <div class="overflow-x-auto p-12">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Tool Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myOrders?.map((order, index) => (
                            <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td>{order.toolName}</td>
                                <td>{order.price}</td>
                                <td>{order.quantity}</td>
                                <td>
                                    {
                                        order.paid ?
                                            <p className='text-[green]'>Paid</p>
                                            :
                                            <button onClick={() => cancelOrder(order._id)} className='btn btn-dark font-bold'>Cancel Order</button>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;