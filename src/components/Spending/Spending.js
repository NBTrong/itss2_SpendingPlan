import { AiFillPlusSquare } from "react-icons/ai";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { GrRun } from "react-icons/gr";
import Layout from '../Layout'
import React, { useState } from 'react'
import { TiDelete } from "react-icons/ti";
import useIncome from "./useSpending";

function Income({ setTab }) {
    const initFormValue = {
        note: '',
        price: '',
        date: '',
        category: '',
        id: null,
    }

    const { listIncomes, categories, addIncomeMutation, updateIncomeMutation, deleteIncomeMutation, totalPrice } = useIncome();

    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('')
    const [formData, setFormData] = useState(initFormValue);
    const [error, setError] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFilter = () => {
        return listIncomes.filter(item => {
            // Check if the name criteria does not exist or is included in the income item's name
            const nameFilter = !name || item.name.toLowerCase().includes(name.toLowerCase());

            // Check if the date criteria does not exist or matches the date of the income item
            const dateFilter = !date || item.date === date;

            // Check if the category criteria does not exist or matches the category of the income item
            const categoryFilter = !category || item.categoryId === category;

            // Return true if all criteria are met
            return nameFilter && dateFilter && categoryFilter;
        });
    }

    const handleSubmit = () => {
        if (!formData.id)
            addIncomeMutation
                .mutate(formData, {
                    onSuccess: () => {
                        setError(false);
                        setFormData(initFormValue);
                    },
                    onError: () => {
                        setError(true);
                    }
                })
        else {
            updateIncomeMutation.mutate(formData, {
                onSuccess: () => {
                    setError(false);
                    setFormData(initFormValue);
                },
                onError: () => {
                    setError(true);
                }
            });
        }
    }

    const handleSelect = (income) => {
        setFormData({
            note: income.name,
            price: income.price,
            date: income.date,
            category: income.categoryId,
            id: income.id,
        });
    }

    const handleDelete = (income) => {
        deleteIncomeMutation.mutate({
            id: income.id,
        })
    }

    return (
        <Layout tab={'spending'} setTab={setTab}>
            <div className='w-full  p-10 max-w-[1000px]'>
                <div className='text-left text-3xl font-bold'>
                    Tổng chi tiêu | <span className="text-red-500">- {totalPrice.toLocaleString('vi-VN')} VND</span>
                </div>
                <div className='grid grid-cols-3 py-10 gap-10'>
                    <div className='col-span-1 mb-3'>
                        <div className='flex flex-col items-start pb-4'>
                            <div className="mb-1">Ghi chú</div>
                            <input
                                name='note'
                                value={formData.note}
                                onChange={handleOnChange}
                                placeholder='Chưa nhập vào'
                                className='p-2 border-[1px] min-w-full outline-none rounded-lg border-gray-200 bg-slate-100'
                            />
                        </div>
                        <div className='flex flex-col items-start pb-4'>
                            <div className="mb-1">Tiền thu</div>
                            <input
                                name='price'
                                type="number"
                                value={formData.price}
                                onChange={handleOnChange}
                                placeholder='0 VND'
                                className='p-2 border-[1px] min-w-full outline-none rounded-lg border-gray-200 bg-slate-100'
                            />
                        </div>
                        <div className='flex flex-col items-start pb-4'>
                            <div className="mb-1">Ngày</div>
                            <input
                                name='date'
                                type="date"
                                value={formData.date}
                                onChange={handleOnChange}
                                className='p-2 border-[1px] min-w-full outline-none rounded-lg border-gray-200 bg-slate-100'
                            />
                        </div>
                        <div className='flex flex-col items-start pb-4'>
                            <div className="mb-1">Danh mục</div>
                            <select
                                name='category'
                                value={formData.category}
                                onChange={handleOnChange}
                                className='p-2 border-[1px] min-w-full outline-none rounded-lg border-gray-200 bg-slate-100'
                            >
                                <option value=''>Chọn danh mục</option>
                                {categories?.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {error && <span className='text-red-500 block w-full text-right'>
                            Vui lòng điền toàn bộ các mục
                        </span>}
                        <button
                            className='flex items-center text-white bg-black rounded-lg mt-5 justify-center  min-w-full py-2 text-2xl text-center'
                            onClick={handleSubmit}
                        >
                            <AiFillPlusSquare />
                            <span>Thêm</span>
                            <span>/</span>
                            <span>Sửa</span>
                        </button>
                    </div>


                    <div className="col-span-2 py-10">
                        <div className="flex items-center justify-between gap-4 mb-4">
                            <input type="text" placeholder="search by name" className="border-[1px] border-gray-200 p-2 outline-none" onChange={e => setName(e.target.value)} />
                            <input type="date" className="border-[1px] border-gray-200 p-2 outline-none" onChange={e => setDate(e.target.value)} />
                            <select
                                name='category'
                                value={category}
                                onChange={e => setCategory(Number(e.target.value))}
                                className='p-2 border-[1px] outline-none rounded-lg border-gray-200 bg-slate-100'
                            >
                                <option value=''>Chọn danh mục</option>
                                {categories?.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>

                        {handleFilter().map((filter, index) => {
                            return (
                                <div key={index} className="w-full p-3 mt-5 bg-slate-100 flex items-center border-[1px] border-gray-200 justify-start rounded-lg">
                                    <div className="text-3xl px-3">
                                        {/* <GrRun /> */}
                                        <img
                                            src={filter.categoryMetadata.icon}
                                            alt="Mô tả hình ảnh"
                                            width="30"
                                            height="30"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col items-start">
                                        <div className="flex items-center">
                                            <div className="text-green-400"><GoDotFill /></div>
                                            <div>{filter.name}</div>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="pr-3"> VND {filter.price.toLocaleString('vi-VN')}</span>
                                            <FaRegCalendarDays />
                                            <span className="pl-1 pr-3"> {filter.date}</span>
                                            <BiSolidMessageRounded />
                                            <span className="pl-1 pr-3">{filter.category}</span>
                                        </div>
                                    </div>
                                    <div className="text-3xl flex items-center">
                                        <span className="text-yellow-400 px-2 hover:cursor-pointer" onClick={() => handleSelect(filter)}>
                                            <FaRegEdit />
                                        </span>
                                        <span className="text-red-500 px-2 hover:cursor-pointer" onClick={() => handleDelete(filter)}>
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