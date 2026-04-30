import { Heart, HeartIcon, MinusIcon, PlusIcon, Star, StarHalfIcon } from 'lucide-react'
import React, { useState } from 'react'
import ProductCard from '../../components/global/ProductCard'
import CartSidebar from '../../components/global/CartSidebar'
import { useGetAllProductsQuery, useGetSingleProductQuery } from '../../API/Product/productApi';
import { useNavigate, useParams } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import Breadcrumb from '../../components/global/Breadcrumb';
import { useAddToCartMutation } from '../../API/Order/orderApi';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { openCart } from '../../API/Slice/cartSlice';
import { useAddToWishlistMutation } from '../../API/Wishlist/wishlistApi';

export default function ProductDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();

    // main display image — show first image by default
    const [selectedImage, setSelectedImage] = useState(0);

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

    //userid to see if the user has liked the product
    const userId = useSelector((state) => state.userSlice.user?.id)
    const isLiked = product?.likes?.includes(userId);

    // const [liked, setLiked] = useState(false);
    const [addToWishlist] = useAddToWishlistMutation();


    const [color, setColor] = useState();
    const [size, setSize] = useState();
    const [quantity, setQuantity] = useState(1);


    const [addToCart, { isLoading: addingToCart }] = useAddToCartMutation();

    const handleAddToCart = async () => {
        try {
            if (!userId) {
                toast.error('Please login to perform the activity')
            }
            if (userId && !size) return toast.error("Please select a size");
            if (userId && !color) return toast.error("Please select a color");
            await addToCart({ productId: id, quantity, size, color }).unwrap();
            dispatch(openCart()); //cart sidebar
        } catch (err) {
            console.error('Failed to add to cart:', err);
        }
    };


    const handleLike = async () => {
        try {
            if (!userId) {
                toast.error('Please login to perform the activity')
            }
            addToWishlist(product?._id)
        } catch (error) {
            console.error('Failed to Like the product:', err.message);

        }
    }

    if (isLoading) return <h1 className="text-center text-white">Loading...</h1>;
    if (error) return <h1 className="text-center text-red-500">Error loading the product</h1>;
    return (
        <div>
            <div className='bg-amber-100 py-8 px-20'>
                <Breadcrumb productName={product?.productName} />
            </div>

            {/* product */}
            <div className='grid grid-cols-2 py-6'>
                <div className='flex justify-end gap-6'>
                    {/* thumbnails */}
                    <div className='flex flex-col gap-6'>
                        {product?.images?.map((img, index) => (
                            <img
                                key={index}
                                className={`size-15 object-cover cursor-pointer border-2 ${selectedImage === index ? 'border-amber-400' : 'border-transparent'
                                    }`}
                                src={img}
                                onClick={() => setSelectedImage(index)}
                            />
                        ))}
                    </div>
                    {/* display image */}
                    <div>
                        <img
                            className='w-140 h-90 object-cover'
                            src={product?.images?.[selectedImage]}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-10 px-20'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <h2 className="text-4xl font-bold">{product?.productName}</h2>
                            <HeartIcon
                                onClick={() => handleLike()}
                                className={`cursor-pointer transition 
                            ${isLiked ? "text-pink-500 fill-pink-500" : "text-gray-500"}`}
                            />
                        </div>
                        <h3 className='text-xl font-semibold text-gray-400'>Rs. {product?.price?.toLocaleString()}</h3>
                        <div className='flex items-center gap-1'>
                            <Star size={20} />
                            <Star size={20} />
                            <Star size={20} />
                            <Star size={20} />
                            <StarHalfIcon size={20} />
                        </div>
                        <p className='text-balance'>{product.description}</p>
                        <div className='flex flex-col gap-1'>
                            <h5 className=' text-lg text-gray-400'>Size</h5>
                            <div className='flex items-center gap-2'>
                                {product?.sizes?.map(s => (
                                    <div
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={`py-1 px-3 border w-fit rounded-lg text-sm cursor-pointer 
                                  ${size === s ? 'bg-amber-100 border-amber-400' : 'hover:bg-amber-100'}`}
                                    >
                                        {s}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h5 className=' text-lg text-gray-400'>Color</h5>
                            <div className='flex items-center gap-2'>
                                {product?.colors?.map(c => (
                                    <div
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={`size-6 rounded-full cursor-pointer border-2 
                                     ${color === c ? 'border-amber-400 scale-110' : 'border-gray-300 hover:border-gray-400'}`}
                                        style={{ backgroundColor: c }}  // works if color are stored as hex/css values
                                    />
                                ))}
                            </div>
                        </div>

                        {/* add to cart */}
                        <div className='flex items-center gap-2'>
                            <button className='flex items-center justify-evenly border-1 py-2 w-20 rounded-2xl bg-white'>
                                <div onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
                                    <MinusIcon size={15} />
                                </div>
                                <div>{quantity}</div>
                                <div onClick={() => setQuantity(prev => prev + 1)}>
                                    <PlusIcon size={15} />
                                </div>
                            </button>
                            <button
                                onClick={handleAddToCart}
                                disabled={addingToCart}
                                className='px-10 py-2 border-1 rounded-2xl'
                            >
                                {addingToCart ? 'Adding...' : 'Add To Cart'}
                            </button>
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
                    <img className='h-80 w-full object-cover rounded-2xl' src={product?.images?.[1]} alt="" />
                    <img className='h-80 w-full object-cover rounded-2xl' src={product?.images?.[3]} alt="" />
                </div>

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
