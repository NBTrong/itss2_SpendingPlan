import { AiFillPlusSquare } from "react-icons/ai";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import Layout from "../Layout";
import { MdLocalHospital } from "react-icons/md";
import React from "react";
import { TiDelete } from "react-icons/ti";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import InfiniteScroll from "react-infinite-scroll-component";

function Index({ setTab }) {
  const listOutcome = [
    {
      name: "Mua sắm",
      date: "2023-07-20",
      price: 10000000,
      category: "Chi phí sinh hoạt",
      status: "outcome",
    },
    {
      name: "Đi ăn",
      date: "2023-07-21",
      price: 5000000,
      category: "Chi phí giải trí",
      status: "outcome",
    },
    {
      name: "Du lịch",
      date: "2023-07-22",
      price: 2000000,
      category: "Chi phí tiết kiệm",
      status: "outcome",
    },
    {
      name: "Tiền điện",
      date: "2023-07-23",
      price: 1000000,
      category: "Chi phí cố định",
      status: "outcome",
    },
    {
      name: "Tiền nước",
      date: "2023-07-24",
      price: 500000,
      category: "Chi phí bất ngờ",
      status: "outcome",
    },
    {
      name: "Lương",
      date: "2023-07-20",
      price: 10000000,
      category: "Lương cứng",
      status: "income",
    },
    {
      name: "Hoa hồng",
      date: "2023-07-21",
      price: 5000000,
      category: "Hoa hồng dự án A",
      status: "income",
    },
    {
      name: "Tiền thưởng",
      date: "2023-07-22",
      price: 2000000,
      category: "Tiền thưởng cuối năm",
      status: "income",
    },
    {
      name: "Chuyển khoản",
      date: "2023-07-23",
      price: 1000000,
      category: "Chuyển khoản từ người thân",
      status: "income",
    },
    {
      name: "Quà tặng",
      date: "2023-07-24",
      price: 500000,
      category: "Quà tặng sinh nhật",
      status: "income",
    },
  ];
  const [filters, setFilters] = useState(listOutcome);
  const [name, setName] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [isDivVisible, setIsDivVisible] = useState(true);
  const [outcome, setoutcome] = useState(0);

  const calculateTotalOutcome = (items) => {
    return items.reduce((accumulator, item) => accumulator + item.price, 0);
  };
  useEffect(() => {
    const filteredItems = handleFilter();
    const totaloutcome = calculateTotalOutcome(filteredItems);
    setoutcome(totaloutcome);
  }, [name, dateFrom, dateTo, category]);

  const handleFilter = () => {
    let newArray = listOutcome.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
    newArray = newArray.filter((item) =>
      item.category.toLowerCase().includes(category.toLowerCase())
    );
    newArray = newArray.filter((item) =>
      item.status.toLowerCase().includes(status.toLowerCase())
    );
    if (dateFrom && dateTo) {
      newArray = newArray.filter((item) => {
        const itemDate = new Date(item.date);
        const fromDate = new Date(dateFrom);
        const toDate = new Date(dateTo);
        return itemDate >= fromDate && itemDate <= toDate;
      });
    }
    return newArray;
  };
  const [visibleItems, setVisibleItems] = useState(
    new Array(handleFilter().length).fill(true)
  );
  const popup = (index) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure to delete this item?",
      icon: "warning",
      dangerMode: true,
      buttons: {
        cancel: "Cancel",
        confirm: "Delete",
      },
    }).then((willDelete) => {
      if (willDelete) {
        // Create a copy of the current listOutcome
        const updatedlistOutcome = [...listOutcome];

        // Remove the item at the specified index
        updatedlistOutcome.splice(index, 1);

        // Update the state with the new array
        setFilters(updatedlistOutcome);

        const updatedVisibleItems = [...visibleItems];
        updatedVisibleItems[index] = false;
        setVisibleItems(updatedVisibleItems);
        swal("Deleted!", "Delete Successfully!", "success");
      } else {
        swal("Cancelled", "Your item is safe :)", "info");
      }
    });
  };
  const fetchMoreData = async () => {
    try {
      // Simulating an API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock new data
      const newData = [
        {
          name: "New Item 1",
          date: "2023-08-01",
          price: 15000000,
          category: "Bonus",
        },
        {
          name: "New Item 2",
          date: "2023-08-02",
          price: 8000000,
          category: "Gift",
        },
        // Add more items as needed
      ];

      // Update the state to append new data
      setFilters((prevData) => [...prevData, ...newData]);

      // Mock updating visible items
      const updatedVisibleItems = [...visibleItems, true, true]; // Add more "true" values based on your data
      setVisibleItems(updatedVisibleItems);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };
  return (
    <Layout tab={"spending"} setTab={setTab}>
      <div className="w-full  p-10 max-w-[1200px]">
        <div className="text-left text-3xl font-bold">
          Tổng chi tiêu |{" "}
          <span className="text-red-500">
            - {calculateTotalOutcome(handleFilter())} VND
          </span>
        </div>
        <div className="grid grid-cols-3 py-10 gap-10">
          <div className="col-span-1 mb-3">
            <div className="flex flex-col items-start pb-4">
              <div>Ghi chú</div>
              <input
                placeholder="Chưa nhập vào"
                className="p-2 border-[1px] min-w-full outline-none rounded-lg border-black bg-slate-100"
              />
            </div>
            <div className="flex flex-col items-start pb-4">
              <div>Tiền thu</div>
              <input
                placeholder="0 VND"
                className="p-2 border-[1px] min-w-full outline-none rounded-lg border-black bg-slate-100"
              />
            </div>
            <div className="flex flex-col items-start pb-4">
              <div>Ngày</div>
              <input
                placeholder="22/11/2023"
                className="p-2 border-[1px] min-w-full outline-none rounded-lg border-black bg-slate-100"
              />
            </div>
            <div className="flex flex-col items-end pb-4">
              <div>Danh mục</div>
              <select className="p-2 border-[1px] outline-none rounded-lg border-black bg-slate-100">
                <option selected>Quần áo</option>
              </select>
            </div>
            <span className="text-red-500 block w-full text-right">
              Nhập toàn bộ các mục
            </span>
            <button className="flex items-center text-white bg-black rounded-lg mt-5 justify-center  min-w-full py-2 text-2xl text-center">
              <AiFillPlusSquare />
              <span>Thêm</span>
              <span>/</span>
              <span>Sửa</span>
            </button>
          </div>

          <div className="col-span-2 py-10">
            <div className="flex items-center justify-between gap-4 mb-4 grid grid-cols-3">
              <input
                type="text"
                placeholder="search by name"
                className="border-[1px] border-gray-200 p-2 outline-none col-span-1"
                onChange={(e) => setName(e.target.value)}
              />
              <select
                name="category"
                id=""
                className="border-[1px] border-gray-200 p-2 outline-none col-span-1"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Chi phí sinh hoạt">Chi phí sinh hoạt</option>
                <option value="Chi phí giải trí">Chi phí giải trí</option>
                <option value="Chi phí tiết kiệm">Chi phí tiết kiệm</option>
                <option value="Chi phí cố định">Chi phí cố định</option>
                <option value="Chi phí bất ngờ">Chi phí bất ngờ</option>
              </select>
              <select name="status" id="" className="border-[1px] border-gray-200 p-2 outline-none col-span-1" onChange={e => setStatus(e.target.value)}>
                                <option value="income">Income</option>
                                <option value="outcome">Outcome</option>
                            </select>
              <div className="col-span-1">
                <label>From:</label>
                <input
                  type="date"
                  className="border-[1px] border-gray-200 p-2 outline-none "
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <label>To:</label>
                <input
                  type="date"
                  className="border-[1px] border-gray-200 p-2 outline-none"
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
            <div className="h-[55vh] overflow-y-auto">
            <InfiniteScroll
              dataLength={visibleItems.length}
              next={fetchMoreData}
              hasMore={true} // Set this based on whether there is more data to load
              loader={<h4>Loading...</h4>}
              endMessage={<p>No more items</p>}
            >
              {handleFilter().map((filter, index) => {
                return (
                  visibleItems[index] && (
                    <div
                      key={index}
                      className="w-full p-3 mt-5 bg-slate-100 flex items-center border-[1px] border-gray-200 justify-start rounded-lg"
                    >
                      <div className="text-3xl px-3">
                        <MdLocalHospital />
                      </div>
                      <div className="flex-1 flex flex-col items-start">
                        <div className="flex items-center">
                          <div
                            className={
                              filter.status === "income"
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            <GoDotFill />
                          </div>
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
                        <span
                          onClick={() => popup(index)}
                          className="text-red-500 px-2"
                        >
                          <TiDelete />
                        </span>
                      </div>
                    </div>
                  )
                );
              })}
            </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
