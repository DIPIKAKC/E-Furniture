export default function OrderCard({ order }) {
    if (!order) return null;

    return (
        <div className="w-120 p-4 shadow rounded-xl bg-white flex justify-between items-center">
            <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-gray-400">
                    Order ID: {order._id}
                </h2>

                {order?.orderItems?.map((item) => (
                    <div key={item._id} className="flex justify-between">
                        <p className="text-gray-600 flex uppercase">
                            {item.product?.productName}
                            <div className="px-3">x</div>
                            {item.quantity}</p>
                    </div>
                ))}

                <p className="text-gray-600">{new Date(order.createdAt).toLocaleString("en-US")}</p>            </div>
            <div>
                <h1 className="mt-2 font-bold text-amber-400">
                    Rs. {order.totalPrice}
                </h1>
            </div>

        </div>
    );
}