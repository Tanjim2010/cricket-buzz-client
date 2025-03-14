import React, { useContext } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { authContext } from '../../../Provider/AuthProvider';
import { NavLink } from 'react-router-dom';
import useUserData from '../../Hooks/useUserData';

const Navbar = () => {
    const { user, logout } = useContext(authContext);
    const [users] = useUserData()
    return (
        <div className='md:w-4/5 mx-auto '>
            <div className="flex justify-between items-center py-7">
                <div className="flex">

                    <a href='/' className="cursor-pointer"><img src="https://i.ibb.co.com/rGfshmKB/logo.png" className='w-10 h-10' alt="" /></a>
                </div>
                <div className="flex-none">
                    {user ?

                        <div className='flex justify-center items-center gap-4'>
                            <button className='font-bold flex items-center justify-center gap-1 btn '><img src="https://i.ibb.co.com/5hfnR3bb/dollar-1.png" alt="" /> {users.coin}</button>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="w-10 rounded-full  cursor-pointer h-10 bg-[#DEF428]  flex items-center justify-center">
                                    <FaRegCircleUser className='w-5 h-5 text-white' />
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><button onClick={logout}>Logout</button></li>
                                </ul>
                            </div>
                        </div>
                        :
                        <NavLink to={'/login'}>Login</NavLink>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;