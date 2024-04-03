import React, { useState } from "react";
import contract from '../contract.png';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Screens/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailEntry = () => {
    const navigate = useNavigate()
    const initialValues = { email: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [error, setError] = useState({});
    function handleForm(event) {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(validateForm(formValues));
        if (Object.keys(error).length === 0) {
            const j = await handleReset();
            console.log(j);
            if (!j.success) {
                console.log("Success!!!")
                toast.warn('Enter Valid Email', {
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
                console.log('baba re baa');
                toast.success('Otp Sent Successfully to ' + formValues.email, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                localStorage.setItem("userEmail", formValues.email);
                navigate("/CheckOtp");
            }
        }
    }
    const handleReset = async () => {
        const response = await fetch("http://localhost:5000/api/send_recovery_email", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: formValues.email })
        });
        const json = await response.json();
        console.log(json);
        return json;
    }
    const validateForm = (form) => {
        const errors = {};
        const regx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!form.email) {
            errors.email = "Email Required";
        } else if (!regx.test(form.email)) {
            errors.email = "Enter Valid Email Address!";
        }
        return errors;
    }
    // const notify = () => toast.success('OTP Sent to ' + formValues.email, {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    // });
    return (
        <>
            <Navbar />
            <div className="flex justify-center min-h-screen bg-[#f3f7f9]">
                <div className="flex min-h-full my-16 flex-col justify-center px-6 py-12 lg:px-8 w-[550px] bg-white rounded-lg shadow-lg">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-16 w-auto" src={contract} alt="Your Company" />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Enter Your Email for Resetting Password</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                            <div>

                                <div className='w-full'>
                                    <div>
                                        <label className="block text-gray-900 leading-6 font-medium">Email Address</label>
                                        <input type="text" name="email" id="email" className='mt-2 w-full block py-1.5 rounded-md border-solid border-2 border-gray-600' value={formValues.email} onChange={handleForm} />
                                    </div>
                                </div>
                                {
                                    error.email &&
                                    (
                                        <div className="p-2 font-bold text-base text-red-600">
                                            {error.email}
                                        </div>
                                    )
                                }
                            </div>

                            <div>
                                <button type="submit" className='px-[5rem] py-2 rounded-lg w-full bg-green-300 text-lg mt-4'>Reset Password</button>
                                <ToastContainer />
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not Registered?
                            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-1">Create an Account</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmailEntry