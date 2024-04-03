import React, { useEffect, useState } from "react"
import contract from '../contract.png'
import { useNavigate } from 'react-router-dom';
import Navbar from "../Screens/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();
    const initialValues = { name: "", email: "", password: "", role: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setisSubmit] = useState(false);

    // function for implementing time delay
    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }
    const handleForm = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setisSubmit(true);
        if (Object.keys(formErrors).length === 0) {
            console.log("Hello here");
            saveData();
        }
    }
    useEffect(() => {
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // console.log(formValues);
        }
    }, [formErrors, formValues, isSubmit])
    const validate = (values) => {
        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!values.name) {
            errors.name = "UserName Required";
        }
        if (!values.email) {
            errors.email = "Email Required"
        } else if (!regex.test(values.email)) {
            errors.email = "Enter Valid Email"
        }
        if (!values.password) {
            errors.password = "Password Required"
        } else if (values.password.length < 5) {
            errors.password = "Password must have atleast 5 Characters"
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 Characters"
        }
        if (!values.role) {
            errors.role = "Select a Option";
        }
        return errors;
    }
    const saveData = async () => {
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: formValues.name, email: formValues.email, password: formValues.password, role: formValues.role })
        });
        const json = await response.json();
        console.log(json.success);
        if (json.success) {
            toast.success('User Created Successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            await timeout(20000);
            navigate("/login");
        }
        else if (json.Message === "User with this email already Exists") {
            setFormErrors({ ...formErrors, other: json.Message });
        }
        else if (json.Message === "Entered Email Doesn't exist") {
            setFormErrors({ ...formErrors, other: json.Message });
        }
        else {

        }
    }
    return (
        <>
            <Navbar />
            <div className="flex justify-center min-h-screen bg-[#FDFCFA]">
                <div className="flex min-h-full flex-col justify-center px-6 my-12 py-12 lg:px-8 w-[550px] bg-white rounded-lg shadow-lg">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img className="mx-auto h-16 w-auto" src={contract} alt="Your Company" />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create An Account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                            <div>
                                <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                                <div className="mt-2">
                                    <input id="text" name="name" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formValues.name} onChange={handleForm} />
                                </div>
                                {
                                    formErrors.name &&
                                    (
                                        <div className="p-2 pb-1 font-bold text-sm text-red-600">
                                            {formErrors.name}
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formValues.email} onChange={handleForm} />
                                </div>
                                {
                                    formErrors.email &&
                                    (
                                        <div className="p-2 pb-1 font-bold text-sm text-red-600">
                                            {formErrors.email}
                                        </div>
                                    )
                                }
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>

                                </div>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={formValues.password} onChange={handleForm} />
                                </div>
                                {
                                    formErrors.password &&
                                    (
                                        <div className="p-2 pb-1 font-bold text-sm text-red-600">
                                            {formErrors.password}
                                        </div>
                                    )
                                }
                            </div>

                            <div>
                                <label for="role" className="block text-sm font-medium leading-6 text-gray-900">Type</label>
                                <div className="mt-2">
                                    <select name="role" id="role" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" value={formValues.role} onChange={handleForm}>
                                        <option value=""></option>
                                        <option value="Bidder">Bidder</option>
                                        <option value="Issuer">Issuer</option>
                                    </select>
                                </div>
                                {
                                    formErrors.role &&
                                    (
                                        <div className="p-2 pb-1 font-bold text-sm text-red-600">
                                            {formErrors.role}
                                        </div>
                                    )
                                }
                                {
                                    formErrors.other &&
                                    (
                                        <div className="p-2 pb-1 font-bold text-sm text-red-600">
                                            {formErrors.other}
                                        </div>
                                    )
                                }
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Sign Up</button>
                                <ToastContainer />
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already Registered?
                            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-1">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup;