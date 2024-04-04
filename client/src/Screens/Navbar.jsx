import React from 'react'
import icon from '../contract.png'
import { useState } from 'react'
import NavLinks from '../Components/NavLinks';
import Logout from '../Components/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const sendMessage = () => {
        toast.success('User Logged Out!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    const [IsOpen, setIsOpen] = useState(false);
    return (
        <section className='flex flex-row justify-between text-white items-center px-16 max-lg:px-6 py-3 bg-[#2f2e41]'>
            <div className='cursor-pointer bg-white rounded-full p-2'>
                <img src={icon} alt="" height={48} width={48} />
            </div>
            <div className={`pr-10 max-[1200px]:pr-0 md:block hidden`}>
                <ul className='flex flex-row justify-end items-end font-semibold gap-16 max-lg:gap-9'>
                    <li className='hover:text-red-700'><a href="/">Home</a></li>
                    {
                        localStorage.getItem("authToken") && (<li className='hover:text-red-700'><a href="/Tender">Tendering App</a></li>)
                    }
                    <li className='hover:text-red-700'><a href="#">About</a></li>
                    <li className='hover:text-red-700'><a href="#">Contact Us</a></li>
                    {
                        !localStorage.getItem("authToken") && (<><li><a href="/register">Sign Up</a></li>
                            <li className='hover:text-red-700'><a href="/login">Login</a></li></>)
                    }
                    {
                        localStorage.getItem("authToken") && (<Logout onClick={sendMessage} />)
                    }
                    <ToastContainer />
                </ul>
            </div>
            {console.log(IsOpen)}
            <div className='md:hidden cursor-pointer' onClick={() => setIsOpen(!IsOpen)}>
                <i class="fa-solid fa-bars fa-xl"></i>
            </div>
            <div className={`absolute z-10 top-[86px] left-0 w-full bg-[#2f2e41] ${IsOpen ? "block" : "hidden"} md:hidden`}>
                <ul className='flex flex-col items-center font-semibold gap-6 my-5'>
                    {/* <li className='hover:bg-red-700'><a href="#">Home</a></li>
                    <li><a href="#">View Tenders</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="/register">Sign Up</a></li>
                    <li><a href="/login">Login</a></li> */}
                    <li className='hover:text-red-700'><a href="#">Home</a></li>
                    <li className='hover:text-red-700'><a href="#">View Tenders</a></li>
                    <li className='hover:text-red-700'><a href="#">About</a></li>
                    <li className='hover:text-red-700'><a href="#">Contact Us</a></li>
                    <li className='hover:text-red-700'><a href="/register">Sign Up</a></li>
                    <li className='hover:text-red-700'><a href="/login">Login</a></li>
                </ul>
            </div>
        </section>
    )
}

export default Navbar