import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../../firebase.init';
import useCheckAdmin from '../../Hooks/useCheckAdmin';
import Loading from '../../Shared/Loading/Loading';

const Dashboard = () => {
    const [user, userLoading] = useAuthState(auth)
    const [userState] = useCheckAdmin(user?.email)
    if (userLoading) {
        return <Loading message='User is Loading' />
    }
    return (
        <div className="drawer drawer-mobile font-bold">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label for="my-drawer-2" className="btn btn-primary drawer-button ml-4 lg:hidden">Dashboard Menu</label>
                <Outlet />
            </div>
            <div className="drawer-side">
                <label for="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    <li><Link to='/dashboard' className='shadow'>My Profile</Link></li>
                    {
                        userState ?
                            <>
                                <li><Link to='allUsers' className='shadow'>All User</Link></li>
                                <li><Link to='allOrders' className='shadow'>Manage All Orders</Link></li>
                                <li><Link to='addTools' className='shadow'>Add a Tool</Link></li>
                                <li><Link to='manageProducts' className='shadow'>Manage Products</Link></li>
                            </>
                            :
                            <li><Link to='myOrders' className='shadow'>My Orders</Link></li>
                    }
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;