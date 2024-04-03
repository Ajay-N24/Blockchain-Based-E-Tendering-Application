import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../Store/RoleSlice';
import Sidebar from '../Components/Sidebar'
const { ethers } = require('ethers');

const Tender = () => {
    // Connect to the MetaMask provider
    // async function connectToMetaMask() {
    //     if (typeof window !== 'undefined' && window.ethereum) {
    //         try {
    //             await window.ethereum.request({ method: 'eth_requestAccounts' });
    //             const provider = new ethers.providers.Web3Provider(window.ethereum);
    //             const signer = provider.getSigner();
    //             const address = await signer.getAddress();
    //             console.log('Connected to MetaMask with address:', address);
    //             // Now you can use ethers.js with the signer to interact with the Ethereum network
    //         } catch (error) {
    //             console.error('Error connecting to MetaMask:', error);
    //         }
    //     } else {
    //         console.error('MetaMask is not installed');
    //     }
    // }
    // useEffect(() => {
    //     // Call the function to connect to MetaMask
    //     // connectToMetaMask();
    // }, [])
    // const [isIssuer, setIssuer] = useState(null);
    const roleu = useSelector((state) => state.Role.value)
    const dispatch = useDispatch()
    useEffect(() => {
        const isAdmin = async () => {
            const response = await fetch("http://localhost:5000/api/isIssuer", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emaile: localStorage.getItem("userEmail") })
            });
            const json = await response.json();
            try {
                if (json.success === false) {
                    dispatch(set(json.success))
                    // setIssuer(json.success);
                }
                else if (json.success === true) {
                    dispatch(set(json.success))
                    // setIssuer(json.success);
                }
                console.log(json.success);
            }
            catch (e) {
                console.log(e);
            }
        }
        isAdmin();
    }, [dispatch]);
    return (
        <div>
            {roleu !== null ? <Sidebar role={roleu} /> : <p>Loading...</p>}
        </div>
    )
}

export default Tender