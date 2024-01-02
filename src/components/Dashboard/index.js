// import { AiFillPlusSquare } from "react-icons/ai";
import Layout from "../Layout";
import React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import Chart from "chart.js/auto";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoIosOpen } from "react-icons/io";
import useIncome from "../Income/useIncome";
import useSpending from "../Spending/useSpending";
// import useSpending from "../Dashboard/useSpending";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { YearCalendar } from "@mui/x-date-pickers/YearCalendar";
import { MonthCalendar } from "@mui/x-date-pickers/MonthCalendar";
import { DateCalendar } from "@mui/x-date-pickers";
import userKeyAtom from "../../storage/userKeyAtom";
import { useRecoilState } from "recoil";
import usePlan from "../Plan/usePlan";

function Index({ setTab }) {
  const chartRef = useRef(null);
  const chartDoughnutRef = useRef(null);
  const [toggleValue, setToggleValue] = useState(0); // Thêm state cho toggle biểu đồ tròn
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // Thêm state cho tháng hiện tại
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Thêm state cho năm hiện tại
  const { listIncomes, categories } = useIncome();
  const { listIncomes: listSpending } = useSpending();
  const [newArr, setNewArr] = useState([]);
  const [total, setTotal] = useState(0);
  const [name, setName] = useState("");
  const { allCategories } = usePlan();
  const [chosen, setChosen] = useState(0);
  const [income, setIncome] = useState(null);
  const [spending, setSpending] = useState(null);
  const checkUserKey = useCallback(() => {
    let _userKey = localStorage.getItem("name");
    setName(_userKey);
  }, [setName]);

  useEffect(() => {
    checkUserKey();
  }, [checkUserKey]);

  const updateChart = async (
    listIncomes,
    listSpending,
    chosen,
    month,
    year
  ) => {
    let dataSet = Array.from({ length: 12 }, (_, index) => ({
      month: index + 1,
      year: new Date().getFullYear(),
      count: 0,
      income: 0,
    }));
    // ----------------- PIE CHART -----------------
    let data = new Array(allCategories.length);
    let labels = new Array(allCategories.length);

    let doughnutIncomes = listIncomes;
    let doughnutSpending = listSpending;
    if (month) {
      doughnutIncomes = listIncomes.filter(
        (item) =>
          new Date(item.date).getMonth() + 1 == month &&
          new Date(item.date).getFullYear() === year
      );
      doughnutSpending = listSpending.filter(
        (item) =>
          new Date(item.date).getMonth() + 1 == month &&
          new Date(item.date).getFullYear() === year
      );
    }

    if (chosen === 1) {
      for (var i = 0; i < data.length; i++) {
        data[i] = doughnutSpending
          .filter((n) => n.categoryId == allCategories[i].id)
          .reduce((sum, month) => sum + month.price, 0);
        labels[i] = allCategories[i].name;
      }
    } else {
      data = new Array(categories.length);
      labels = new Array(categories.length);
      for (var i = 0; i < data.length; i++) {
        data[i] = doughnutIncomes
          .filter((n) => n.categoryId == categories[i].id)
          .reduce((sum, month) => sum + month.price, 0);
        labels[i] = categories[i].name;
      }
    }

    // ----------------- LINE GRAPH -----------------
    // Lặp qua từng đối tượng trong mảng dữ liệu
    for (const item of listSpending) {
      // Trích xuất tháng từ ngày trong đối tượng
      const month = new Date(item.date).getMonth() + 1;
      const year = new Date(item.date).getFullYear();

      // Cập nhật tổng giá trị cho tháng tương ứng
      dataSet[month - 1].count += item.price;
      dataSet[month - 1].year = year;
    }

    for (const item of listIncomes) {
      // Trích xuất tháng từ ngày trong đối tượng
      const month = new Date(item.date).getMonth() + 1;
      const year = new Date(item.date).getFullYear();

      // Cập nhật tổng giá trị cho tháng tương ứng
      dataSet[month - 1].income += item.price;
      dataSet[month - 1].year = year;
    }

    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy existing chart if it exists
    }

    chartRef.current = new Chart(document.getElementById("acquisitions"), {
      type: "line",
      data: {
        labels: dataSet.map((row) => row.month),
        datasets: [
          {
            label: "Thu nhập",
            data: dataSet.map((row) => {
              return row.year === year ? row.income : 0;
            }),
            fill: false, // To display an unfilled line
            borderColor: "green", // Line color
            tension: 0.1, // Line tension (0 for straight lines)
          },
          {
            label: "Chi tiêu",
            data: dataSet.map((row) => {
              return row.year === year ? row.count : 0;
            }),
            fill: false, // To display an unfilled line
            borderColor: "red", // Line color
            tension: 0.1, // Line tension (0 for straight lines)
          },
        ],
      },
    });

    // Tính tổng giá trị của tất cả các tháng
    const totalOfAllMonthsIncome = dataSet.reduce(
      (sum, row) => sum + row.income,
      0
    );
    const totalOfAllMonthsSpending = dataSet.reduce(
      (sum, row) => sum + row.count,
      0
    );
    setTotal(totalOfAllMonthsIncome - totalOfAllMonthsSpending);
    const dataDoughnut = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "dodgerBlue",
            "orange",
            "tomato",
            "MediumSeaGreen",
            "violet",
          ],
          hoverOffset: 4,
        },
      ],
    };

    if (chartDoughnutRef.current) {
      chartDoughnutRef.current.destroy(); // Destroy existing chart if it exists
    }

    chartDoughnutRef.current = new Chart(document.getElementById("doughnut"), {
      type: "doughnut",
      data: dataDoughnut,
    });
  };
  useEffect(() => {
    if (categories && allCategories) {
      // Set default bảng transaction là tháng năm hiện tại
      let allItem = [...listIncomes, ...listSpending];
      let arr = allItem.filter(
        (item) =>
          new Date(item.date).getMonth() + 1 == currentMonth &&
          new Date(item.date).getFullYear() === currentYear
      );
      setNewArr(arr);

      // Set default 2 biểu đồ là tháng năm hiện tại
      updateChart(
        listIncomes,
        listSpending,
        toggleValue,
        currentMonth,
        currentYear
      );
      setIncome(listIncomes);
      setSpending(listSpending);
    }
  }, [listSpending, listIncomes]);
  const formatMoney = (amount) => {
    const formattedAmount = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
    return formattedAmount;
  };
  const handleChange = (date) => {
    let month = Number(date.split("-")[1]);
    let year = Number(date.split("-")[0]);
    let allItem = [...listIncomes, ...listSpending];
    let arr = allItem.filter(
      (item) =>
        new Date(item.date).getMonth() + 1 == month &&
        new Date(item.date).getFullYear() === year
    );
    let incomes = listIncomes.filter(
      (item) =>
        new Date(item.date).getMonth() + 1 == month &&
        new Date(item.date).getFullYear() === year
    );
    let spending = listSpending.filter(
      (item) =>
        new Date(item.date).getMonth() + 1 == month &&
        new Date(item.date).getFullYear() === year
    );
    setIncome(listIncomes);
    setSpending(listSpending);
    setNewArr(arr);
    setCurrentMonth(month);
    setCurrentYear(year);
    updateChart(listIncomes, listSpending, toggleValue, month, year);
  };

  const changeValue = (e, month, year) => {
    setToggleValue(Number(e));
    updateChart(income, spending, Number(e), month, year);
  };

  return (
    <Layout tab={"dashboard"} setTab={setTab}>
      <div className="w-full px-10">
        <div className="grid grid-cols-2 mt-5 gap-10">
          <div className="col-span-1 mb-3">
            <canvas id="acquisitions"></canvas>
          </div>
          <div className="col-span-1 ml-5 mt-5 flex justify-center items-center">
            <input
              type="month"
              // className="border-[1px] border-gray-200 p-2 outline-none"
              defaultValue={`${currentYear}-${
                currentMonth < 10 ? `0${currentMonth}` : currentMonth
              }`}
              className="border-[1px] border-gray-200 p-2 outline-none"
              onChange={(e) => handleChange(e.target.value)}
            />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["MonthCalendar"]}>
                <DemoItem>
                  <DateCalendar
                    views={["month", "year"]}
                    onChange={(newValue) => handleChange(newValue)}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider> */}
          </div>
          <div className="col-span-1 mb-3 border-[1px] rounded-lg border-black">
            <div className="pb-4 p-5">
              <div className="flex justify-between mb-4">
                <div>Thu - Chi</div>
                <div size={50}>
                  <IoIosOpen />
                </div>
              </div>
              <div className="h-[40vh] overflow-y-auto">
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

                {newArr
                  ?.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA;
                  })
                  .map((item, index) => {
                    if (item.categoryMetadata.status == "incomes") {
                      return (
                        <div
                          className="flex justify-between items-center"
                          key={index}
                        >
                          <div className="text-left">
                            <div className="text-xl font-semibold text-left">
                              {item.name}
                            </div>
                            <div className="text-gray-400">{item.date}</div>
                          </div>
                          <div className="text-xl text-green-700 font-semibold">
                            {formatMoney(item.price)}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="flex justify-between items-center">
                          <div className="text-left">
                            <div className="text-xl font-semibold text-left">
                              {item.name}
                            </div>
                            <div className="text-gray-400">{item.date}</div>
                          </div>
                          <div className="text-xl text-red-700 font-semibold">
                            {formatMoney(item.price)}
                          </div>
                        </div>
                      );
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
          <div className="col-span-1 ml-5 flex justify-center items-start">
            <div className="flex flex-col justify-center items-center">
              <div style={{ width: 300, height: 300, marginTop: -20 }}>
                <canvas
                  id="doughnut"
                  style={{ width: 300, height: 300 }}
                ></canvas>
              </div>
              <div className="w-[400px] p-3 mt-3 border-[1px] px-10 border-gray-200 rounded-3xl text-left">
                <div className="text-gray-400">Tổng số tài sản hiện tại</div>
                <div className="text-3xl font-semibold">
                  {formatMoney(total)}
                </div>
              </div>
            </div>
            <select
              onChange={(e) =>
                changeValue(e.target.value, currentMonth, currentYear)
              }
            >
              <option value={0}>Thu</option>
              <option value={1}>Chi</option>
            </select>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
