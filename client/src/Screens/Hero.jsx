import React from 'react'
import Contract from "../Contract_Agreement.png";

const Hero = () => {
    return (
        <div className='flex flex-row ml-20 mr-24 min-w-full-2 h-[600px] max-container justify-center gap-10 max-md:flex-col max-md:mt-36'>
            <div className='relative flex flex-col space-y-7 justify-center items-start w-full'>
                <h1 className='text-4xl font-bold'>Tendering Application</h1>
                <p className='pr-20'>
                    Empowering Your Procurement Journey: Streamline Bidding, Enhance Collaboration, and Simplify Tender Management with Our Comprehensive Solution
                </p>
                <div className=''>
                    <button className='bg-orange-400 px-4 py-2 rounded-xl text-white hover:bg-orange-500'>Get Started</button>
                </div>
            </div>
            <div className='relative flex flex-col justify-center items-start w-full'>
                <img src={Contract} alt="" className='object-contain h-[700px] max-md:h-[400px] w-full' />
            </div>
        </div>
    )
}

export default Hero