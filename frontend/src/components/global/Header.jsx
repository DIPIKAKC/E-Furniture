import { HeartIcon, SearchIcon, ShoppingCartIcon, User2Icon } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'

export default function Header() {
    const { user } = useSelector((state) => state.userSlice ?? {}); //userslice ko matra initial state taneko
    const nav = useNavigate();

    const handleUserClick = (e) => {
        e.preventDefault();         
        if (user) {
            nav('/account');
        } else {
            nav('/authentication');
        }
    };

    return (
        <header className='w-full h-fit py-4 px-20 flex justify-end items-center space-x-100 relative z-50'>
            <div className='items-center space-x-10'>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/shop'}>Shop</NavLink>
                <NavLink>About</NavLink>
                <NavLink to={'/contactus'}>Contact</NavLink>
            </div>
            <div className='flex items-center space-x-6'>
                <div onClick={handleUserClick} className='cursor-pointer'>
                    <User2Icon size={20} />
                </div>
                <div className='cursor-pointer'>
                    <SearchIcon size={20} />
                </div>
                <NavLink to={'/wishlist'}>
                    <HeartIcon size={20} />
                </NavLink>
                <NavLink to={'/cart'}>
                    <ShoppingCartIcon size={20} />
                </NavLink>
            </div>
        </header>
    )
}
