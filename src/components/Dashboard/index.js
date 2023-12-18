import { AiFillPlusSquare } from "react-icons/ai";
import Layout from '../Layout'
import React from 'react'
import { useEffect,useRef,useState  } from 'react';
import Chart from 'chart.js/auto';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IoIosOpen } from "react-icons/io";

function Index({ setTab }) {
    const chartRef = useRef(null);
    const chartDoughnutRef = useRef(null);
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        (async function () {
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
              labels: data.map(row => row.year),
              datasets: [
                {
                    label: 'Thu nhập',
                    data: data.map(row => row.count),
                    fill: false, // To display an unfilled line
                    borderColor: 'green', // Line color
                    tension: 0.1, // Line tension (0 for straight lines)
                  },
                  {
                    label: 'Chi tiêu',
                    data: data.map(row => row.income),
                    fill: false, // To display an unfilled line
                    borderColor: 'red', // Line color
                    tension: 0.1, // Line tension (0 for straight lines)
                  },
              ],
            },
          });

          const dataDoughnut = {
            labels: ['Thu', 'Chi'],
            datasets: [{
              label: 'My First Dataset',
              data: [75, 25],
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
      }, []);
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
                            <div className="flex justify-between justify-between items-center">
                                <div className="text-left">
                                    <div className="text-xl font-semibold text-left">Spotify</div>
                                    <div className="text-gray-400">4h 15/04/2023</div>
                                </div>
                                <div className="text-xl text-red-700 font-semibold">35.000VND</div>
                            </div>
                            <div className="flex justify-between justify-between items-center">
                                <div className="text-left">
                                    <div className="text-xl font-semibold text-left">Mua sữa tắm</div>
                                    <div className="text-gray-400">5h 16/04/2023</div>
                                </div>
                                <div className="text-xl text-red-700 font-semibold">200.000VND</div>
                            </div>
                            <div className="flex justify-between justify-between items-center">
                                <div className="text-left">
                                    <div className="text-xl font-semibold text-left">Bố Cho tiền</div>
                                    <div className="text-gray-400">22h 18/04/2023</div>
                                </div>
                                <div className="text-xl text-green-700 font-semibold">2.000.000VND</div>
                            </div>
                            <div className="flex justify-between justify-between items-center">
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
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 ml-5">
                        <div style={{width:300, height:300, marginTop:-20}}>
                            <canvas id="doughnut" style={{width:300, height:300}}></canvas>
                        </div>
                        <div className="w-[400px] p-3 mt-3 border-[1px] px-10 border-gray-200 rounded-3xl text-left">
                            <div className="text-gray-400">Tổng số tài sản hiện tại</div>
                            <div className="text-3xl font-semibold">2.500.000VND</div>
                            <div className="text-lime-500">+8.00%</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Index