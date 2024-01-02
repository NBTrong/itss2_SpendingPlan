import React, { useState } from 'react'
import { register } from '../../services/api.js'
import { toast } from 'react-toastify';

function Register({ setTab }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            await register({
                email: formData.email,
                password: formData.password
            });
            toast.success("Tạo user thành công");
            setTab("login");
        } catch (error) {
            console.log(error)
            toast.error("Email đã tồn tại!!!");
        }
    }

    return (
        <div className='grid grid-cols-2 h-[100vh] mx-auto max-w-[1000px]'>
            <div className='col-span-1 h-full grid place-items-center'>
                <div className='max-w-[300px] w-full'>
                    <div className='w-full text-left pb-3 border-b-black border-b-2'>
                        <h1 className='text-3xl font-bold'>Đăng nhập</h1>
                    </div>
                    <div className='flex flex-col items-start pb-4 mt-5'>
                        <div>Email</div>
                        <input
                            name='email'
                            value={formData.email}
                            onChange={handleOnChange}
                            type='email'
                            placeholder='Example@gmail.com'
                            className='p-2 border-[1px] min-w-full outline-none rounded-lg border-black bg-slate-100' />
                    </div>
                    <div className='flex flex-col items-start pb-4'>
                        <div>Mật khẩu</div>
                        <input
                            name='password'
                            value={formData.password}
                            onChange={handleOnChange}
                            type='password' placeholder='Mật khẩu gồm ít nhất 8 ký tự' className='p-2 border-[1px] min-w-full outline-none rounded-lg border-black bg-slate-100' />
                    </div>
                    <div className='flex flex-col items-start pb-4'>
                        <div>Xác minh mật khẩu</div>
                        <input
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleOnChange}
                            type='password' placeholder='Mật khẩu gồm ít nhất 8 ký tự' className='p-2 border-[1px] min-w-full outline-none rounded-lg border-black bg-slate-100' />
                    </div>
                    <button className='py-3 w-full bg-black text-white mt-4 rounded-lg' onClick={handleSubmit}>
                        Đăng kí
                    </button>
                    <div className='text-sm text-center text-blue-500 w-full mt-4'>
                        <span className='text-black'>Đã có tài khoản?</span> <span className='font-semibold text-blue-500 cursor-pointer' onClick={() => setTab("login")}>Đăng nhập</span>
                    </div>
                </div>
            </div>
            <div className='col-span-1 grid place-items-center'>
                <img alt='login' src='/images/login.png' />
            </div>
        </div>
    )
}

export default Register;