import { MinusIcon, PlusIcon, Star, StarHalfIcon } from 'lucide-react'
import React from 'react'
import ProductCard from '../../components/global/ProductCard'
import CartSidebar from '../../components/global/CartSidebar'
import { useGetAllProductsQuery, useGetSingleProductQuery } from '../../API/Product/productApi';
import { useParams } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';

export default function ProductDetail() {
    const { id } = useParams();
    const { isLoading, error, data } = useGetSingleProductQuery(id);
    console.log("singleproduct data:", data);

    const product = data?.singleProduct;
    console.log("category:", product?.category);

    const { data: allProducts } = useGetAllProductsQuery({
        category: product?.category?._id,
        tag: product?.tags,
    });

    // Excluding the current product from related products
    const relatedProducts = allProducts?.products?.filter(p => p._id !== id) || [];

    if (isLoading) return <h1 className="text-center text-white">Loading...</h1>;
    if (error) return <h1 className="text-center text-red-500">Error loading the product</h1>;
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
                        <img className='w-140 h-90 object-cover' src={data?.singleProduct?.image} alt="" />
                    </div>
                </div>
                <div className='flex flex-col gap-10 px-20'>
                    <div className='flex flex-col gap-2'>
                        <h2 className="text-4xl font-bold">{product?.productName}</h2>
                        <h3 className='text-xl font-semibold text-gray-400'>Rs. {product?.price?.toLocaleString()}</h3>
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
                                {product?.sizes?.map(size => (
                                    <div key={size} className='py-1 px-3 border w-fit rounded-lg text-sm cursor-pointer hover:bg-amber-100'>
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h5 className=' text-lg text-gray-400'>Color</h5>
                            <div className='flex items-center gap-2'>
                                {product?.colors?.map(color => (
                                    <div
                                        key={color}
                                        className='size-6 rounded-full border-2 border-gray-300 hover:border-gray-400 cursor-pointer'
                                        style={{ backgroundColor: color }}   // works if colors are stored as hex/css values
                                    />
                                ))}
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
                        <div className='text-sm text-gray-400'>SKU : {product?._id?.slice(-6).toUpperCase()}</div>
                        <div className='text-sm text-gray-400'>Category : {product?.category?.name ?? "Uncategorized"}</div>
                        <div className='text-sm text-gray-400'>Tags : {product?.tags?.length > 0 ? product.tags.join(", ") : "None"}</div>
                        <div className='text-sm text-gray-400 flex gap-2 items-center'>Share : <FaFacebook /> <BsInstagram /></div>
                    </div>
                </div>
            </div>


            <div><hr className='text-gray-400' /></div>

            <div className='flex flex-col space-y-6 py-10 px-20'>
                <div className='flex items-center justify-center gap-10'>
                    <div className='font-semibold text-2xl text-gray-400'>Description</div>
                    <div className='font-semibold text-2xl text-gray-400'>Additional Information</div>
                    <div className='font-semibold text-2xl text-gray-400'>Reviews</div>
                </div>
                <div className='flex flex-col gap-5 px-20'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos deleniti velit harum magni ab quae?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dolores, excepturi vel quisquam a accusantium voluptatem incidunt ratione molestiae dolorum aut saepe, facilis nulla non unde perspiciatis labore laboriosam, provident illo itaque tempore. Commodi voluptatem numquam adipisci, amet, obcaecati facere sunt nam nihil nulla debitis quidem officiis dolorem repudiandae iure?</p>
                </div>
                <div className='grid grid-cols-2 gap-8'>
                    <img className='h-80 w-full object-cover rounded-2xl' src={data?.singleProduct?.image} alt="" />
                    <img className='h-80 w-full object-cover rounded-2xl' src={data?.singleProduct?.image} alt="" />
                </div>
                {/* <div className='grid grid-cols-2 gap-8'>
                    <img className='h-80 w-full object-cover rounded-2xl' src="https://images.pexels.com/photos/6580222/pexels-photo-6580222.jpeg" alt="" />
                    <img className='h-80 w-full object-cover rounded-2xl' src="https://images.pexels.com/photos/6580223/pexels-photo-6580223.jpeg" alt="" />
                </div> */}
            </div>

            <div><hr className='text-gray-400' /></div>

            <div className='flex flex-col gap-15 py-10'>
                <div className='flex flex-col gap-2 items-center'>
                    <h2 className='font-semibold text-4xl'>Related Products</h2>
                    <p className='text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis expedita officia consectetur laudantium impedit perferendis!</p>
                </div>
                <div className='grid grid-cols-4 space-y-5 px-20'>
                    {/* {allProducts?.products?.map((p) => {
                        return <ProductCard key={p._id} product={p} />
                    })} */}
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))
                    ) : (
                        <p className='col-span-4 text-center text-gray-400'>No related products found.</p>
                    )}
                </div>
                <button className='justify-center-safe underline underline-offset-5'>View More</button>

            </div>



        </div>
    )
}
