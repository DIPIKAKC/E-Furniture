import React from 'react'
import Login from '../../components/auth/Login'
import Signup from '../../components/auth/Signup'
import { MountainIcon } from 'lucide-react'
import Breadcrumb from '../../components/global/Breadcrumb'

export default function Authentication() {
    return (
        <div>
            <div className='relative'>
                {/* absolute inset-0 makes overlay of fill the image */}
                <div className="absolute inset-0 flex flex-col space-y-3 items-center justify-center z-10">
                    <MountainIcon size={40} className='text-gray-400' />
                    <h1 className='font-bold text-2xl text-gray-400'>Shop</h1>
                    <h2>
                        <Breadcrumb />
                    </h2>
                </div>
                <img className='w-full h-50 object-cover ' src='https://images.pexels.com/photos/5379709/pexels-photo-5379709.jpeg' />
            </div>


            <div className='flex gap-50 justify-center py-10 px-20'>
                <Login />
                <Signup />
            </div>

            <div className='w-full bg-red-200 p-20 flex justify-between'>
                <div>
                    <h1 className='font-bold text-2xl'>Free Delivery</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, nostrum </p>
                </div>
                <div>
                    <h1 className='font-bold text-2xl'>90 Days Return</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, nostrum </p>
                </div>
                <div>
                    <h1 className='font-bold text-2xl'>Secure Payment</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, nostrum </p>
                </div>
            </div>
        </div>
    )
}
