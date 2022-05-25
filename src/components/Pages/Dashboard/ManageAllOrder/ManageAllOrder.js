import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../../Shared/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';

const ManageAllOrder = () => {
    const [pending, setPending] = useState(true)
    const { data: allOrders, isLoading, refetch } = useQuery('orders', () => (
        fetch('http://localhost:5000/allOrders')
            .then(res => res.json())
    ))
    if (isLoading) {
        return <Loading message='All users loading' />
    }
    const cancelOrder = (id) => {
        fetch('http://localhost:5000/cancelOrder', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ orderId: id })
        })
            .then(res => {
                refetch()
                toast()
            })
    }
    const ship = (id) => {
        fetch(`http://localhost:5000/ship/${id}`)
            .then(res => refetch())
    }
    return (
        <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>User Name</th>
                        <th>email</th>
                        <th>Tool Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allOrders?.map((order, index) => (
                            <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td>{order.userName}</td>
                                <td>{order.email}</td>
                                <td>{order.toolName}</td>
                                <td>{order.price}</td>
                                <td>{order.quantity}</td>
                                <td>
                                    {
                                        order.paid ?
                                            order?.shipped ? <p className='font-bold text-[green]'>Shipped</p> : <button onClick={() => ship(order._id)} className='btn bg-green font-bold'>Ship?</button>
                                            :
                                            <button onClick={() => cancelOrder(order._id)} className='btn btn-dark font-bold'>Cancel Order</button>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <ToastContainer />
        </div >
    );
};

export default ManageAllOrder;