import { MinusIcon, PlusIcon, Star, StarHalfIcon } from 'lucide-react'
import React from 'react'

export default function ProductDetail() {
    return (
        <div>
            <div className='bg-amber-100 py-8 px-20'>
                breadcrumbs
            </div>

            {/* product */}
            <div className='grid grid-cols-2 py-6'>
                <div className='flex justify-end gap-6'>
                    <div className='flex flex-col gap-6'>
                        <img className='size-15 object-cover' src="https://marketplacetemp0hack3.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F812af8yu%2Fproduction%2Fccb5458804bfb0eb4d3e074804e8ef889e96c024-1776x1176.jpg&w=750&q=75" alt="" />
                        <img className='size-15 object-cover' src="https://marketplacetemp0hack3.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F812af8yu%2Fproduction%2Fccb5458804bfb0eb4d3e074804e8ef889e96c024-1776x1176.jpg&w=750&q=75" alt="" />
                        <img className='size-15 object-cover' src="https://marketplacetemp0hack3.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F812af8yu%2Fproduction%2Fccb5458804bfb0eb4d3e074804e8ef889e96c024-1776x1176.jpg&w=750&q=75" alt="" />
                        <img className='size-15 object-cover' src="https://marketplacetemp0hack3.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F812af8yu%2Fproduction%2Fccb5458804bfb0eb4d3e074804e8ef889e96c024-1776x1176.jpg&w=750&q=75" alt="" />
                    </div>
                    <div>
                        <img className='w-140 object-cover' src="https://marketplacetemp0hack3.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F812af8yu%2Fproduction%2Fccb5458804bfb0eb4d3e074804e8ef889e96c024-1776x1176.jpg&w=750&q=75" alt="" />
                    </div>
                </div>
                <div className='flex flex-col gap-10 px-20'>
                    <div className='flex flex-col gap-2'>
                        <h2 className="text-4xl font-bold">Asgaard sofa</h2>
                        <h3 className='text-xl font-semibold text-gray-400'>Rs. 250,000.00</h3>
                        <div className='flex items-center gap-1'>
                            <Star size={20} />
                            <Star size={20} />
                            <Star size={20} />
                            <Star size={20} />
                            <StarHalfIcon size={20} />
                        </div>
                        <p className='text-balance'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ex expedita eos vero commodi impedit officiis quod itaque cumque debitis nulla ratione et accusantium, quae iste quis dolore unde? Veniam ratione ipsam consequuntur iusto similique cumque? Iusto, sequi asperiores? Rem quisquam, iste natus unde est cumque suscipit doloremque ducimus ullam.</p>
                        <div className='flex flex-col gap-1'>
                            <h5 className=' text-lg text-gray-400'>Size</h5>
                            <div className='flex items-center gap-2'>
                                <div className='py-1 px-3 border-1 w-fit rounded-lg text-sm'>L</div>
                                <div className='py-1 px-3 border-1 w-fit rounded-lg text-sm'>XL</div>
                                <div className='py-1 px-3 border-1 w-fit rounded-lg text-sm'>XXL</div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h5 className=' text-lg text-gray-400'>Color</h5>
                            <div className='flex items-center gap-2'>
                                <div className='bg-blue-800 size-6 rounded-full'></div>
                                <div className='bg-pink-300 size-6 rounded-full'></div>
                                <div className='bg-gray-600 size-6 rounded-full'></div>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <button className='flex items-center justify-evenly border-2 py-2 w-20 rounded-2xl bg-white'>
                                <div><MinusIcon size={15} /> </div>
                                <div>1</div>
                                <div><PlusIcon size={15} /></div>
                            </button>
                            <button className='px-10 py-2 border-2 rounded-2xl'> Add To Cart</button>
                        </div>
                    </div>

                    <div className='text-gray-400'><hr /></div>

                    <div className='flex flex-col gap-1'>
                        <div className='text-sm text-gray-400'>SKU : SS001</div>
                        <div className='text-sm text-gray-400'>Category : Sofas</div>
                        <div className='text-sm text-gray-400'>Tags : Sofa, Chair, Home, Shop</div>
                        <div className='text-sm text-gray-400'>Share : fb</div>
                    </div>
                </div>
            </div>


            <div className='bg-gray-300 my-4 py-4'>

                <div><hr className='text-gray-400' /></div>
                <div className='flex items-center justify-center gap-10 py-6'>
                    <div className='font-semibold text-2xl text-gray-400'>Description</div>
                    <div className='font-semibold text-2xl text-gray-400'>Additional Information</div>
                    <div className='font-semibold text-2xl text-gray-400'>Reviews</div>
                </div>
                <div className='flex flex-col gap-5'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos deleniti velit harum magni ab quae?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dolores, excepturi vel quisquam a accusantium voluptatem incidunt ratione molestiae dolorum aut saepe, facilis nulla non unde perspiciatis labore laboriosam, provident illo itaque tempore. Commodi voluptatem numquam adipisci, amet, obcaecati facere sunt nam nihil nulla debitis quidem officiis dolorem repudiandae iure?</p>
                </div>
                <div><hr className='text-gray-400' /></div>
            </div>




        </div>
    )
}
