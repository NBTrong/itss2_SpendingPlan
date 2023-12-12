import React from 'react'

function index() {
    return (
        <div className='grid grid-cols-2 h-[100vh] mx-auto max-w-[1000px]'>
            <div className='col-span-1 h-full grid place-items-center'>
                <form className='max-w-[300px] w-full'>
                    <div className='w-full text-left pb-3 border-b-black border-b-2'>
                        <h1 className='text-3xl font-bold'>Đăng nhập</h1>
                    </div>
                    <div className='flex flex-col items-start pb-4 mt-5'>
                        <div>Email</div>
                        <input placeholder='Example@gmail.com' className='p-2 border-[1px] min-w-full outline-none rounded-lg border-black bg-slate-100' />
                    </div>
                    <div className='flex flex-col items-start pb-4'>
                        <div>Mật khẩu</div>
                        <input placeholder='Mật khẩu gồm ít nhất 8 ký tự' className='p-2 border-[1px] min-w-full outline-none rounded-lg border-black bg-slate-100' />
                    </div>
                    <div className='text-sm text-right text-blue-500 w-full'>
                        Quên mật khẩu
                    </div>
                    <button className='py-3 w-full bg-black text-white mt-4 rounded-lg'>
                        Đăng nhập
                    </button>
                    <div className='text-sm text-center text-blue-500 w-full mt-4'>
                        <span className='text-black'>Chưa có tài khoản?</span> <span className='font-semibold text-blue-500'>Đăng ký</span>
                    </div>
                </form>
            </div>
            <div className='col-span-1 grid place-items-center'>
                <img alt='login' src='/images/login.png' />
            </div>
        </div>
    )
}

export default index