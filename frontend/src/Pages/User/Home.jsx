import React from 'react'
import ProductCard from '../../components/global/ProductCard'
import BlogCard from '../../components/global/BlogCard'

export default function Home() {
    return (
        <div>
            
            <div className='w-full h-screen bg-yellow-200 flex items-center justify-end gap-60'>
                <div className='flex flex-col gap-3 ml-20'>
                    <h1 className='text-6xl font-semibold'>Rocket Single <br /> Chair</h1>
                    <h2 className='text-2xl underline'>Shop now</h2>
                </div>
                <img className='h-200' src="https://next-js-template-0.vercel.app/_next/image?url=/Rocket%20single%20seater%201.png&w=1920&q=75" alt="" />
            </div>

            <div className='grid grid-cols-2'>
                <div className='relative'>
                    <img className='h-130' src="https://marketplacetemp0hack3.vercel.app/_next/image?url=%2Ftable1.png&w=1080&q=75" alt="" />
                    <div className='absolute lg:bottom-30 left-30'>
                        <h2 className='font-semibold text-3xl'>Side table</h2>
                        <button className='underline text-md'>View more</button>
                    </div>
                </div>
                <div className='relative'>
                    <img className='h-130' src="https://marketplacetemp0hack3.vercel.app/_next/image?url=%2Ftable2.png&w=1080&q=75" alt="" />
                    <div className='absolute lg:bottom-30 left-30'>
                        <h2 className='font-semibold text-3xl'>Side table</h2>
                        <button className='underline text-md'>View more</button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-15 bg-pink-50 py-10'>
                <div className='flex flex-col gap-2 bg-pink-50 items-center'>
                    <h2 className='font-semibold text-4xl'>Top picks for you</h2>
                    <p className='text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis expedita officia consectetur laudantium impedit perferendis!</p>
                </div>
                <div className='grid grid-cols-4 px-20'>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
                <button className='justify-center-safe underline underline-offset-5'>View More</button>

            </div>

            <div className=' bg-yellow-200 flex items-center justify-evenly'>
                <img className='h-100' src="https://marketplacetemp0hack3.vercel.app/_next/image?url=%2Farrival1.png&w=1080&q=75" alt="" />
                <div className='flex flex-col gap-8'>
                    <h2 className='font-semibold text-2xl flex justify-center'>New Arrivals</h2>
                    <h1 className='text-6xl font-semibold'>Asgaard Sofa</h1>
                    <button className='py-4 border-3 text-xl'>Order Now</button>
                </div>
            </div>

            <div className='flex flex-col gap-15 bg-pink-50 py-10'>
                <div className='flex flex-col gap-2 bg-pink-50 items-center'>
                    <h2 className='font-semibold text-4xl'>Our Blogs</h2>
                    <p className='text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis expedita officia consectetur laudantium impedit perferendis!</p>
                </div>
                <div className='px-20'>
                    <div className='flex justify-evenly'>
                        <BlogCard />
                        <BlogCard />
                        <BlogCard />
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
