import React from 'react'
import ProductCard from '../../components/global/ProductCard'
import BlogCard from '../../components/global/BlogCard'
import { useNavigate } from 'react-router-dom'
import { useGetNewArrivalQuery, useGetRecentProductsQuery, useGetTopProductsQuery } from '../../API/Product/productApi';

export default function Home() {
    const nav = useNavigate();

    const { data: topProducts } = useGetTopProductsQuery();
    const { data: recentProducts } = useGetRecentProductsQuery();
    const { data: newArrival } = useGetNewArrivalQuery();
    const newProduct = newArrival?.products;
    console.log("newProduct", newProduct)
    return (
        <div>

            <div className='w-full h-screen bg-yellow-200 flex items-center justify-end gap-60'>
                <div className='flex flex-col gap-3 ml-20'>
                    <h1 className='text-6xl font-semibold'>Rocket Single <br /> Chair</h1>
                    <h2 onClick={() => nav(`products/69bc51a6defc171aa6822c16`)} className='text-2xl underline'>Shop now</h2>
                </div>
                <img className='h-200' src="https://next-js-template-0.vercel.app/_next/image?url=/Rocket%20single%20seater%201.png&w=1920&q=75" alt="" />
            </div>

            <div className='grid grid-cols-2'>
                {recentProducts?.products?.map((p) => {
                    return <div key={p._id} onClick={() => nav(`/products/${p._id}`)} className="relative group">

                        {/* Image */}
                        <img
                            className="h-[420px] w-full object-cover"
                            src={p.images?.[0]}
                            alt=""
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/30"></div>

                        {/* Text */}
                        <div className="absolute bottom-10 left-10 text-white cursor-pointer">
                            <h2 className="font-semibold text-3xl">{p.productName}</h2>
                            <button className="underline text-md">View more</button>
                        </div>

                    </div>
                    // return <div key={p._id} className='relative'>
                    //     <img className='h-130 object-cover ' src={p.images?.[0]} alt="" />
                    //     <div onClick={() => nav(`products/${p._id}`)} className='absolute lg:bottom-30 left-30 cursor-pointer'>
                    //         <h2 className='font-semibold text-3xl'>{p.productName}</h2>
                    //         <button className='underline text-md'>View more</button>
                    //     </div>
                    // </div>
                })}
            </div>

            <div className='flex flex-col gap-15 bg-pink-50 py-10'>
                <div className='flex flex-col gap-2 bg-pink-50 items-center'>
                    <h2 className='font-semibold text-4xl'>Top picks for you</h2>
                    <p className='text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis expedita officia consectetur laudantium impedit perferendis!</p>
                </div>
                {/* top5 */}
                <div className='grid grid-cols-4 px-20'>
                    {topProducts?.products?.map((p) => {
                        return <ProductCard key={p._id} product={p} />
                    })}
                </div>

                <button onClick={() => nav('/shop')} className='justify-center-safe underline underline-offset-5 cursor-pointer'>View More</button>

            </div>

            <div className=' bg-yellow-200 flex items-center justify-evenly'>
                <img className='h-100' src={newProduct?.images?.[0]} alt="" />
                <div className='flex flex-col gap-8'>
                    <h2 className='font-semibold text-2xl flex justify-center'>New Arrivals</h2>
                    <h1 className='text-6xl font-semibold'>{newProduct?.productName}</h1>
                    <button  onClick={()=>nav(`/products/${newProduct._id}`)} className='py-4 border-3 text-xl cursor-pointer'>Order Now</button>
                </div>
            </div>

            <div className='flex flex-col gap-15 bg-pink-50 py-10'>
                <div className='flex flex-col gap-2 bg-pink-50 items-center'>
                    <h2 className='font-semibold text-4xl'>Our Blogs</h2>
                    <p className='text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis expedita officia consectetur laudantium impedit perferendis!</p>
                </div>
                <div className='px-20'>
                    <div className='flex justify-evenly'>
                        <BlogCard image={"https://images.pexels.com/photos/9708530/pexels-photo-9708530.jpeg"} />
                        <BlogCard image={"https://images.pexels.com/photos/36718705/pexels-photo-36718705.jpeg"} />
                        <BlogCard image={"https://images.pexels.com/photos/2962140/pexels-photo-2962140.jpeg"} />
                    </div>
                </div>
                <button className='self-center underline underline-offset-5'>View All Post</button>
            </div>

            <div className='relative'>
                <img className='w-full h-80 object-cover' src="https://static.xx.fbcdn.net/rsrc.php/v1/yF/r/Yyybh56EZyT.jpg" alt="" />
                <div className='absolute inset-0 flex flex-col gap-5 items-center justify-center text-white'>
                    <h2 className='font-semibold text-4xl'>Our Instagram</h2>
                    <p className=''>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis expedita officia consectetur laudantium impedit perferendis!</p>
                    <button className='px-8 py-2 border-2 rounded-3xl'>Follow Us</button>
                </div>
            </div>



        </div>
    )
}
