import { AiFillPlusSquare } from "react-icons/ai";
import Layout from '../Layout'
import React, { useState, useMemo } from 'react'
import usePlan from "./usePlan";

function Plan({ setTab }) {
  const initFormValue = {
    amount: '',
    id: 0,
  }

  const { categories, addPlanMutation } = usePlan();
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

  const handleProgress = ({ current, amount }) => {
    let percent = (current / amount) * 100;

    let bg = '';
    if (percent < 20) {
      bg = 'bg-gradient-to-r from-green-500 to-green-300';
    } else if (percent >= 20 && percent < 50) {
      bg = 'bg-gradient-to-r from-green-300 to-yellow-500';
    } else if (percent >= 50 && percent < 70) {
      bg = 'bg-gradient-to-r from-yellow-500 to-orange-500';
    } else if (percent >= 70 && percent < 90) {
      bg = 'bg-gradient-to-r from-orange-500 to-red-300';
    } else {
      bg = 'bg-gradient-to-r from-red-300 to-red-500';
    }

    return {
      percent, bg
    }
  }

  const handleSelect = (plan) => {
    setFormData({
      amount: plan.amount,
      id: plan.id,
    });
  }

  const remainingAmount = useMemo(() => {
    // Get the current date
    const currentDate = new Date();

    // Get the last day of the month
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Calculate the number of days left in the month
    const daysLeftInMonth = Math.ceil((lastDayOfMonth - currentDate) / (1000 * 60 * 60 * 24));

    // Calculate the total amount of the entire array
    const totalAmount = categories.reduce((acc, category) => acc + category.amount, 0);

    // Calculate the total current of the entire array
    const totalCurrent = categories.reduce((acc, category) => acc + category.current, 0);

    // Apply the formula and calculate the final value
    const result = Math.ceil((totalAmount - totalCurrent) / daysLeftInMonth);

    return result;
  }, [categories])

  const handleDelete = (category) => {
    addPlanMutation
      .mutate({
        id: category.id,
        amount: 0
      }, {
        onSuccess: () => {
          setError(false);
          setFormData(initFormValue);
        },
        onError: () => {
          setError(true);
        }
      })
  }

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
            {categories.length > 0 && categories.filter(item => item.amount > 0).map(category => (
              <div className="w-full p-3  justify-start">
                <div className="text-xl px-3 flex justify-between mb-3">
                  <div className="text-left">{category.name}</div>
                  <div>{category.amount.toLocaleString('vi-VN')} VND</div>
                </div>
                <div className="flex-1 flex flex-col justify-start">
                  <div className="bg-gray-300 w-full rounded-3xl flex" style={{ height: 20 }}>
                    <div className={`${handleProgress(category).bg} text-white text-center text-sm rounded-3xl`}
                      style={{ width: `${handleProgress(category).percent > 1 ? handleProgress(category).percent : 10}%`, height: 20 }}
                    >
                      {category.current.toLocaleString('vi-VN')} VND
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-between mt-1 text-center'>
                  <div className="text-left text-slate-600 italic">còn {(category.amount - category.current).toLocaleString('vi-VN')}VND</div>
                  <div>
                    <span onClick={() => handleSelect(category)} className="text-orange-400 hover:cursor-pointer">Sửa</span>
                    <span className="mx-2">|</span>
                    <span onClick={() => handleDelete(category)} className="text-red-400 hover:cursor-pointer">Xóa</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-full p-3 mt-5 border-[1px] border-gray-200 rounded-3xl text-2xl">
              <span>Gợi ý số tiền nên tiêu mỗi ngày để đạt mục tiêu cuối tháng: </span>
              <span className="text-lime-500">{remainingAmount.toLocaleString('vi-VN')}VND</span>
            </div>
          </div>

        </div>
      </div>
    </Layout >
  )
}

export default Plan