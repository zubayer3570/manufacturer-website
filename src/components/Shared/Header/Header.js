import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { signOut } from 'firebase/auth';
import useCheckAdmin from '../../Hooks/useCheckAdmin';

const Header = () => {
    const [user, userLoading] = useAuthState(auth)
    const [userState] = useCheckAdmin(user?.email)
    return (
        <div className="navbar justify-between">
            <div>
                <Link to='/' className="btn btn-ghost normal-case text-xl"><img src='https://i.ibb.co/92wN4DF/icon.png' alt="" className='w-8' />Electra</Link>
            </div>
            <div className="dropdown dropdown-end">
                <label tabIndex="0" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    {
                        user ?
                            <>
                                <li>{user.displayName}</li>
                                <li><Link to='/'>Home</Link></li>
                                {
                                    userState ?
                                        <li><Link to='/addTools'>Add tools</Link></li>
                                        :
                                        <li><Link to='/myOrders'>My orders</Link></li>
                                }
                                <li><Link to='/portfolio'>My Portfolio</Link></li>
                                <li><Link to='/blogs'>Blogs</Link></li>
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                                <li><Link to='' onClick={() => { signOut(auth) }} >Logout</Link></li>
                            </>
                            :
                            <>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/portfolio'>My Portfolio</Link></li>
                                <li><Link to='/blogs'>Blogs</Link></li>
                                <li><Link to='/login' >Login</Link></li>
                            </>
                    }
                </ul>

            </div>
            <div className="hidden lg:flex">
                <ul className="menu menu-horizontal p-0 font-bold">
                    {
                        user ?
                            <>
                                <li><Link to='/'>{user.displayName}</Link></li>
                                <li><Link to='/'>Home</Link></li>
                                {
                                    userState ?
                                        <li><Link to='/addTools'>Add tools</Link></li>
                                        :
                                        <li><Link to='/myOrders'>My orders</Link></li>
                                }
                                <li><Link to='portfolio'>My Portfolio</Link></li>
                                <li><Link to='Blogs'>Blogs</Link></li>
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                                <li><Link to='' onClick={() => { signOut(auth) }} >Logout</Link></li>
                                <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL} alt='' />
                                    </div>
                                </label>
                            </>
                            :
                            <>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='portfolio'>My Portfolio</Link></li>
                                <li><Link to='Blogs'>Blogs</Link></li>
                                <li><Link to='/login' >Login</Link></li>
                            </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Header;