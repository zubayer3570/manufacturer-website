import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import Tool from './Tool/Tool';

const Home = () => {
    const { data: tools, isLoading } = useQuery('toolsData', () => (
        fetch('http://localhost:5000/tools', {
            method: 'GET',
            headers: {
                'content-type': 'application.json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    ))
    if (isLoading) {
        return <Loading message='Tools loading' />
    }

    return (
        <>
            <div>
                <img src="https://i.ibb.co/r7BLTQm/pexels-cottonbro-4488641-1.jpg" alt="" />
            </div>
            <h1 className='text-2xl font-bold text-center mt-8'>Tools</h1>
            < div className='grid grid-cols-1 lg:grid-cols-4 p-8' >
                {
                    tools?.map(tool => <Tool key={tool._id} tool={tool} />)
                }
            </div >
        </>
    );
};

export default Home;