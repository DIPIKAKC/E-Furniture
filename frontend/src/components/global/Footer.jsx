import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700 px-10 pt-20 pb-5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Address */}
                <div className="text-sm">
                    <p>
                        400 University Drive Suite 200 Coral <br />
                        Gables, <br />
                        FL 33134 USA
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-semibold mb-4">Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-black cursor-pointer">Home</li>
                        <li className="hover:text-black cursor-pointer">Shop</li>
                        <li className="hover:text-black cursor-pointer">About</li>
                        <li className="hover:text-black cursor-pointer">Contact</li>
                    </ul>
                </div>

                {/* Help */}
                <div>
                    <h3 className="font-semibold mb-4">Help</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-black cursor-pointer">Payment Options</li>
                        <li className="hover:text-black cursor-pointer">Returns</li>
                        <li className="hover:text-black cursor-pointer">Privacy Policies</li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="font-semibold mb-4">Newsletter</h3>

                    <div className="flex items-center border-b border-gray-400 pb-1">
                        <input
                            type="email"
                            placeholder="Enter Your Email Address"
                            className="bg-transparent outline-none text-sm flex-1"
                        />
                        <button className="text-sm font-semibold hover:underline">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-t mt-10 pt-6 text-sm text-gray-300" />
            <div>
                2022 Meubel House. All rights reserved
            </div>

        </footer>
    )
}
