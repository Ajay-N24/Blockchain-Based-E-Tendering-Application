import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Logout = () => {
    const handleLogout = () => {
        // Clear authentication token from local storage or cookies
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
    };

    return (
        <li onClick={handleLogout} className='cursor-pointer'>Logout</li>

    );
};

export default Logout;