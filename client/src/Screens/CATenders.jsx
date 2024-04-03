import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { set } from '../Store/RoleSlice';
import Sidebar from '../Components/Sidebar'

const CATenders = () => {
    const roleu = useSelector((state) => state.Role.value)
    const dispatch = useDispatch()
    return (
        <div className='flex'>
            <div>
                {roleu !== null ? <Sidebar role={roleu} /> : <p>Loading...</p>}
            </div>
            <div className='flex flex-col items-center w-full min-h-screen gap-10 mt-[-50px] justify-center bg-gradient-to-r from-slate-300 to-slate-500'>
                <h1 className='text-2xl font-bold'>List Of Tenders </h1>
                <div className='bg-slate-300'>
                    <table className='table-auto border-separate border-spacing-7 max-md:border-spacing-1 border-2 border-gray-500 rounded-lg overflow-x-auto '>

                        <thead className=''>
                            <tr className=''>
                                <th className='border-black px-3'>Reference Number</th>
                                <th className='border-black px-3'>Tender Title</th>
                                <th className='border-black px-7'>Opening Date</th>
                                <th className='border-black px-7'>Closing Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='text-center'>12</td>
                                <td className='text-center'>SandalWood 100 tons Sale</td>
                                <td className='text-center'>10-2-24 2:00 pm</td>
                                <td className='text-center'>15-2-24 2:00 pm</td>
                                <td className='text-center'>
                                    <button type="submit" className='px-2 py-1 rounded-xl w-full bg-amber-400 text-base'>View</button>
                                </td>
                                <td className='text-center'>
                                    <button type="submit" className='px-2 py-1 rounded-xl w-full bg-green-300 text-base'>Delete</button>
                                </td>

                            </tr>
                            <tr>
                                <td className='text-center'>12</td>
                                <td className='text-center'>SandalWood 100 tons Sale</td>
                                <td className='text-center'>10-2-24 2:00 pm</td>
                                <td className='text-center'>15-2-24 2:00 pm</td>
                                <td className='text-center'>
                                    <button type="submit" className='px-2 py-1 rounded-xl w-full bg-amber-400 text-base'>View</button>
                                </td>
                                <td className='text-center'>
                                    <button type="submit" className='px-2 py-1 rounded-xl w-full bg-green-300 text-base'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-center'>12</td>
                                <td className='text-center'>SandalWood 100 tons Sale</td>
                                <td className='text-center'>10-2-24 2:00 pm</td>
                                <td className='text-center'>15-2-24 2:00 pm</td>
                                <td className='text-center'>
                                    <button type="submit" className='px-2 py-1 rounded-xl w-full bg-amber-400 text-base'>View</button>
                                </td>
                                <td className='text-center'>
                                    <button type="submit" className='px-2 py-1 rounded-xl w-full bg-green-300 text-base'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-center'>12</td>
                                <td className='text-center'>SandalWood 100 tons Sale</td>
                                <td className='text-center'>10-2-24 2:00 pm</td>
                                <td className='text-center'>15-2-24 2:00 pm</td>
                                <td className='text-center'>
                                    <button type="submit" className='px-2 py-1 rounded-xl w-full bg-amber-400 text-base'>View</button>
                                </td>
                                <td className='text-center'>
                                    <button type="submit" className='px-2 py-1 rounded-xl w-full bg-green-300 text-base'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-center'>12</td>
                                <td className='text-center'>SandalWood 100 tons Sale</td>
                                <td className='text-center'>10-2-24 2:00 pm</td>
                                <td className='text-center'>15-2-24 2:00 pm</td>
                                <td className='text-center'>
                                    <button type="submit" className='px-2 py-1 rounded-xl w-full bg-amber-400 text-base'>View</button>
                                </td>
                                <td className='text-center'>
                                    <button type="submit" className='px-2 py-1 rounded-xl w-full bg-green-300 text-base'>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CATenders