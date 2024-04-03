import React, { useState } from "react";
import contract from '../contract.png';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Screens/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const navigate = useNavigate();
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [error, setError] = useState({});
    function handleForm(event) {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validateForm(formValues));
        if (Object.keys(error).length === 0) {
            handleLogin();
        }
    }
    const handleLogin = async () => {
        const response = await fetch("http://localhost:5000/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: formValues.email, password: formValues.password })
        });
        const json = await response.json();
        console.log(json.success);
        if (!json.success) {
            toast.error('Invalid Username/Password', {
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
            localStorage.setItem("userEmail", formValues.email);
            localStorage.setItem("authToken", json.authToken);
            navigate("/");
            toast.success('Logged In Successfully!', {
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
    const validateForm = (form) => {
        const errors = {};
        const regx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!form.password) {
            errors.password = "Password Required";
        } else if (form.password.length < 4) {
            errors.password = "Password must be atleast 4 Characters"
        } else if (form.password.length > 10) {
            errors.password = "Password must not exceed 10 Characters"
        }
        if (!form.email) {
            errors.email = "Email Required";
        } else if (!regx.test(form.email)) {
            errors.email = "Enter Valid Email Address!";
        }
        return errors;
    }
    return (
        <>
            <Navbar />
            <div className="flex justify-center min-h-screen bg-[#FDFCFA]">
                <div className="flex min-h-full my-11 flex-col justify-center px-6 py-12 lg:px-8 w-[550px] bg-white rounded-lg shadow-lg">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-16 w-auto" src={contract} alt="Your Company" />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your account</h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                            <div>
                                <label for="email" className="block text-[0.98rem] font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formValues.email} onChange={handleForm} />
                                </div>
                                {
                                    error.email &&
                                    (
                                        <div className="p-2 font-bold text-[15px] text-red-600">
                                            {error.email}
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label for="password" className="block text-[0.98rem] font-medium leading-6 text-gray-900">Password</label>
                                </div>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formValues.password} onChange={handleForm} />
                                </div>

                                <div className={`text-base flex ${error.password && 'justify-between'} justify-end mt-4`}>
                                    {
                                        error.password &&
                                        (
                                            <div className="px-2 font-bold text-[15px] text-red-600">
                                                {error.password}
                                            </div>
                                        )
                                    }
                                    <a href="/EmailEntry" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Login</button>
                                <ToastContainer />
                            </div>
                        </form>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not Registered?
                            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-1">Create an Account</a>
                        </p>
                    </div>
                </div >
            </div >
        </>
    )
}
export default Login;