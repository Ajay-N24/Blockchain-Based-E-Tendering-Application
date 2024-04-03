import React from 'react'
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import Navbar from '../Screens/Navbar';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckOtp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const email = localStorage.getItem('userEmail');

    function handleOtp(event) {
        console.log(event)
        console.log(event.target?.value);
        const value = event;
        setOtp(value);
    }
    const handleVerify = async () => {
        const response = await fetch("http://localhost:5000/api/checkOtp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emaile: email, otpe: otp })
        });
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
            navigate("/ChangePass");
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex justify-center min-h-screen bg-[#f3f7f9]'>
                <div className='flex flex-col py-12 px-20 ml-12 bg-white w-[550px] min-h-full justify-center shadow-lg rounded-lg'>
                    <div className='text-2xl font-bold mb-10 text-center'>Enter OTP to Reset Password</div>

                    <div className=''>
                        <OtpInput
                            value={otp}
                            onChange={handleOtp}
                            numInputs={4}
                            isInputNum={true}
                            shouldAutoFocus={true}
                            renderSeparator={<span style={{ width: "2px", margin: "0 1rem" }}></span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{
                                border: "1px solid black",
                                borderRadius: "8px",
                                width: "70px",
                                height: "70px",
                                fontSize: "18px",
                                color: "#000",
                                fontWeight: "400",
                                caretColor: "black"
                            }}
                            focusStyle={{
                                border: "1px solid #CFD3DB",
                                outline: "none"
                            }}
                        /></div>
                    <button className='px-6 py-3 rounded-full bg-green-300 text-lg mt-12' onClick={handleVerify}>Verify</button>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default CheckOtp