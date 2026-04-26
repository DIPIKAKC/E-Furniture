import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {

    if (!product) return null;
    const nav = useNavigate();
    return (
        // <div className="w-fit">
        <>
            <div onClick={()=>nav(`/products/${product._id}`)}  className="w-fit flex flex-col space-y-2 shadow-sm rounded-xl">
                <img className="w-80 h-50 object-cover rounded-t-xl" src={product.image} />
                <div className="px-4 py-4 flex flex-col space-y-3">
                    <h2 className="text-md">{product.productName}</h2>
                    <h1 className="text-xl font-semibold"> Rs. {product.price}</h1>
                </div>
            </div>

        </>
        // </div>

    )
}
