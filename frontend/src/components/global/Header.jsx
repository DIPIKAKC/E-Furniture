import { HeartIcon, SearchIcon, ShoppingCartIcon, User2Icon } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <header className='w-full h-fit py-4 px-20 flex justify-end items-center space-x-100'>
            <div className='items-center space-x-10'>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/shop'}>Shop</NavLink>
                <NavLink>About</NavLink>
                <NavLink to={'/contactus'}>Contact</NavLink>
            </div>
            <div className='flex items-center space-x-6'>
                <NavLink>
                    <User2Icon size={20} />
                </NavLink>
                <div>
                    <SearchIcon size={20} />
                </div>
                <NavLink>
                    <HeartIcon size={20} />
                </NavLink>
                <NavLink>
                    <ShoppingCartIcon size={20} />
                </NavLink>
            </div>
        </header>
    )
}
