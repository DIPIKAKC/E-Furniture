import React from 'react'
import { useGetWishlistQuery } from '../../API/Wishlist/wishlistApi';
import ProductCard from '../../components/global/ProductCard';
import { Heart } from 'lucide-react';

export default function Wishlist() {
    const { data, isLoading } = useGetWishlistQuery();

    const products = data?.data || [];
    console.log("wishlist product", products)

    // return (
    //     <div className='px-20 py-10'>
    //         <h2 className='text-3xl font-semibold mb-6'>My Wishlist</h2>
    //         {isLoading && <p>Loading...</p>}
    //         {products.length === 0 && <p className='text-gray-400'>No liked products yet.</p>}
    //         <div className='grid grid-cols-4 gap-6'>
    //             {products.map(p => (
    //                 <ProductCard key={p._id} product={p} />
    //             ))}
    //         </div>
    //     </div>
    // )

    return (
        <div className='px-20 py-12 min-h-screen bg-gray-50'>

            {/* Header */}
            <div className='flex items-center justify-between mb-10'>
                <div className='flex items-center gap-3'>
                    <Heart className='text-pink-500' size={28}/>
                    <h2 className='text-3xl font-semibold'>My Wishlist</h2>
                </div>

                <p className='text-gray-500'>
                    {products.length} {products.length === 1 ? "item" : "items"}
                </p>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className='text-center py-20 text-gray-500'>
                    Loading your wishlist...
                </div>
            )}

            {/* Empty state */}
            {!isLoading && products.length === 0 && (
                <div className='flex flex-col items-center justify-center py-32 text-center'>
                    <Heart size={60} className='text-gray-300 mb-6'/>
                    <h3 className='text-xl font-semibold mb-2'>
                        Your wishlist is empty
                    </h3>
                    <p className='text-gray-500 mb-6'>
                        Save items you love to your wishlist.
                    </p>

                    <button
                        onClick={() => window.location.href = "/shop"}
                        // underline cursor-pointer text-amber-500
                        className='px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition'
                    >
                        Explore Products
                    </button>
                </div>
            )}

            {/* Products */}
            {!isLoading && products.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {products.map((p) => (
                        <ProductCard key={p._id} product={p}/>
                    ))}
                </div>
            )}

        </div>
    )
}
