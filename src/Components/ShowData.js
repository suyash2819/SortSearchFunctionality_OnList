import React from "react";
import "../CSS/ShowData.css";

const ShowData = (props) => {
  const { orderId, customerId, deliveryPincode, orderDate, items } = props;
  const i = items.replaceAll(":", "-").split(";");

  return (
    <>
      <tr>
        <td>{orderId}</td>
        <td>{customerId}</td>
        <td>{deliveryPincode}</td>
        <td>{orderDate}</td>
        <td>
          {i.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </td>
      </tr>
    </>
  );
};

export default ShowData;
