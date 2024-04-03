import React from 'react'
import { useState } from 'react';
import Navbar from '../Screens/Navbar';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePass = () => {
    const [pass, setPass] = useState({ pass1: "", pass2: "" });
    function setPassword(e) {
        const { value, name } = e.target;
        if (name === "pass1") {
            setPass({ ...pass, pass1: value })
        }
        else if (name === "pass2") {
            setPass({ ...pass, pass2: value })
        }
    }
    const handleReset = async () => {
        const email = localStorage.getItem("userEmail");
        if (pass.pass1 === pass.pass2) {
            const response = await fetch("http://localhost:5000/api/changePassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emaile: email, pass: pass.pass1 })
            })
            const json = await response.json();
            if (!json.success) {
                toast.warn(json.message, {
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
            else {
                toast.success(json.message, {
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
        }
        else {
            toast.warn("Confirm Password Properly", {
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
    }
    return (
        <div>
            <Navbar />
            <div className='flex justify-center min-h-screen bg-[#f3f7f9]'>
                <div className='flex flex-col py-12 px-8 bg-white w-[550px] min-h-full justify-center shadow-lg rounded-lg'>
                    <div className='text-2xl font-bold mb-10'>Reset Password</div>
                    <div className='w-full px-14'>
                        <div>
                            Enter Password<br />
                            <input type="text" name="pass1" id="pass1" className='mt-1 w-full block py-1.5 rounded-md border-solid border-2 border-gray-600' value={pass.pass1} onChange={setPassword} />
                        </div><br />
                        <div>
                            Confirm Password <br />
                            <input type="text" name="pass2" id="pass2" className='mt-1 w-full block py-1.5 rounded-md border-solid border-2 border-gray-600' value={pass.pass2} onChange={setPassword} />
                        </div>
                    </div>
                    <div className=''>
                        <button className='px-[10.5rem] py-3 rounded-lg w-full bg-green-300 text-lg mt-8' onClick={handleReset}>Reset</button>
                    </div>

                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}
export default ChangePass