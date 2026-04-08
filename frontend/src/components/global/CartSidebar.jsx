import { ClosedCaptionIcon, CrossIcon, SidebarCloseIcon, X } from 'lucide-react'
import React from 'react'

export default function CartSidebar() {
    return (
        <div className='absolute inset-0 bg-white space-y-5 shadow-2xl h-fit w-90 py-5 justify-self-end'>

            <div className='px-10 space-y-5'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold'>Shopping Cart</h1>
                    <SidebarCloseIcon className='text-gray-400' size={20} />
                </div>

                <hr className='text-gray-400' />

                <div className='flex items-center justify-between bg-white shadow shadow-xl rounded-2xl p-2'>
                    <img className='size-15 object-cover rounded-2xl' src="https://marketplacetemp0hack3.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F812af8yu%2Fproduction%2Fccb5458804bfb0eb4d3e074804e8ef889e96c024-1776x1176.jpg&w=750&q=75" alt="" />
                    <div className='flex items-center gap-10'>
                        <div>
                            <h3>Asgaard Sofa</h3>
                            <div> 1 X Rs. 250,000.00</div>
                        </div>
                        <X className='bg-gray-400 rounded-full text-white p-1' size={20} />
                    </div>
                </div>

                <div className='flex items-center justify-between'>
                    <div className='text-md'>Subtotal</div>
                    <div className='text-orange-300 font-semibold text-lg'>Rs. 250,000.00</div>
                </div>
            </div>

            <hr className='text-gray-400' />

            <div className='flex items-center justify-around px-10'>
                <button className='px-5 py-1 border-1 rounded-2xl text-sm'>View Cart</button>
                <button className='px-5 py-1 border-1 rounded-2xl text-sm'>Checkout</button>
            </div>
        </div>
    )
}
