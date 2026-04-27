import { ClosedCaptionIcon, CrossIcon, ShoppingCartIcon, SidebarCloseIcon, X } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetCartQuery, useRemoveCartItemMutation } from '../../API/Order/orderApi';
import { closeCart } from '../../API/Slice/cartSlice';

export default function CartSidebar() {

    const isOpen = useSelector((state) => state.cartSlice.isOpen);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const { data, isLoading } = useGetCartQuery();
    const items = data?.data?.items || [];

    const [removeItem] = useRemoveCartItemMutation();


    const subtotal = items.reduce((sum, item) => {
        return sum + (item.product?.price ?? 0) * item.quantity;
    }, 0);

    return (
        <>
            {isOpen && (
                <div
                    className='fixed inset-0 bg-black/30 z-40'
                    onClick={() => dispatch(closeCart())}
                />
            )}

            {/* <div className='absolute inset-0 bg-white space-y-5 shadow-2xl h-fit w-90 py-5 justify-self-end'> */}
            <div className={`fixed top-0 right-0 space-y-5 shadow-2xl h-fit w-90 py-5 bg-white z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className='px-10 space-y-5'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl font-semibold'>Shopping Cart</h1>
                        <SidebarCloseIcon onClick={() => dispatch(closeCart())} className='text-gray-400' size={20} />
                    </div>

                    <hr className='text-gray-400' />

                    <div className='flex flex-col gap-4 flex-1 overflow-y-auto'>
                        {isLoading ? (
                            //skeleton loader
                            <div className='flex flex-col gap-3'>
                                {[1, 2].map((i) => ( //1,2, is just counts
                                    <div key={i} className='h-20 bg-gray-100 animate-pulse rounded-2xl' />
                                ))}
                            </div>
                        ) : items.length === 0 ? (
                            <div className='flex flex-col items-center justify-center h-full gap-3 text-gray-400'>
                                <ShoppingCartIcon size={40} />
                                <p className='text-sm'>Your cart is empty</p>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div
                                    key={item._id}
                                    className='flex items-center justify-between bg-white shadow-md rounded-2xl p-3'
                                >
                                    <img
                                        className='size-16 object-cover rounded-xl'
                                        src={item.product?.images?.[0] ?? item.product?.image}
                                        alt={item.product?.productName}
                                    />
                                    <div className='flex items-center gap-10'>
                                        <div>
                                            <h3 className='text-sm font-medium'>
                                                {item.product?.productName}
                                            </h3>
                                            <div className='text-sm text-gray-500'>
                                                {item.quantity} x Rs.{' '}
                                                {item.product?.price?.toLocaleString()}
                                            </div>
                                        </div>
                                        <X
                                            className='bg-gray-400 rounded-full text-white p-1 cursor-pointer hover:bg-red-400 transition-colors'
                                            size={20}
                                            onClick={() => removeItem(item.product?._id)}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {/* <div className='flex items-center justify-between bg-white shadow shadow-xl rounded-2xl p-2'>
                        <img className='size-15 object-cover rounded-2xl' src="https://marketplacetemp0hack3.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F812af8yu%2Fproduction%2Fccb5458804bfb0eb4d3e074804e8ef889e96c024-1776x1176.jpg&w=750&q=75" alt="" />
                        <div className='flex items-center gap-10'>
                            <div>
                                <h3>Asgaard Sofa</h3>
                                <div> 1 X Rs. 250,000.00</div>
                            </div>
                            <X className='bg-gray-400 rounded-full text-white p-1' size={20} />
                        </div>
                    </div> */}

                    <div className='flex items-center justify-between'>
                        <div className='text-md'>Subtotal</div>
                        <div className='text-orange-300 font-semibold text-lg'>Rs. {subtotal.toLocaleString()}</div>
                    </div>
                </div>

                <hr className='text-gray-400' />

                <div className='flex items-center justify-around px-10'>
                    <button onClick={() => { nav('/cart'); dispatch(closeCart()); }} className='px-5 py-1 border-1 rounded-2xl text-sm'>View Cart</button>
                    <button onClick={() => { nav('/checkout'); dispatch(closeCart()); }} className='px-5 py-1 border-1 rounded-2xl text-sm'>Checkout</button>
                </div>
            </div>
        </>
    )
}
