import { ChevronDownIcon, DotSquareIcon, FilterIcon, FilterXIcon, HandFistIcon, MountainIcon, ScreenShareIcon } from 'lucide-react'
import React, { useState } from 'react'
import ProductCard from '../../components/global/ProductCard'
import { useGetAllCategoriesQuery, useGetAllProductsQuery } from '../../API/Product/productApi';
import Breadcrumb from '../../components/global/Breadcrumb';

export default function Shop() {
    const [filters, setFilters] = useState({
        category: "",
    });
    const { data: productData, isLoading } =
        useGetAllProductsQuery(filters);

    const { data: categoryData } =
        useGetAllCategoriesQuery();

    const products = productData?.products || [];
    const categories = categoryData?.categories || [];

    return (
        <div>
            <div className='relative'>
                {/* absolute inset-0 makes overlay of fill the image */}
                <div className="absolute inset-0 flex flex-col space-y-3 items-center justify-center z-10">
                    <MountainIcon size={40} className='text-amber-500' />
                    <h1 className='font-bold text-2xl text-amber-500'>Shop</h1>
                    <h2>
                        <Breadcrumb />
                    </h2>
                </div>
                <img className='w-full h-50 object-cover ' src='https://images.pexels.com/photos/5379709/pexels-photo-5379709.jpeg' />
            </div>


            <div className='py-10'>
                <div className='w-full bg-amber-100 px-20 py-5 flex items-center justify-between'>
                    <div className='flex items-center gap-5'>
                        <div className='flex items-center gap-8'>
                            <div className='flex items-center space-x-2'>
                                <FilterIcon size={18} />
                                <p>filter</p>

                                <div className='w-px h-5 bg-gray-300' />

                                <div className='relative flex items-center'>
                                    <select
                                        value={filters.category}
                                        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                                        className='appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm bg-white text-gray-700 cursor-pointer min-w-36 focus:outline-none focus:ring-1 focus:ring-amber-300'
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon size={12} className='absolute right-2.5 pointer-events-none text-gray-400' />
                                </div>
                            </div>

                            <div><DotSquareIcon size={18} /></div>
                            <div><ScreenShareIcon size={18} /></div>
                        </div>
                        <div className='w-px h-5 bg-gray-300'></div>
                        <div>Showing {products.length} of {productData?.total ?? 0} results</div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-2'>
                            <p>show</p>
                            <div className='appearance-none border border-gray-200 rounded-lg pl-3 pr-3 py-1.5 text-sm bg-white text-gray-700 cursor-pointer min-w-fit focus:outline-none focus:ring-1 focus:ring-amber-300'>00</div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <p>sort by</p>
                            <div className='appearance-none border border-gray-200 rounded-lg pl-3 pr-7 py-1.5 text-sm bg-white text-gray-700 cursor-pointer min-w-fit focus:outline-none focus:ring-1 focus:ring-amber-300'>default</div>
                        </div>
                    </div>
                </div>

                <div className="py-10 px-20 grid grid-cols-4 gap-8">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        products.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))
                    )}
                    {/* {data?.products?.map((p) => (
                        <ProductCard key={p._id} product={p} />
                    ))} */}
                </div>

                <div className='flex items-center space-x-5 justify-center-safe'>
                    <div className='px-5 py-3 text-amber-500 bg-gray-100 rounded-md'>1</div>
                    <div className='px-5 py-3 text-amber-500 bg-gray-100 rounded-md'>2</div>
                    <div className='px-5 py-3 text-amber-500 bg-gray-100 rounded-md'>3</div>
                    <div className='px-5 py-3 text-amber-500 bg-gray-100 rounded-md'>Next</div>
                </div>
            </div>


            <div className='w-full bg-red-50 p-20 flex justify-between'>
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
