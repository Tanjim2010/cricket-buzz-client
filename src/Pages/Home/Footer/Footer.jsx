import React from "react";

const Footer = () => {
    return (
        <div className="bg-black text-white py-10  lg:mt-[150px]">
            <div className="relative md:w-4/5 mx-auto">
                <div className="lg:absolute p-5 w-full bg-white rounded-lg lg:top-[-150px]">
                    <div style={{ backgroundImage: "url('https://i.ibb.co.com/1tMxVjzz/bg-shadow.png')" }} className="py-20 w-[11/12] lg:px-[280px] bg-cover bg-no-repeat  bg-white p-6 rounded-lg text-center shadow-lg">
                        <h2 className="text-2xl font-bold text-black">Subscribe to our Newsletter</h2>
                        <p className="text-black">Get the latest updates and news right in your inbox!</p>
                        <div className="mt-4 flex justify-center">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="p-2 rounded-l-lg border border-gray-300 focus:outline-none text-black"
                            />
                            <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-r-lg">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className=" mx-auto pt-5 lg:pt-[200px]">


                    <div className="flex items-center justify-center">
                        <img src="https://i.ibb.co.com/SXwjMJSz/logo-footer.png" alt="" />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center mt-10">
                        <div className="text-center md:text-left">
                            <h3 className="text-lg font-bold">About Us</h3>
                            <p className="text-gray-400">We are a passionate team dedicated to providing the best services to our customers.</p>
                        </div>

                        <div className="text-center">
                            <h3 className="text-lg font-bold">Quick Links</h3>
                            <ul className="text-gray-400">
                                <li>Home</li>
                                <li>Services</li>
                                <li>About</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10 text-center border-t border-gray-700 pt-4">
                        <p className="text-gray-400">@2024 Your Company All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
