import React, { useContext } from 'react'
import icon from '../contract.png'
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineListAlt } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = ({ role }) => {
    const navigate = useNavigate();
    const menusforIssuer = [
        { name: "Dashboard", link: " / ", icon: MdDashboard },
        { name: "Create Tender", link: "/CreateTender", icon: IoMdAdd },
        { name: "View All Tenders", link: "/ViewTender", icon: FaRegEye },
        { name: "Created Tenders", link: "/CATenders", icon: MdOutlineListAlt }
    ];
    const menusforBidder = [
        { name: "Dashboard", link: " / ", icon: MdDashboard },
        { name: "View All Tenders", link: "/ViewTender", icon: FaRegEye },
        { name: "Applied Tenders", link: "/CATenders", icon: MdOutlineListAlt },
    ];
    const [toggle, setToggle] = useState(false);
    const clkNav = () => {
        setToggle(!toggle);
    }
    const onImgClick = () => {
        navigate("/");
    }
    const logoutSide = () => {
        localStorage.removeItem('authToken'); // Assuming token is stored in local storage
        // Redirect user to the login page or any other appropriate page
        window.location.href = '/login'; // Redirect to login page
        toast.success('Logged Out', {
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
    return (
        <div className={`bg-[#2f2e41] min-h-screen ${toggle ? "w-[67.6px]" : "w-72"} text-gray-100 px-4 flex flex-col`}>
            <div className={`flex justify-between my-5 mx-1`}>
                {
                    toggle ?
                        null :
                        <div className='p-2 h-14 w-16 flex bg-white rounded-full justify-center'>
                            <img src={icon} alt="" height={50} width={50} className='cursor-pointer' onClick={onImgClick} />
                        </div>
                }
                <div className='mt-3' onClick={clkNav}>
                    <HiMenuAlt3 size={26} className='cursor-pointer' />
                </div>
            </div>
            <div className='mt-8 flex flex-col relative gap-4'>
                {console.log(role)}
                {role === true ?
                    menusforIssuer?.map(
                        (menu, i) => {
                            return (
                                <Link to={menu.link} key={i} className={`${menu?.margin && "mt-80"} flex gap-3.5 items-center text-sm font-medium p-2 hover:bg-gray-800 rounded-md group`}>
                                    <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                                    <h2 style={{ transitionDelay: `${i + 3}00ms` }} className={`whitespace-pre duration-500 ${toggle && "opacity-0 translate-x-28 overflow-hidden"}`}>{menu?.name}</h2>
                                    <h2 className={`${!toggle && "hidden"} absolute left-48 whitespace-pre bg-white font-semibold text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 group-hover:px-2 group-hover:py-1 group-hover:duration-300 overflow-hidden group-hover:left-14 group-hover:w-fit`}>{menu.name}</h2>
                                </Link>
                            )
                        }
                    )

                    :
                    menusforBidder?.map(
                        (menu, i) => {
                            return (
                                <Link to={menu.link} key={i} className={`${menu?.margin && "mt-80"} flex gap-3.5 items-center text-sm font-medium p-2 hover:bg-gray-800 rounded-md group`}>
                                    <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                                    <h2 style={{ transitionDelay: `${i + 3}00ms` }} className={`whitespace-pre duration-500 ${toggle && "opacity-0 translate-x-28 overflow-hidden"}`}>{menu?.name}</h2>
                                    <h2 className={`${!toggle && "hidden"} absolute left-48 whitespace-pre bg-white font-semibold text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 group-hover:px-2 group-hover:py-1 group-hover:duration-300 overflow-hidden group-hover:left-14 group-hover:w-fit`}>{menu.name}</h2>
                                </Link>
                            )
                        }
                    )
                }
                <Link onClick={logoutSide} className='flex gap-3.5 mt-72 items-center text-sm font-medium p-2 hover:bg-gray-800 rounded-md group'>
                    <div>{React.createElement(RxExit, { size: "20" })}</div>
                    <h2 style={{ transitionDelay: `${1 + 3}00ms` }} className={`whitespace-pre duration-500 ${toggle && "opacity-0 translate-x-28 overflow-hidden"}`}>Logout</h2>
                    <h2 className={`${!toggle && "hidden"} absolute left-48 whitespace-pre bg-white font-semibold text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 group-hover:px-2 group-hover:py-1 group-hover:duration-300 overflow-hidden group-hover:left-14 group-hover:w-fit`}>Logout</h2>
                </Link>
            </div>
        </div >
    )
}

export default Sidebar