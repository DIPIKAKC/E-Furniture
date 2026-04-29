import { HeartIcon, SearchIcon, ShoppingCartIcon, User2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import Search from '../../Pages/User/Search';
import DropdownProfile from './DropdownProfile';

export default function Header() {
    const { user } = useSelector((state) => state.userSlice ?? {}); //userslice ko matra initial state taneko
    const nav = useNavigate();
    const [query, setQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const handleUserClick = (e) => {
        e.preventDefault();
        if (user) {
            nav('/account');
        } else {
            nav('/authentication');
        }
    };

    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim()) {
            nav(`/search?q=${query}`);
            setQuery("");
            setSearchOpen(false);
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

                <div className="relative">
                    <User2Icon
                        size={20}
                        className="cursor-pointer"
                        onClick={() => {
                            if (!user) {
                                nav('/authentication'); 
                            } else {
                                setProfileOpen(prev => !prev); 
                            }
                        }}
                    />

                    {user && profileOpen && (
                        <DropdownProfile
                            user={user}
                            close={() => setProfileOpen(false)}
                        />
                    )}
                </div>

                <div className="relative flex items-center">

                    {/* Search Icon */}
                    <SearchIcon
                        size={20}
                        className="cursor-pointer"
                        onClick={() => setSearchOpen((prev) => !prev)}
                    />

                    {/* Input appears when searchOpen is true */}
                    {searchOpen && (
                        <input
                            type="text"
                            placeholder="search for products"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="absolute top-8 right-0 px-3 py-1 shadow w-48 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 cursor-pointer min-w-fit focus:outline-none focus:ring-1 focus:ring-amber-300"
                            autoFocus
                        />
                    )}
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
