
export default function ProductCard() {
    return (
        // <div className="w-fit">
        <div className="w-fit flex flex-col space-y-2 shadow-sm rounded-xl">
            <img className="w-80 h-50 object-cover rounded-t-xl" src="https://images.pexels.com/photos/9708530/pexels-photo-9708530.jpeg" />
            <div className="px-4 py-4 flex flex-col space-y-3">
                <h2 className="text-md">Trenton modular sofa_3</h2>
                <h1 className="text-xl font-semibold"> Rs. 25,000</h1>
            </div>
        </div>
        // </div>

    )
}
