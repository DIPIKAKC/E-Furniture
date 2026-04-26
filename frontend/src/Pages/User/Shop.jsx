import { DotSquareIcon, FilterIcon, FilterXIcon, HandFistIcon, MountainIcon, ScreenShareIcon } from 'lucide-react'
import React from 'react'
import ProductCard from '../../components/global/ProductCard'
import { useGetAllProductsQuery } from '../../API/Product/productApi';

export default function Shop() {
    const { data } = useGetAllProductsQuery();
    console.log("all products:", data)
    return (
        <div>
            <div className='relative'>
                {/* absolute inset-0 makes overlay of fill the image */}
                <div className="absolute inset-0 flex flex-col space-y-3 items-center justify-center z-10">
                    <MountainIcon size={40} className='text-gray-400' />
                    <h1 className='font-bold text-2xl text-gray-400'>Shop</h1>
                    <h2>
                        breadcrumbs home--shop
                    </h2>
                </div>
                <img className='w-full h-70 object-cover ' src='https://images.pexels.com/photos/5379709/pexels-photo-5379709.jpeg' />
            </div>


            <div className='py-10'>
                <div className='w-full bg-amber-100 px-20 py-5 flex items-center justify-between'>
                    <div className='flex items-center gap-5'>
                        <div className='flex items-center gap-8'>
                            <div className='flex items-center space-x-2'>
                                <FilterIcon size={18} />
                                <p>filter</p>
                            </div>
                            <div><DotSquareIcon size={18} /></div>
                            <div><ScreenShareIcon size={18} /></div>
                        </div>
                        <div className='w-px h-6 bg-black'></div>
                        <div>Showing 1-32 of 100 results</div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-2'>
                            <p>show</p>
                            <div className='py-1 px-2 bg-gray-200'>00</div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <p>sort by</p>
                            <div className='py-1 px-4 bg-gray-200'>default</div>
                        </div>
                    </div>
                </div>

                <div className="py-10 px-20 grid grid-cols-4 gap-8">
                    {data?.products?.map((p) => (
                        <ProductCard key={p._id} product={p} />
                    ))}
                </div>

                <div className='flex items-center space-x-5 justify-center-safe'>
                    <div className='px-5 py-3 bg-amber-200 rounded-md'>1</div>
                    <div className='px-5 py-3 bg-amber-200 rounded-md'>2</div>
                    <div className='px-5 py-3 bg-amber-200 rounded-md'>3</div>
                    <div className='px-5 py-3 bg-amber-200 rounded-md'>Next</div>
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


            {/* <div>
                footer
            </div> */}
        </div>
    )
}
