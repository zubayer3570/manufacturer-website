import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import BusinessSummary from './BusinessSummary/BusinessSummary';
import History from './History/History';
import Reviews from './Reviews/Reviews';
import Tool from './Tool/Tool';
import TopProducts from './TopProducts/TopProducts';

const Home = () => {
    const { data: tools, isLoading } = useQuery('toolsData', () => (
        fetch('https://manufacturer-website.herokuapp.com/tools', {
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
            <BusinessSummary />
            <h1 className='text-2xl font-bold text-center mt-8'>Tools</h1>
            < div className='grid grid-cols-1 lg:grid-cols-2 p-8' >
                {
                    tools?.map(tool => <Tool key={tool._id} tool={tool} />)
                }
            </div >
            <TopProducts />
            <History />
            <Reviews />
        </>
    );
};

export default Home;