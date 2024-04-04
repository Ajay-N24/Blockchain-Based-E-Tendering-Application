import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { ethers } from 'ethers';
import { BigNumber } from 'bignumber.js';

import { set } from '../Store/RoleSlice';
import Sidebar from '../Components/Sidebar'
const ViewTender = () => {
    const roleu = useSelector((state) => state.Role.value)
    const dispatch = useDispatch();
    const [tenderArray, setenderArray] = useState();
    useEffect(() => {
        // Call a read-only function to retrieve data from the contract
        async function fetchData() {
            try {
                // Connect to an Ethereum network (e.g., mainnet, ropsten, or a local node)
                // const provider = new ethers.providers.Web3Provider(window.ethereum);
                // const signer = provider.getSigner();
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                // Load the contract ABI
                const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "allTenders", "outputs": [{ "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "tenderType", "type": "string" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "budget", "type": "uint256" }, { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "uint256", "name": "expiryDate", "type": "uint256" }, { "internalType": "address", "name": "createdBy", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_title", "type": "string" }, { "internalType": "string", "name": "_tenderType", "type": "string" }, { "internalType": "uint256", "name": "_quantity", "type": "uint256" }, { "internalType": "uint256", "name": "_budget", "type": "uint256" }, { "internalType": "string", "name": "_description", "type": "string" }, { "internalType": "uint256", "name": "_expiryDate", "type": "uint256" }], "name": "createTender", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getAllTenders", "outputs": [{ "components": [{ "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "tenderType", "type": "string" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "budget", "type": "uint256" }, { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "uint256", "name": "expiryDate", "type": "uint256" }, { "internalType": "address", "name": "createdBy", "type": "address" }], "internalType": "structTender.TenderDetails[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "getTendersByUser", "outputs": [{ "components": [{ "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "tenderType", "type": "string" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "budget", "type": "uint256" }, { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "uint256", "name": "expiryDate", "type": "uint256" }, { "internalType": "address", "name": "createdBy", "type": "address" }], "internalType": "structTender.TenderDetails[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "userTenders", "outputs": [{ "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "tenderType", "type": "string" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "budget", "type": "uint256" }, { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "uint256", "name": "expiryDate", "type": "uint256" }, { "internalType": "address", "name": "createdBy", "type": "address" }], "stateMutability": "view", "type": "function" }];
                // Contract address
                const contractAddress = '0xe4414070cF0996bDBed328463Ec370f03FE3E597';// Token Address of Contract deployed using hardhat in console
                console.log(contractAddress, abi, signer);
                // console.log(await provider.getCode(contractAddress));
                // Instantiate the contract
                const contract = new ethers.Contract(contractAddress, abi, signer);
                // Call the contract function (replace 'getData' with your actual function name)
                console.log(contract);
                const data = await contract.getAllTenders();
                // Process the returned data
                console.log('Data from contract:', data);
                setenderArray(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
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
    }, [])
    // let decimalValue;
    // const displayDate = () => {
    //     const datetime = tenderArray.item[5];
    //     decimalValue = parseInt(datetime.hex.substring(2), 16);
    // }
    const displayDate = (datetime) => {
        const decimalValue = parseInt(datetime.hex.substring(2), 16);
        return new Date(decimalValue).toLocaleString();
    };
    return (
        <div className='flex bg-gradient-to-r from-slate-300 to-slate-500'>
            <div className='bg-black'>
                {roleu !== null ? <Sidebar role={roleu} /> : <p>Loading...</p>}
            </div>
            <div className='w-full flex flex-col px-10 mt-20 max-md:px-2 max-md:mt-4'>
                <h1 className='text-2xl font-bold text-center mb-4'>View Tender And Apply for Tenders</h1>
                {console.log(tenderArray)}
                <table className='table-auto border-separate border-spacing-7 max-md:border-spacing-1 bg-slate-300 rounded-lg overflow-x-auto'>
                    <thead className=''>
                        <tr className=''>
                            <th className='border-black px-3'>Reference Number</th>
                            <th className='border-black px-3'>Tender Title</th>
                            <th className='border-black px-3'>Tender Type</th>
                            <th className='border-black px-3'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tenderArray && tenderArray.map((item, index) => (
                                <tr key={index}>
                                    <td className='text-center px-3'>1</td>
                                    <td className='text-center px-3'>{item[0]}</td>
                                    <td className='text-center px-3'>{item[1]}</td>
                                    {/* <td className='text-center px-3' onLoad={displayDate}>{item[5] && item[5].type === 'BigNumber' ? new BigNumber(item[5].hex).toString() : ''}</td> */}
                                    {/* <td className='text-center px-3' onLoad={displayDate}>{decimalValue}</td> */}
                                    {/* <td className='text-center px-3'>{item[5] && item[5].type === 'BigNumber' ? displayDate(item[5]) : ''}</td> */}
                                    <td className='text-center flex justify-center gap-8'>
                                        <div className='text-center'>
                                            <button type="submit" className='px-5 py-1.5 rounded-xl w-full bg-amber-400 text-base'>View</button>
                                        </div>
                                        <div className='text-center'>
                                            <button type="submit" className='px-5 py-1.5 rounded-xl w-full bg-green-300 text-base'>Apply</button>
                                        </div>
                                    </td>
                                </tr>

                            ))
                        }
                        {/* {console.log(decimalValue)} */}
                        {/* <tr>
                            <td className='text-center'>12</td>
                            <td className='text-center'>SandalWood 100 tons Sale</td>
                            <td className='text-center'>
                                <button type="submit" className='px-2 py-1 rounded-xl w-full bg-amber-400 text-base'>View</button>
                            </td>
                            <td className='text-center'>
                                <button type="submit" className='px-2 py-1 rounded-xl w-full bg-green-300 text-base'>Apply</button>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewTender