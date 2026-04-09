import { MountainIcon } from 'lucide-react'
import React from 'react'

export default function Authentication() {
    return (
        <div>
            <div className='relative'>
                {/* absolute inset-0 makes overlay of fill the image */}
                <div className="absolute inset-0 flex flex-col space-y-3 items-center justify-center z-10">
                    <MountainIcon size={40} className='text-gray-400' />
                    <h1 className='font-bold text-2xl text-gray-400'>Shop</h1>
                    <h2>
                        breadcrumbs home--My account
                    </h2>
                </div>
                <img className='w-full h-70 object-cover ' src='https://images.pexels.com/photos/5379709/pexels-photo-5379709.jpeg' />
            </div>

            <div>
                <div>
                    <h3>Login</h3>
                    div
                    <form action="">
                        <label htmlFor="">Username or email address</label>
                        <input
                        id='username'
                        name='username'
                        type='email'>
                        </input>
                        <label htmlFor="">Password</label>
                    </form>
                </div>
            </div>

        </div>
    )
}
