import { MountainIcon } from "lucide-react";
import Breadcrumb from "../../components/global/Breadcrumb";
import { useCheckoutCartMutation, useGetBillingDetailQuery, useGetCartQuery } from "../../API/Order/orderApi";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Checkout() {

    const nav = useNavigate();

    const { data: billingData, isLoading: billingLoading } = useGetBillingDetailQuery();
    const { data: cartData } = useGetCartQuery();
    const [checkoutCart, { isLoading: checkingOut }] = useCheckoutCartMutation();

    const profile = billingData?.data;
    console.log("profileinfo:", profile)
    const items = cartData?.data?.items || [];

    const subtotal = items.reduce((sum, item) => {
        return sum + (item.product?.price ?? 0) * item.quantity;
    }, 0);

    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [additionalInformation, setAdditionalInformation] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("bank_transfer");

    // once profile loads, prefill fields
    // using useEffect to set initial values from profile
    useEffect(() => {
        if (profile) {
            setAddress(profile.address ?? "");
            setPhone(profile.phone ?? "");
        }
    }, [profile]);


    const handlePlaceOrder = async () => {
        try {
            const res = await checkoutCart({
                body: {
                    address,
                    phone,
                    additionalInformation,
                    paymentMethod
                }
            }).unwrap();

            toast.success("Order placed successfully");
            console.log("checkout", res)
            nav('/');
        } catch (err) {
            console.error("Checkout failed:", err.message);
        }
    };

    if (billingLoading) return <div className="p-10">Loading...</div>;

    return (
        <>
            <div className='relative'>
                {/* absolute inset-0 makes overlay of fill the image */}
                <div className="absolute inset-0 flex flex-col space-y-3 items-center justify-center z-10">
                    <MountainIcon size={40} className='text-gray-400' />
                    <h1 className='font-bold text-2xl text-gray-400'>Shop</h1>
                    <h2>
                        <Breadcrumb />
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
                            value={profile?.firstName ?? "unable to fetch"}
                            disabled
                        />

                        <input
                            className="border p-3 rounded"
                            value={profile?.lastName ?? "unable to fetch"}
                            disabled
                        />
                    </div>

                    <input
                        className="border p-3 rounded w-full mt-4"
                        value={profile?.companyName ?? "unable to fetch"}
                        placeholder="Company name (optional)"
                        disabled
                    />

                    {/* address-editable */}
                    <input
                        className="border p-3 rounded w-full mt-4 focus:outline-none focus:ring-1 focus:ring-amber-300"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street address"
                    />
                    {/* phone-editable */}
                    <input
                        className="border p-3 rounded w-full mt-4 focus:outline-none focus:ring-1 focus:ring-amber-300"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone"
                    />

                    <input
                        className="border p-3 rounded w-full mt-4"
                        value={profile?.email ?? "unable to fetch"}
                        disabled
                    />

                    <textarea
                        className="border p-3 rounded w-full mt-4 focus:outline-none focus:ring-1 focus:ring-amber-300"
                        placeholder="Additional information"
                        rows={4}
                        value={additionalInformation}
                        onChange={(e) => setAdditionalInformation(e.target.value)}
                    />
                </div>


                {/* Order Summary */}
                {/* <div className="border p-6 rounded-lg h-fit">

                    <h3 className="text-xl font-semibold mb-6">Your Order</h3>

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
                        onClick={onSubmit}
                        className="mt-6 w-full border rounded py-3 hover:bg-gray-100"
                    >
                        Place order
                    </button>

                </div> */}
                <div className="border p-6 rounded-lg h-fit">
                    <h3 className="text-xl font-semibold mb-6">Your Order</h3>

                    {/* Header */}
                    <div className="flex justify-between text-gray-400 text-sm mb-3 uppercase">
                        <span>Product</span>
                        <span>Subtotal</span>
                    </div>

                    <hr className="mb-3" />

                    {/* Cart items */}
                    {items.map((item) => (
                        <div key={item._id} className="flex justify-between mb-3 text-sm">
                            <span className="text-gray-600">
                                {item.product?.productName}{' '}
                                <span className="text-gray-400">x {item.quantity}</span>
                            </span>
                            <span>
                                Rs. {(item.product?.price * item.quantity).toLocaleString()}
                            </span>
                        </div>
                    ))}

                    <hr className="my-4" />

                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span className="text-gray-400">Rs. {subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-yellow-600">Rs. {subtotal.toLocaleString()}</span>
                    </div>

                    {/* Payment method */}
                    <div className="mt-6 space-y-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="payment"
                                value="bank_transfer"
                                checked={paymentMethod === "bank_transfer"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Direct Bank Transfer
                        </label>
                        <p className="text-sm text-gray-500 ml-5">
                            Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                        </p>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="payment"
                                value="cash_on_delivery"
                                checked={paymentMethod === "cash_on_delivery"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Cash On Delivery
                        </label>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        disabled={checkingOut || items.length === 0}
                        className="mt-6 w-full border rounded-2xl py-3 hover:bg-amber-50 hover:border-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {checkingOut ? "Placing order..." : "Place order"}
                    </button>

                    {items.length === 0 && (
                        <p className="text-sm text-center text-gray-400 mt-2">
                            Your cart is empty
                        </p>
                    )}
                </div>
            </div >

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
