import React from "react";
import { useEffect, useState } from "react";
import { csv } from "d3";
import { FaSortAmountDownAlt } from "react-icons/fa";
import ShowData from "./ShowData";

const FilterData = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [pin, setPin] = useState("");
  const [item, setItem] = useState("");
  const [sortedData, setSortedData] = useState();
  const [filteredData, setfilteredData] = useState([]);
  const [toggleSort, setToggleSort] = useState(false);

  useEffect(() => {
    csv("./Data.csv").then((data) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    const _filteredData =
      !!sortedData && !!toggleSort
        ? sortedData.filter((d) => {
            if (date !== "") return d.orderDate.trim().includes(date.trim());
            else if (pin !== "")
              return d.deliveryPincode.trim().includes(pin.trim());
            else if (item !== "")
              return d.items
                .trim()
                .toLowerCase()
                .includes(item.trim().toLowerCase());
            else return d.orderDate.trim().includes(date.trim());
          })
        : data.filter((d) => {
            if (date !== "") return d.orderDate.trim().includes(date.trim());
            else if (pin !== "")
              return d.deliveryPincode.trim().includes(pin.trim());
            else if (item !== "")
              return d.items
                .trim()
                .toLowerCase()
                .includes(item.trim().toLowerCase());
            else return data;
          });
    setfilteredData(_filteredData);
  }, [date, pin, sortedData, data, item]);

  const compareDate = (a, b) => {
    const keyASplit = a.orderDate.split("/");
    const keyBSplit = b.orderDate.split("/");
    var keyA = new Date(+keyASplit[2], keyASplit[1] - 1, +keyASplit[0]);
    var keyB = new Date(+keyBSplit[2], keyBSplit[1] - 1, +keyBSplit[0]);
    if (keyA < keyB) return 1;
    else if (keyA > keyB) return -1;
    else return 0;
  };

  const comparePin = (a, b) => {
    return a.deliveryPincode - b.deliveryPincode;
  };

  const sortDate = (filteredData) => {
    const d = filteredData.sort(compareDate);
    setSortedData(d);
    setToggleSort(!toggleSort);
  };

  const sortPin = (filteredData) => {
    setSortedData(filteredData.sort(comparePin));
    setToggleSort(!toggleSort);
  };
  return (
    <>
      <label htmlFor="item" className="item">
        Item :{" "}
      </label>
      <input
        type="text"
        id="item"
        className="item"
        onChange={(e) => {
          setItem(e.target.value);
        }}
      ></input>
      <input
        type="text"
        id="date"
        className="date"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      ></input>
      <label htmlFor="date" className="date">
        Date:{" "}
      </label>
      <label htmlFor="pincode">Pin Code : </label>
      <input
        type="text"
        className="pincode"
        id="pincode"
        onChange={(e) => {
          setPin(e.target.value);
        }}
      ></input>
      <table id="orders">
        <tbody>
          <tr>
            <th style={{ textAlign: "center" }}>Order Id</th>
            <th style={{ textAlign: "center" }}>Cust Id</th>
            <th style={{ textAlign: "center" }}>
              <FaSortAmountDownAlt
                onClick={() => sortPin(filteredData)}
                style={{ marginRight: "8px", cursor: "pointer" }}
              />
              Pin Code
            </th>
            <th style={{ textAlign: "center" }}>
              <FaSortAmountDownAlt
                onClick={() => sortDate(filteredData)}
                style={{ marginRight: "8px", cursor: "pointer" }}
              />
              Order Date
            </th>
            <th style={{ textAlign: "center" }}>Items</th>
          </tr>
          {filteredData.map((el, i) => (
            <ShowData
              key={i}
              orderId={el.orderId}
              customerId={el.customerId}
              deliveryPincode={el.deliveryPincode}
              orderDate={el.orderDate}
              items={el.items}
              date={date}
              pin={pin}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FilterData;
