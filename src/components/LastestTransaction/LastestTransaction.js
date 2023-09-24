import React, { useEffect, useState } from "react";
import styles from "./LastestTransaction.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionThunk } from "../../redux/reducers/transactionReducer";

const statusClassMap = {
  Booked: "booked_color",
  Checkin: "checkin_color",
  Checkout: "checkout_color",
};

export default function LastestTransaction() {
  // const [latestTransaction, setLatestTransaction] = useState([]);
  const { transactionList } = useSelector((state) => state.transactionReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    //  call action thunk
    const actionThunk = getTransactionThunk(1, 8);
    dispatch(actionThunk);
  }, []);

  // Render table transaction
  const renderTransactionList = () => {
    return transactionList.map((item) => {
      const start = new Date(item.dateStart).toLocaleDateString("en-GB");
      const end = new Date(item.dateEnd).toLocaleDateString("en-GB");
      const statusClass = statusClassMap[item.status] || "";
      return (
        <tr key={item._id}>
          <td>
            <input type="checkbox" name={item._id} />
          </td>
          <td>{item._id}</td>
          <td>{item.userName}</td>
          <td>{item.hotel.name}</td>
          <td className={styles.room}>
            {item.room.map((element, index) => {
              if (index === item.room.length - 1) {
                return `${element}`;
              }
              return `${element}, `;
            })}
          </td>
          <td>
            {start} - {end}
          </td>
          <td>${item.price}</td>
          <td>{item.payment}</td>

          <td>
            <span className={styles[statusClass]}>{item.status}</span>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className={styles.info_board_transaction}>
      <h1>Latest transaction</h1>
      <div className={styles.table_wrap}>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>User</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{renderTransactionList()}</tbody>

          <tfoot>
            <tr>
              <td colSpan="8"></td>
              <td>1-8 of 8</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
