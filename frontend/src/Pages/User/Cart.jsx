import { Delete, DeleteIcon, Minus, MountainIcon, Plus, Trash2, Trash2Icon, TrashIcon } from 'lucide-react'
import React from 'react'
import Breadcrumb from '../../components/global/Breadcrumb'

export default function Cart() {
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
                <img className='w-full h-70 object-cover ' src='https://images.pexels.com/photos/5379709/pexels-photo-5379709.jpeg' />
            </div>

            <div className='flex justify-between gap-10 px-20 py-10'>
                <div className='w-full'>
                    <table className='w-full text-left text-sm font-light text-gray-400 uppercase'>
                        <thead className='bg-orange-100'>
                            <tr>
                                <th></th>
                                <th className='py-2'>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='py-4'>
                                    <img className='size-15 object-cover rounded-lg' src="https://marketplacetemp0hack3.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F812af8yu%2Fproduction%2Fccb5458804bfb0eb4d3e074804e8ef889e96c024-1776x1176.jpg&w=750&q=75" alt="" />
                                </td>
                                <td>Asgaard Sofa</td>
                                <td>250,000</td>
                                <td>1</td>
                                <td>Rs. 250,000.00</td>
                                <td className='justify-self-start'>
                                    <TrashIcon className='text-orange-300' size={20} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='flex flex-col gap-10 bg-orange-100 w-120 py-5'>
                    <div className='flex justify-center'>
                        <h3 className='text-xl font-semibold'>Cart Totals</h3>
                    </div>

                    <div className='flex flex-col space-y-3'>
                        <div className='flex justify-evenly'>
                            <div>SubTotal</div>
                            <div className='text-gray-400'>Rs. 250,000.00</div>
                        </div>
                        <div className='flex justify-evenly'>
                            <div>Total</div>
                            <div className='text-orange-300'>Rs. 250,000.00</div>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <button className='px-10 py-3 border-1 rounded-2xl'>Check Out</button>
                    </div>
                </div>
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
