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
        <div class="drawer drawer-mobile font-bold">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                <label for="my-drawer-2" class="btn btn-primary drawer-button ml-4 lg:hidden">Dashboard Menu</label>
                <Outlet />
            </div>
            <div class="drawer-side">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    <li><Link to=''>My Profile</Link></li>
                    {
                        userState ?
                            <>
                                <li><Link to='allUsers'>All User</Link></li>
                                <li><Link to='allOrders'>Manage All Orders</Link></li>
                                <li><Link to='addTools'>Add a Tool</Link></li>
                            </>
                            :
                            <li><Link to='myOrders'>My Orders</Link></li>
                    }
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;