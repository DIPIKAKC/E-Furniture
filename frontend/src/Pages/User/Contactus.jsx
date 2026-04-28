import { Clock, MapPin, MountainIcon, Phone } from 'lucide-react'
import React from 'react'
import Breadcrumb from '../../components/global/Breadcrumb'

export default function Contactus() {
    return (
        <div>
            <div className='relative'>
                {/* absolute inset-0 makes overlay of fill the image */}
                <div className="absolute inset-0 flex flex-col space-y-3 items-center justify-center z-10">
                    <MountainIcon size={40} className='text-gray-400' />
                    <h1 className='font-bold text-2xl text-gray-400'>Shop</h1>
                    <h2>
                        <Breadcrumb />
                    </h2>
                </div>
                <img className='w-full h-50 object-cover ' src='https://images.pexels.com/photos/5379709/pexels-photo-5379709.jpeg' />
            </div>

            <section className="py-10 px-20 bg-white">
                <div className="max-w-6xl mx-auto">

                    {/* Heading */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-semibold">Get In Touch With Us</h2>
                        <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
                            For More Information About Our Product & Services. Please Feel Free
                            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
                            Not Hesitate!
                        </p>
                    </div>

                    {/* Content */}
                    <div className="grid md:grid-cols-2">

                        {/* Left Info */}
                        <div className="space-y-5">

                            <div className="flex gap-4">
                                <MapPin className="w-6 h-6 mt-1" />
                                <div>
                                    <h3 className="font-semibold">Address</h3>
                                    <p className="text-gray-500 text-sm">
                                        236 5th SE Avenue, New <br />
                                        York NY10000, United <br />
                                        States
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Phone className="w-6 h-6 mt-1" />
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-gray-500 text-sm">
                                        Mobile: (+84) 546-6789 <br />
                                        Hotline: (+84) 456-6789
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Clock className="w-6 h-6 mt-1" />
                                <div>
                                    <h3 className="font-semibold">Working Time</h3>
                                    <p className="text-gray-500 text-sm">
                                        Monday-Friday : 9:00 - 22:00 <br />
                                        Saturday-Sunday : 9:00 - 21:00
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Right Form */}
                        <form className="space-y-5">

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Your name
                                </label>
                                <input
                                    type="text"
                                    placeholder="ABC"
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Abc@def.com"
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    placeholder="This is an optional"
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Hi! I'd like to ask about"
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:border-black"
                                />
                            </div>

                            <button
                                type="submit"
                                className="px-8 py-2 border border-black rounded-md hover:bg-black hover:text-white transition"
                            >
                                Submit
                            </button>

                        </form>
                    </div>
                </div>
            </section>

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
        </div>
    )
}
