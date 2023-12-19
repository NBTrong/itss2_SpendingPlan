import { AiFillPlusSquare } from "react-icons/ai";
import Layout from '../Layout'
import React, { useState } from 'react'
import usePlan from "./usePlan";

function Plan({ setTab }) {
  const initFormValue = {
    amount: '',
    id: 0,
  }

  const { categories, addPlanMutation, deleteIncomeMutation } = usePlan();
  const [formData, setFormData] = useState(initFormValue);
  const [error, setError] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    addPlanMutation
      .mutate(formData, {
        onSuccess: () => {
          setError(false);
          setFormData(initFormValue);
        },
        onError: () => {
          setError(true);
        }
      })
  }

  // const handleSelect = (income) => {
  //   setFormData({
  //     note: income.name,
  //     price: income.price,
  //     date: income.date,
  //     category: income.categoryId,
  //     id: income.id,
  //   });
  // }

  // const handleDelete = (income) => {
  //   deleteIncomeMutation.mutate({
  //     id: income.id,
  //   })
  // }

  return (
    <Layout tab={'plan'} setTab={setTab}>
      <div className='w-full  p-10 max-w-[1000px]'>
        <div className='text-left text-3xl font-bold'>
          Tạo kế hoạch chi tiêu
        </div>
        <div className='grid grid-cols-3 py-10 gap-10'>
          <div className='col-span-1 mb-3'>
            <div className='flex flex-col items-start pb-4'>
              <div className="mb-1">Tiền chi</div>
              <input
                name='amount'
                type="number"
                value={formData.amount}
                onChange={handleOnChange}
                placeholder='0 VND'
                className='p-2 border-[1px] min-w-full outline-none rounded-lg border-gray-200 bg-slate-100'
              />
            </div>
            <div className='flex flex-col items-start pb-4'>
              <div className="mb-1">Danh mục</div>
              <select
                name='id'
                value={formData.id}
                onChange={handleOnChange}
                className='p-2 border-[1px] min-w-full outline-none rounded-lg border-gray-200 bg-slate-100'
              >
                <option value={0}>Chọn danh mục</option>
                {categories?.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>{item.name}</option>
                  )
                })}
              </select>
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
          </div>


          <div className="col-span-2 ml-5">
            <div className="w-full p-3  justify-start">
              <div className="text-xl px-3 flex justify-between mb-3">
                <div className="text-left">Tiền ăn</div>
                <div>4.000.000 VND</div>
              </div>
              <div className="flex-1 flex flex-col justify-start">
                <div className="bg-gray-300 w-full rounded-3xl flex" style={{ height: 20 }}>
                  <div className="bg-green-500 text-white text-center rounded-3xl" style={{ width: '55%', height: 20 }}>2.000.000 VND</div>
                  <div style={{ marginTop: -3, marginLeft: 130 }}>|</div>
                </div>
                <div className="text-left mt-3 text-slate-600 italic">còn 1.500.000VND</div>
              </div>
              <div className='flex items-center justify-end text-center'>
                <span className="text-orange-400">Sửa</span>
                <span className="mx-2">|</span>
                <span className="text-red-400">Xóa</span>
              </div>
            </div>
            <div className="w-full p-3  justify-start">
              <div className="text-xl px-3 flex justify-between mb-3">
                <div>Chăm sóc y tế</div>
                <div>8.000.000 VND</div>
              </div>
              <div className="flex-1 flex flex-col justify-start">
                <div className="bg-gray-300 w-full rounded-3xl flex" style={{ height: 20 }}>
                  <div className="bg-red-500 text-white text-center rounded-3xl" style={{ width: '85%', height: 20 }}>7.000.000VND</div>
                  <div style={{ marginTop: -3, marginLeft: -40 }}>|</div>
                </div>
                <div className="text-left mt-3 text-slate-600 italic">quá 500.000VND</div>
              </div>
              <div className='flex items-center justify-end text-center'>
                <span className="text-orange-400">Sửa</span>
                <span className="mx-2">|</span>
                <span className="text-red-400">Xóa</span>
              </div>
            </div>
            <div className="w-full p-3  justify-start">
              <div className="text-xl px-3 flex justify-between mb-3">
                <div>Quần áo</div>
                <div>5.000.000 VND</div>
              </div>
              <div className="flex-1 flex flex-col justify-start">
                <div className="bg-gray-300 w-full rounded-3xl flex" style={{ height: 20 }}>
                  <div className="bg-orange-500 text-white text-center rounded-3xl" style={{ width: '60%', height: 20 }}>3.5000.000</div>
                  <div style={{ marginTop: -3, marginLeft: 100 }}>|</div>
                </div>
                <div className="text-left mt-3 text-slate-600 italic">còn 1.000.000VND</div>
              </div>
              <div className='flex items-center justify-end text-center'>
                <span className="text-orange-400">Sửa</span>
                <span className="mx-2">|</span>
                <span className="text-red-400">Xóa</span>
              </div>
            </div>
            <div className="w-full p-3 mt-5 border-[1px] border-gray-200 rounded-3xl text-3xl">
              <span>Gợi ý số tiền nên tiêu mỗi tháng để đạt mục tiêu cuối tháng: </span>
              <span className="text-lime-500">100.000VND</span>
            </div>
          </div>

        </div>
      </div>
    </Layout >
  )
}

export default Plan