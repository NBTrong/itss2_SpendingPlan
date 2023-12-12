import { AiFillPlusSquare } from "react-icons/ai";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { GrRun } from "react-icons/gr";
import Layout from '../Layout'
import React, { useState } from 'react'
import { TiDelete } from "react-icons/ti";

function Income({ setTab }) {
    const listIncome = [
        {
          name: "Lương",
          date: "2023-07-20",
          price: 10000000,
          category: "Lương cứng",
        },
        {
          name: "Hoa hồng",
          date: "2023-07-21",
          price: 5000000,
          category: "Hoa hồng dự án A",
        },
        {
          name: "Tiền thưởng",
          date: "2023-07-22",
          price: 2000000,
          category: "Tiền thưởng cuối năm",
        },
        {
          name: "Chuyển khoản",
          date: "2023-07-23",
          price: 1000000,
          category: "Chuyển khoản từ người thân",
        },
        {
          name: "Quà tặng",
          date: "2023-07-24",
          price: 500000,
          category: "Quà tặng sinh nhật",
        },
      ];
    const [filters, setFilters] = useState(listIncome)
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')

    const handleFilter = () => {
        let newArray = listIncome.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
        newArray = newArray.filter(item => item.category.toLowerCase().includes(category.toLowerCase()))
        newArray = newArray.filter(item => item.date.toLowerCase().includes(date.toLowerCase()))
        return newArray
    }
    return (
        <Layout tab={'income'} setTab={setTab}>
            <div className='w-full  p-10 max-w-[1000px]'>
                <div className='text-left text-3xl font-bold'>
                    Tổng thu nhập | <span className="text-green-500">+ 500.000 VND</span>
                </div>
                <div className='grid grid-cols-3 py-10 gap-10'>
                    <div className='col-span-1 mb-3'>
                        <div className='flex flex-col items-start pb-4'>
                            <div>Ghi chú</div>
                            <input placeholder='Chưa nhập vào' className='p-2 border-[1px] min-w-full outline-none rounded-lg border-black bg-slate-100' />
                        </div>
                        <div className='flex flex-col items-start pb-4'>
                            <div>Tiền thu</div>
                            <input placeholder='0 VND' className='p-2 border-[1px] min-w-full outline-none rounded-lg border-black bg-slate-100' />
                        </div>
                        <div className='flex flex-col items-start pb-4'>
                            <div>Ngày</div>
                            <input placeholder='22/11/2023' className='p-2 border-[1px] min-w-full outline-none rounded-lg border-black bg-slate-100' />
                        </div>
                        <div className='flex flex-col items-end pb-4'>
                            <div>Danh mục</div>
                            <select className='p-2 border-[1px] outline-none rounded-lg border-black bg-slate-100'>
                                <option selected>Tiền lương</option>
                            </select>
                        </div>
                        <span className='text-red-500 block w-full text-right'>
                            Nhập toàn bộ các mục
                        </span>
                        <button className='flex items-center text-white bg-black rounded-lg mt-5 justify-center  min-w-full py-2 text-2xl text-center'>
                            <AiFillPlusSquare />
                            <span>Thêm</span>
                            <span>/</span>
                            <span>Sửa</span>
                        </button>
                    </div>


                    <div className="col-span-2 py-10">
                        <div className="flex items-center justify-between gap-4 mb-4">
                            <input type="text" placeholder="search by name" className="border-[1px] border-gray-200 p-2 outline-none" onChange={e => setName(e.target.value)}/>
                            <input type="date" className="border-[1px] border-gray-200 p-2 outline-none" onChange={e => setDate(e.target.value)} />
                            <input type="text" placeholder="search by category" className="border-[1px] border-gray-200 p-2 outline-none" onChange={e => setCategory(e.target.value)} />
                        </div>

                        {handleFilter().map((filter, index) => {
                            return(
                                <div key={index} className="w-full p-3 mt-5 bg-slate-100 flex items-center border-[1px] border-gray-200 justify-start rounded-lg">
                                    <div className="text-3xl px-3">
                                        <GrRun />
                                    </div>
                                    <div className="flex-1 flex flex-col items-start">
                                        <div className="flex items-center">
                                            <div className="text-green-400"><GoDotFill /></div>
                                            <div>{filter.name}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="pr-3"> VND {filter.price}</span>
                                            <FaRegCalendarDays />
                                            <span className="pr-3"> {filter.date}</span>
                                            <BiSolidMessageRounded />
                                            <span>{filter.category}</span>
                                        </div>
                                    </div>
                                    <div className="text-3xl flex items-center">
                                        <span className="text-yellow-400 px-2">
                                            <FaRegEdit />
                                        </span>
                                        <span className="text-red-500 px-2">
                                            <TiDelete />
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Income