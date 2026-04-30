import { Delete, DeleteIcon, Minus, MountainIcon, Plus, Trash2, Trash2Icon, TrashIcon } from 'lucide-react'
import React, { useState } from 'react'
import Breadcrumb from '../../components/global/Breadcrumb'
import { useGetCartQuery, useRemoveCartItemMutation, useUpdateCartItemMutation } from '../../API/Order/orderApi';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const { data, isLoading } = useGetCartQuery();
    const [removeItem] = useRemoveCartItemMutation();
    const [updateItem] = useUpdateCartItemMutation();
    const nav = useNavigate();

    const items = data?.data?.items || [];

    const subtotal = items.reduce((sum, item) => {
        return sum + (item.product?.price ?? 0) * item.quantity;
    }, 0);

    const handleQuantityChange = async (productId, currentQty, change) => {
        const newQty = currentQty + change;
        console.log("productId:", productId, "newQty:", newQty);
        if (newQty < 1) return;
        const result = await updateItem({ productId, quantity: newQty });
        console.log("result:", result);
    };

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
                            {isLoading ? (
                                // skeleton rows
                                [1, 2, 3].map((i) => (
                                    <tr key={i}>
                                        <td colSpan={6} className='py-4'>
                                            <div className='h-16 bg-gray-100 animate-pulse rounded-lg' />
                                        </td>
                                    </tr>
                                ))
                            ) : items.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className='py-10 text-center text-gray-400 normal-case'>
                                        Your cart is empty.{' '}
                                        <span
                                            onClick={() => nav('/shop')}
                                            className='underline cursor-pointer text-amber-500'
                                        >
                                            Continue shopping
                                        </span>
                                    </td>
                                </tr>
                            ) : (
                                items.map((item) => (
                                    <tr key={item._id}>
                                        <td className='py-4'>
                                            <img
                                                className='size-15 object-cover rounded-lg'
                                                src={item.product?.images?.[0]}
                                                alt=""
                                            />
                                        </td>
                                        <td>{item.product?.productName}</td>
                                        <td>Rs. {item.product?.price?.toLocaleString()}</td>
                                        <td>
                                            {/* Quantity controls */}
                                            <div className='flex items-center gap-2 border border-gray-200 rounded-xl w-fit px-2 py-1'>
                                                <button
                                                    onClick={() => handleQuantityChange(item.product?._id, item.quantity, -1)}
                                                    className='cursor-pointer hover:text-amber-500'
                                                >
                                                    <Minus size={13} />
                                                </button>
                                                <span className='text-gray-700 w-5 text-center normal-case'>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.product?._id, item.quantity, 1)}
                                                    className='cursor-pointer hover:text-amber-500'
                                                >
                                                    <Plus size={13} />
                                                </button>
                                            </div>
                                        </td>
                                        <td>Rs. {(item.product?.price * item.quantity).toLocaleString()}</td>
                                        <td className='justify-self-start'>
                                            <TrashIcon
                                                className='text-orange-300 cursor-pointer hover:text-red-400'
                                                size={18}
                                                onClick={() => {
                                                    setSelectedItem(item);
                                                    setShowConfirm(true);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
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
                            <div className='text-gray-400'>Rs. {subtotal.toLocaleString()}</div>
                        </div>
                        <div className='flex justify-evenly'>
                            <div>Total</div>
                            <div className='text-orange-300'>Rs. {subtotal.toLocaleString()}</div>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <button onClick={() => nav('/checkout')} className='px-10 py-3 border-1 rounded-2xl'>
                            Check Out
                        </button>
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

            {showConfirm && selectedItem && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[350px]">
                        <h2 className="text-lg font-semibold mb-2">Remove Item</h2>

                        <p className="text-sm text-gray-500 mb-4">
                            Remove <span className="font-semibold">
                                {selectedItem.product?.productName}
                            </span> from cart?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowConfirm(false);
                                    setSelectedItem(null);
                                }}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={async () => {
                                    await removeItem(selectedItem.product?._id);
                                    setShowConfirm(false);
                                    setSelectedItem(null);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
