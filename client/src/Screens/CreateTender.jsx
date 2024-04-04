import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers'
import { set } from '../Store/RoleSlice';
import icon from '../contract.png'
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineListAlt } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import moment from 'moment';

const CreateTender = () => {
    const roleu = useSelector((state) => state.Role.value)
    const dispatch = useDispatch()
    const [selectedValue, setSelectedValue] = useState("");
    const [formvalue, setFormvalue] = useState({});
    const menus = [
        { name: "Dashboard", link: " / ", icon: MdDashboard },
        { name: "Create Tender", link: " / ", icon: IoMdAdd },
        { name: "View Tender", link: " / ", icon: FaRegEye },
        { name: "My Applications", link: " / ", icon: MdOutlineListAlt },
        { name: "Logout", link: " / ", icon: RxExit, margin: "true" },
    ];
    const [toggle, setToggle] = useState(false);
    const clkNav = () => {
        setToggle(!toggle);
    }
    const setType = (e) => {
        setSelectedValue(e.target.value);
        setForm(e);
    }
    const setForm = (e) => {
        const { name, value } = e.target;
        setFormvalue({ ...formvalue, [name]: value })
    }
    async function Create() {
        // console.log(
        //     formvalue.title,
        //     formvalue.tenderType,
        //     formvalue.quantity,
        //     formvalue.budget,
        //     formvalue.description,
        //     formvalue.expiryDate
        // )
        if (typeof window !== 'undefined' && window.ethereum) {
            try {
                console.log("Entered Create Function")
                const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "allTenders", "outputs": [{ "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "tenderType", "type": "string" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "budget", "type": "uint256" }, { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "uint256", "name": "expiryDate", "type": "uint256" }, { "internalType": "address", "name": "createdBy", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_title", "type": "string" }, { "internalType": "string", "name": "_tenderType", "type": "string" }, { "internalType": "uint256", "name": "_quantity", "type": "uint256" }, { "internalType": "uint256", "name": "_budget", "type": "uint256" }, { "internalType": "string", "name": "_description", "type": "string" }, { "internalType": "uint256", "name": "_expiryDate", "type": "uint256" }], "name": "createTender", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getAllTenders", "outputs": [{ "components": [{ "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "tenderType", "type": "string" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "budget", "type": "uint256" }, { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "uint256", "name": "expiryDate", "type": "uint256" }, { "internalType": "address", "name": "createdBy", "type": "address" }], "internalType": "structTender.TenderDetails[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "getTendersByUser", "outputs": [{ "components": [{ "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "tenderType", "type": "string" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "budget", "type": "uint256" }, { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "uint256", "name": "expiryDate", "type": "uint256" }, { "internalType": "address", "name": "createdBy", "type": "address" }], "internalType": "structTender.TenderDetails[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "userTenders", "outputs": [{ "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "tenderType", "type": "string" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "budget", "type": "uint256" }, { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "uint256", "name": "expiryDate", "type": "uint256" }, { "internalType": "address", "name": "createdBy", "type": "address" }], "stateMutability": "view", "type": "function" }];
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                console.log('Connected to MetaMask with address:', address);
                const contractAddress = '0xe4414070cF0996bDBed328463Ec370f03FE3E597';// Token Address of Contract deployed in localhost using hardhat on console
                const contract = new ethers.Contract(
                    contractAddress,
                    abi,
                    signer
                );
                try {
                    console.log(
                        formvalue.title,
                        formvalue.tenderType,
                        formvalue.quantity,
                        formvalue.budget,
                        formvalue.description,
                        formvalue.expiryDate
                    )
                    const tx = await contract.createTender(
                        formvalue.title,
                        formvalue.tenderType,
                        formvalue.quantity,
                        formvalue.budget,
                        formvalue.description,
                        formvalue.expiryDate
                    );
                    console.log(tx);
                    await tx.wait();
                    console.log('Transaction hash:', tx.hash);
                } catch (error) {
                    console.error('Error:', error);
                }
                // Now you can use ethers.js with the signer to interact with the Ethereum network
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            console.error('MetaMask is not installed');
        }
    }
    const onsubmit = (e) => {
        e.preventDefault();
        Create();
        console.log("entered onsubmit")
    }
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
        <section className='flex bg-gradient-to-r from-slate-300 to-slate-500'>
            <div className='bg-black'>
                {roleu !== null ? <Sidebar role={roleu} /> : <p>Loading...</p>}
            </div>
            <div className='flex flex-col items-center min-h-full w-full p-11 max-lg:p-4 bg-gradient-to-r from-slate-300 to-slate-500'>
                <form onSubmit={onsubmit} className='w-full'>
                    <h1 className='text-2xl px-40 font-bold text-center'>Create a New Tender</h1>
                    <div className='w-full mt-5 px-40 max-lg:px-10 max-sm:px-5'>
                        <label className="text-gray-900 leading-6 font-medium">Title</label>
                        <input type="text" name="title" id="title" className='mt-2 block py-1.5 rounded-md border-solid border-2 border-gray-600 w-full' onChange={setForm} value={formvalue.title} />
                    </div>
                    <div className='w-full flex gap-11 px-40 max-lg:gap-2 justify-between max-lg:px-10 mt-5 max-sm:px-5'>
                        <div className='w-full'>
                            <label className="text-gray-900 leading-6 font-medium">Type</label>
                            <select id='type' name='tenderType' className='mt-2 block py-1.5 rounded-md border-solid border-2 border-gray-600 w-full' onChange={setType} defaultValue="">
                                <option value="" disabled selected></option>
                                <option value="Goods">Goods</option>
                                <option value="Service">Service</option>
                            </select>
                        </div>
                        {/* <div className='w-full'>
                            {
                                selectedValue === "Goods" &&
                                <div>
                                    <label className="text-gray-900 leading-6 font-medium">Type of {selectedValue}</label>
                                    <select id='type' className='mt-2 block py-1.5 rounded-md border-solid border-2 border-gray-600 w-full' defaultValue="">
                                        <option value="" disabled selected></option>
                                        <option value="Goods">Go</option>
                                        <option value="Service">od</option>
                                    </select>
                                </div>
                            }
                        </div> */}
                    </div>

                    <div className='w-full flex gap-11 px-40 justify-between mt-5 max-lg:px-10 max-sm:px-5'>
                        <div className='w-full'>
                            <label className="text-gray-900 leading-6 font-medium ">Quantity</label>
                            <input type="text" name="quantity" id="Quantity" className='mt-2 block py-1.5 rounded-md border-solid border-2 border-gray-600 w-full' onChange={setForm} value={formvalue.quantity} />
                        </div>
                        <div className='w-full'>
                            <label className="text-gray-900 leading-6 font-medium">Budget</label>
                            <input type="text" name="budget" id="budget" className='mt-2 block py-1.5 rounded-md border-solid border-2 border-gray-600 w-full' onChange={setForm} value={formvalue.budget} />
                        </div>
                    </div>

                    <div className='w-full flex flex-col px-40 gap-0 justify-between mt-5 max-lg:px-10 max-sm:px-5'>
                        <label className="text-gray-900 leading-6 font-medium ">Description</label>
                        <textarea id="description" name="description" rows="4" cols="50" className='mt-2 block py-1.5 rounded-md border-solid border-2 border-gray-600 w-full' onChange={setForm} value={formvalue.description}>
                        </textarea>
                    </div>
                    <div className='w-full flex flex-col px-40 gap-0 justify-between mt-5 max-lg:px-10 max-sm:px-5'>
                        <label className="text-gray-900 leading-6 font-medium ">Expiring Date</label>
                        <input type="datetime-local" name="expiryDate" id="" className='mt-2 block py-1.5 px-3 rounded-md border-solid border-2 border-gray-600 w-1/2' onChange={(e) => {
                            const { name, value } = e.target;
                            // const unixTimestamp = moment(value).unix();
                            // setFormvalue({ ...formvalue, [name]: unixTimestamp });
                            setFormvalue({ ...formvalue, [name]: value })
                            // console.log(unixTimestamp)
                        }} />
                    </div>
                    <div className='max-lg:px-10 px-96 mt-8 max-sm:mt-4'>
                        <button type="submit" className='px-20 max-lg:px-10 py-2 rounded-xl w-full bg-green-300 text-lg mt-4'>Create</button>
                    </div>
                </form>
            </div >
        </section >
    )
}

export default CreateTender