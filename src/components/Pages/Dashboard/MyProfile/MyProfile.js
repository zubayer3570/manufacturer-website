import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';

const MyProfile = () => {
    const [user, userLoading] = useAuthState(auth)
    const { data: userData, isLoading } = useQuery('userProfile', () => (
        fetch(`http://localhost:5000/userData/${user.email}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    ))
    if (userLoading) {
        return <Loading message='User Loading' />
    }
    if (isLoading) {
        return <Loading message='User is Loading' />
    }
    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row">
                <img src={userData.photoURL} class="max-w-sm rounded-lg shadow-2xl" alt='' />
                <div>
                    <h1 class="text-2xl font-bold">Name: {userData.name}</h1>
                    <br />
                    <h1 class="text-2xl font-bold">Email: {userData.email}</h1>
                    <br />
                    <h1 class="text-2xl font-bold">Phone: {userData?.phone}</h1>
                    <br />
                    <button class="btn btn-primary">Edit Profile</button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;