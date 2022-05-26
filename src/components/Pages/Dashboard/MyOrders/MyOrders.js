import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';

const MyOrders = () => {
    const navigate = useNavigate()
    const [user, userLoading] = useAuthState(auth)
    const { data: myOrders, isLoading, refetch } = useQuery('myOrders', () => (
        fetch(`http://localhost:5000/myOrders/${user.email}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
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
        <div className="overflow-x-auto p-4 lg:p-12">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Tool Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Cancel Order</th>
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
                                    {order?.status?.length === 4 ? <p className='text-[orange]'>{order.status}</p>
                                        : order?.status?.length === 7 ? <p className='text-[green]'>{order.status}</p>
                                            : <p className='text-[red]'>{order.status}</p>}
                                </td>
                                {
                                    order.paid ?
                                        <td><p className='text-[green]'>Paid</p></td>
                                        :
                                        <>
                                            <td><button onClick={() => navigate(`/payment/${order._id}`)} className='btn btn-dark font-bold'>Pay</button></td>
                                            <td><button onClick={() => cancelOrder(order._id)} className='btn btn-dark font-bold'>Cancel Order</button></td>
                                        </>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;