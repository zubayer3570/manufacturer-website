import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../../Shared/Loading/Loading';

const AllUser = () => {
    const { data: allUsers, isLoading, refetch } = useQuery('allUsers', async () => (
        fetch('https://manufacturer-website.herokuapp.com/allUsers')
            .then(res => res.json())
    ))
    if (isLoading) {
        return <Loading message='All users loading' />
    }
    const makeAdmin = (email) => {
        fetch('https://manufacturer-website.herokuapp.com/makeAdmin', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
            .then(res => refetch())
    }
    return (
        <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>email</th>
                        <th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers?.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.admin ?
                                            <p className='text-[red]'>admin</p>
                                            :
                                            <button onClick={() => makeAdmin(user.email)} className='btn btn-dark'>Make Admin</button>
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

export default AllUser;