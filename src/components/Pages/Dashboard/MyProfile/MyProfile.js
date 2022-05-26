import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../../firebase.init';
import Loading from '../../../Shared/Loading/Loading';

const MyProfile = () => {
    const [modalShow, setModalShow] = useState(false)
    const [user, userLoading] = useAuthState(auth)
    const { data: userData, isLoading, refetch } = useQuery('userProfile', () => (
        fetch(`https://manufacturer-website.herokuapp.com/userData/${user.email}`, {
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
    const updateProfile = (e) => {
        e.preventDefault()
        const userCredential = {
            email: user.email,
            name: e.target.name.value || userData.name,
            phone: e.target.phone.value || userData?.phone,
            address: e.target.address.value || userData?.address,
            education: e.target.education.value || userData?.education
        }
        fetch(`https://manufacturer-website.herokuapp.com/updateProfile`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ userCredential })
        })
            .then(res => {
                setModalShow(false)
                refetch()
            })

    }
    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={userData.photoURL} className="rounded-lg shadow-2xl w-[300px] px-8" alt='' />
                    <div>
                        <h1 className="text-xl font-bold">Name: {userData.name}</h1>
                        <br />
                        <h1 className="text-xl font-bold">Email: {userData.email}</h1>
                        <br />
                        <h1 className="text-xl font-bold">Phone: {userData?.phone}</h1>
                        <br />

                        {
                            userData?.education ?
                                <>
                                    <h1 className="text-xl font-bold">Education: {userData?.education}</h1>
                                    <br />
                                </>
                                :
                                ''
                        }
                        {
                            userData?.address ?
                                <>
                                    <h1 className="text-xl font-bold">Addres: {userData?.address}</h1>
                                    <br />
                                </>
                                :
                                ''
                        }
                        <label for="update-profile-modal" onClick={() => { setModalShow(true) }} className="btn modal-button">Edit Profile</label>
                    </div>
                </div>
            </div>

            {
                modalShow ?
                    <>
                        <input type="checkbox" id="update-profile-modal" className="modal-toggle" />
                        <div className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box relative">
                                <label for="update-profile-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <form onSubmit={updateProfile}>
                                    <input type="text" name='name' placeholder="Update Your Name" className="my-2 input input-bordered w-full max-w-xs" />
                                    <input type="text" name='phone' placeholder="Enter Phone" className="my-2 input input-bordered w-full max-w-xs" />
                                    <input type="text" name='address' placeholder="Enter address" className="my-2 input input-bordered w-full max-w-xs" />
                                    <input type="text" name='education' placeholder="Enter Your Education" className="my-2 input input-bordered w-full max-w-xs" />
                                    <div className="modal-action">
                                        <input for="update-profile-modal" type="submit" value='Update Profile' className='btn btn-dark' ></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                    :
                    ''
            }
        </>
    );
};

export default MyProfile;