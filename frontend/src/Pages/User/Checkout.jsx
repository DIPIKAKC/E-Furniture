import { MountainIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Checkout() {
    const [profile, setProfile] = useState(null);

    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // mock cart data
    const cart = {
        product: "Aggressor sofa",
        quantity: 1,
        price: 250000
    };

    useEffect(() => {
        // simulate API call
        const user = {
            firstName: "Dipika",
            lastName: "KC",
            companyName: "meowcompany",
            email: "dip@gmail.com",
            phone: "9800000000",
            address: "Kathmandu"
        };

        setProfile(user);
        setAddress(user.address);
        setPhoneNumber(user.phone);
    }, []);

    const total = cart.price * cart.quantity;

    const handlePlaceOrder = () => {
        const payload = {
            address,
            phoneNumber,
            additionalInformation
        };

        console.log("Checkout payload", payload);
    };

    if (!profile) return <div className="p-10">Loading...</div>;

    return (
        <>
            <div className='relative'>
                {/* absolute inset-0 makes overlay of fill the image */}
                <div className="absolute inset-0 flex flex-col space-y-3 items-center justify-center z-10">
                    <MountainIcon size={40} className='text-gray-400' />
                    <h1 className='font-bold text-2xl text-gray-400'>Shop</h1>
                    <h2>
                        breadcrumbs home--checkout
                    </h2>
                </div>
                <img className='w-full h-70 object-cover ' src='https://images.pexels.com/photos/5379709/pexels-photo-5379709.jpeg' />
            </div>
            <div className="max-w-6xl mx-auto py-12 px-6 grid md:grid-cols-2 gap-12">

                {/* Billing Details */}
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Billing details</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            className="border p-3 rounded"
                            value={profile.firstName}
                            disabled
                        />

                        <input
                            className="border p-3 rounded"
                            value={profile.lastName}
                            disabled
                        />
                    </div>

                    <input
                        className="border p-3 rounded w-full mt-4"
                        value={profile.companyName}
                        placeholder="Company name (optional)"
                        disabled
                    />

                    <input
                        className="border p-3 rounded w-full mt-4"
                        value="Sri Lanka"
                        disabled
                    />

                    <input
                        className="border p-3 rounded w-full mt-4"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street address"
                    />

                    <input
                        className="border p-3 rounded w-full mt-4"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone"
                    />

                    <input
                        className="border p-3 rounded w-full mt-4"
                        value={profile.email}
                        disabled
                    />

                    <textarea
                        className="border p-3 rounded w-full mt-4"
                        placeholder="Additional information"
                    />
                </div>


                {/* Order Summary */}
                <div className="border p-6 rounded-lg h-fit">

                    <h3 className="text-xl font-semibold mb-6">Product</h3>

                    <div className="flex justify-between mb-4">
                        <span>{cart.product} x {cart.quantity}</span>
                        <span>Rs. {cart.price.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between border-t pt-4">
                        <span>Subtotal</span>
                        <span>Rs. {cart.price.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between font-semibold text-lg mt-2">
                        <span>Total</span>
                        <span className="text-yellow-600">Rs. {total.toLocaleString()}</span>
                    </div>


                    <div className="mt-6 space-y-3">

                        <label className="flex items-center gap-2">
                            <input type="radio" name="payment" defaultChecked />
                            Direct Bank Transfer
                        </label>

                        <p className="text-sm text-gray-500">
                            Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                        </p>

                        <label className="flex items-center gap-2">
                            <input type="radio" name="payment" />
                            Cash On Delivery
                        </label>

                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        className="mt-6 w-full border rounded py-3 hover:bg-gray-100"
                    >
                        Place order
                    </button>

                </div>

            </div>
            <div className='w-full bg-red-200 p-20 flex justify-between'>
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
        </>
    );
}
