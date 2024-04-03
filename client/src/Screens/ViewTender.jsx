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
                const contractAddress = '0x59eA5CfAd54E4AF490f94AFe33e4C57044881b8F';// Token Address of Contract deployed using hardhat in console
                console.log(contractAddress, abi, signer);
                console.log(await provider.getCode(contractAddress));
                // Instantiate the contract
                const contract = new ethers.Contract(contractAddress, abi, signer);
                // Call the contract function (replace 'getData' with your actual function name)
                const data = await contract.getAllTenders();
                // Process the returned data
                console.log('Data from contract:', data);
                setenderArray(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
        // data.map(
        //     function (item) {
        //         setenderArray([...tenderArray, item]);
        //     }
        // )
    }, [])

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
                            <th className='border-black px-7'>Closing Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tenderArray && tenderArray[0].map((item, index) => (
                                <tr key={index}>
                                    <td>{item[0]}</td>
                                    <td>{item[1]}</td>
                                    <td>{item[2] && item[2].type === 'BigNumber' ? new BigNumber(item[2].hex).toString() : ''}</td>
                                    <td>{item[3] && item[3].type === 'BigNumber' ? new BigNumber(item[3].hex).toString() : ''}</td>
                                    <td>{item[4]}</td>
                                    <td>{item[5] && item[5].type === 'BigNumber' ? new BigNumber(item[5].hex).toString() : ''}</td>
                                    <td>{item[6]}</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td className='text-center'>12</td>
                            <td className='text-center'>SandalWood 100 tons Sale</td>
                            <td className='text-center'>15-2-24 2:00 pm</td>
                            <td className='text-center'>
                                <button type="submit" className='px-2 py-1 rounded-xl w-full bg-amber-400 text-base'>View</button>
                            </td>
                            <td className='text-center'>
                                <button type="submit" className='px-2 py-1 rounded-xl w-full bg-green-300 text-base'>Apply</button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default ViewTender