import { BsStars } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import React from 'react'
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiSettings5Line } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import { TbTable } from "react-icons/tb";

function index({ tab, setTab, children }) {
    return (
        <div className='w-full'>
            <div className='w-[300px] h-[100vh] flex flex-col justify-between bg-cyan-950 absolute top-0 left-0 text-white p-5'>
                <div className="w-full">
                    <div className=' flex items-start justify-start'>
                        <div className='w-[70px] aspect-square overflow-hidden rounded-full '>
                            <img className='w-full h-full object-cover' src='/images/avatar.jpg' alt='avatar' />
                        </div>
                        <div className='text-left px-3 py-1 flex flex-col'>
                            <span className='font-bold'>Marry Gold</span>
                            <span className='text-sm text-gray-500'>marry@gmail.com</span>
                        </div>
                    </div>
                    <div className='py-2'></div>
                    <div className='flex items-center justify-start p-3 cursor-pointer'>
                        <div className='w-[30px] text-left text-xl'>
                            <RiUserLine />
                        </div>
                        <div>
                            Thông tin cá nhân
                        </div>
                    </div>
                    <div className='flex items-center justify-start p-3 cursor-pointer'>
                        <div className='w-[30px] text-left text-xl'>
                            <RiSettings5Line />
                        </div>
                        <div>
                            Cài đặt
                        </div>
                    </div>
                    <div className='h-[1px] border-b-white border-b-[1px] p-2 '></div>
                    <div className='flex items-center justify-start p-3 cursor-pointer mt-4'>
                        <div className='w-[30px] text-left text-xl'>
                            <TbTable />
                        </div>
                        <div>
                            Tổng quan
                        </div>
                    </div>
                    <div className='flex items-center justify-start p-3 cursor-pointer'>
                        <div className='w-[30px] text-left text-xl'>
                            <BsStars />
                        </div>
                        <div>
                            Kế hoạch chi tiêu
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            setTab('spending')
                        }}
                        className={`flex items-center justify-start p-3 cursor-pointer ${tab === 'spending' ? 'bg-cyan-600' : ''}`}>
                        <div className='w-[30px] text-left text-xl'>
                            <RiMoneyDollarCircleLine />
                        </div>
                        <div>
                            Chi tiêu
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            setTab('income')
                        }}
                        className={`flex items-center justify-start p-3 cursor-pointer ${tab === 'income' ? 'bg-cyan-600' : ''}`}>
                        <div className='w-[30px] text-left text-xl'>
                            <IoWalletOutline />
                        </div>
                        <div>
                            Thu nhập
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    <button onClick={() => setTab('login')} className="px-6 py-3 bg-cyan-900 rounded-lg">Đăng xuất</button>
                </div>
            </div>


            <div className="w-full pl-[300px]">
                {children}
            </div>
        </div >
    )
}

export default index