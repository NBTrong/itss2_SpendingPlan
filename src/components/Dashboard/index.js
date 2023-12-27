// import { AiFillPlusSquare } from "react-icons/ai";
import Layout from '../Layout'
import React from 'react'
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoIosOpen } from "react-icons/io";
import useIncome from '../Income/useIncome';
import useSpending from '../Spending/useSpending';
// import useSpending from "../Dashboard/useSpending";

function Index({ setTab }) {
  const chartRef = useRef(null);
  const chartDoughnutRef = useRef(null);
  const [value, onChange] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(null); // Thêm state cho tháng hiện tại
  const { listIncomes } = useIncome()
  const { listIncomes: listSpending } = useSpending()
  const [newArr, setNewArr] = useState([])
  const [total, setTotal] = useState(0)
  
  console.log(listIncomes, listSpending);
  useEffect(() => {
    (async function () {
      setNewArr([...listIncomes, ...listSpending])
      // Tạo một mảng với 12 tháng ban đầu
      let months = Array.from({ length: 12 }, (_, index) => ({
        month: index + 1,
        count: 0,
        income: 0
      }));

      // Lặp qua từng đối tượng trong mảng dữ liệu
      for (const item of listSpending) {
        // Trích xuất tháng từ ngày trong đối tượng
        const month = new Date(item.date).getMonth() + 1;

        // Cập nhật tổng giá trị cho tháng tương ứng
        months[month - 1].count += item.price;
      }

      for (const item of listIncomes) {
        // Trích xuất tháng từ ngày trong đối tượng
        const month = new Date(item.date).getMonth() + 1;

        // Cập nhật tổng giá trị cho tháng tương ứng
        months[month - 1].income += item.price;
      }

      console.log(months);

      const data = [
        { year: 2010, count: 30, income: 15 },
        { year: 2011, count: 40, income: 20 },
        { year: 2012, count: 55, income: 25 },
        { year: 2013, count: 65, income: 30 },
        { year: 2014, count: 72, income: 35 },
        { year: 2015, count: 80, income: 40 },
        { year: 2016, count: 98, income: 45 },
      ];

      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy existing chart if it exists
      }

      chartRef.current = new Chart(document.getElementById('acquisitions'), {
        type: 'line',
        data: {
          labels: months.map(row => row.month),
          datasets: [
            {
              label: 'Thu nhập',
              data: months.map(row => row.income),
              fill: false, // To display an unfilled line
              borderColor: 'green', // Line color
              tension: 0.1, // Line tension (0 for straight lines)
            },
            {
              label: 'Chi tiêu',
              data: months.map(row => row.count),
              fill: false, // To display an unfilled line
              borderColor: 'red', // Line color
              tension: 0.1, // Line tension (0 for straight lines)
            },
          ],
        },
      });

      // Tính tổng giá trị của tất cả các tháng
      const totalOfAllMonthsIncome = months.reduce((sum, month) => sum + month.income, 0);
      const totalOfAllMonthsSpending = months.reduce((sum, month) => sum + month.count, 0);
      setTotal(totalOfAllMonthsIncome - totalOfAllMonthsSpending)
      const dataDoughnut = {
        labels: ['Thu', 'Chi'],
        datasets: [{
          label: 'My First Dataset',
          data: [totalOfAllMonthsIncome, totalOfAllMonthsSpending],
          backgroundColor: ['green', 'red'],
          hoverOffset: 4,
        }],
      };

      if (chartDoughnutRef.current) {
        chartDoughnutRef.current.destroy(); // Destroy existing chart if it exists
      }

      chartDoughnutRef.current = new Chart(document.getElementById('doughnut'), {
        type: 'doughnut',
        data: dataDoughnut,
      });

    })();
  }, [listSpending, listIncomes]);

  return (
    <Layout tab={'dashboard'} setTab={setTab}>
      <div className='text-center text-3xl font-bold mt-10'>
        Xin chào Ma Li Sa
      </div>
      <div className='w-full px-10'>
        <div className='grid grid-cols-2 mt-5 gap-10'>
          <div className='col-span-1 mb-3'>
            <canvas id="acquisitions"></canvas>
          </div>
          <div className="col-span-1 ml-5 mt-5">
            <Calendar onChange={onChange} value={value} />
          </div>
          <div className='col-span-1 mb-3 border-[1px] rounded-lg border-black'>
            <div className='pb-4 p-5'>
              <div className="flex justify-between justify-between mb-4">
                <div>Thu - Chi</div>
                <div size={50}><IoIosOpen /></div>
              </div>
              <div className='h-[30vh] overflow-y-auto'>
                {/* {listSpending?.map(item => {
                  return (
                    <div className="flex justify-between justify-between items-center">
                      <div className="text-left">
                        <div className="text-xl font-semibold text-left">{item.name}</div>
                        <div className="text-gray-400">{item.date}</div>
                      </div>
                      <div className="text-xl text-red-700 font-semibold">{item.price}</div>
                    </div>
                  )
                })}

                {listIncomes?.map(item => {
                  return (
                    <div className="flex justify-between justify-between items-center">
                      <div className="text-left">
                        <div className="text-xl font-semibold text-left">{item.name}</div>
                        <div className="text-gray-400">{item.date}</div>
                      </div>
                      <div className="text-xl text-green-700 font-semibold">{item.price}</div>
                    </div>
                  )
                })} */}

                {newArr?.sort((a, b) => {
                  const dateA = new Date(a.date);
                  const dateB = new Date(b.date);
                  return dateB - dateA;
                }).map(item => {
                  if(item.categoryMetadata.status == "incomes") {
                    return (
                      <div className="flex justify-between justify-between items-center">
                        <div className="text-left">
                          <div className="text-xl font-semibold text-left">{item.name}</div>
                          <div className="text-gray-400">{item.date}</div>
                        </div>
                        <div className="text-xl text-green-700 font-semibold">{item.price}</div>
                      </div>
                    )
                  }else {
                    return (
                      <div className="flex justify-between justify-between items-center">
                        <div className="text-left">
                          <div className="text-xl font-semibold text-left">{item.name}</div>
                          <div className="text-gray-400">{item.date}</div>
                        </div>
                        <div className="text-xl text-red-700 font-semibold">{item.price}</div>
                      </div>
                    )
                  }
                })}
                

              </div>
              {/* <div className="flex justify-between justify-between items-center">
                <div className="text-left">
                  <div className="text-xl font-semibold text-left">A trả tiền vay</div>
                  <div className="text-gray-400">10h 20/04/2023</div>
                </div>
                <div className="text-xl text-green-700 font-semibold">500.000VND</div>
              </div>
              <div className="flex justify-between justify-between items-center">
                <div className="text-left">
                  <div className="text-xl font-semibold text-left">Ăn ngoài</div>
                  <div className="text-gray-400">12h 20/04/2023</div>
                </div>
                <div className="text-xl text-red-700 font-semibold">30.000VND</div>
              </div>
              <div className="flex justify-between justify-between items-center">
                <div className="text-left">
                  <div className="text-xl font-semibold text-left">B trả tiền vay</div>
                  <div className="text-gray-400">12h 23/04/2023</div>
                </div>
                <div className="text-xl text-green-700 font-semibold">500.000VND</div>
              </div> */}
            </div>
          </div>
          <div className="col-span-1 ml-5">
            <div style={{ width: 300, height: 300, marginTop: -20 }}>
              <canvas id="doughnut" style={{ width: 300, height: 300 }}></canvas>
            </div>
            <div className="w-[400px] p-3 mt-3 border-[1px] px-10 border-gray-200 rounded-3xl text-left">
              <div className="text-gray-400">Tổng số tài sản hiện tại</div>
              <div className="text-3xl font-semibold">{total} <sup>đ</sup></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Index