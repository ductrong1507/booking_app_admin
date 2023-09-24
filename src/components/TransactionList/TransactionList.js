import React, { useEffect, useState } from "react";
import styles from "./TransactionList.module.css";
import { getTransactionThunk } from "../../redux/reducers/transactionReducer";
import { useDispatch, useSelector } from "react-redux";

const statusClassMap = {
  Booked: "booked_color",
  Checkin: "checkin_color",
  Checkout: "checkout_color",
};

export default function TransactionList() {
  const { page, perPage, transactionList, totalTransaction } = useSelector(
    (state) => state.transactionReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //  call action thunk
    const actionThunk = getTransactionThunk(1, 10);
    dispatch(actionThunk);
  }, []);

  //   Hàm render TransactionList
  const renderTransactionList = () => {
    if (!transactionList.length) {
      return (
        <tr style={{ textAlign: "center" }}>
          <td colSpan="9">Loading</td>
        </tr>
      );
    }
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

  //   Hàm tăng giảm phần phân trang
  const changePage = (amount) => {
    let newPage = page + amount;

    if (newPage >= 1 && newPage <= Math.ceil(totalTransaction / perPage)) {
      const actionThunk = getTransactionThunk(newPage, perPage);
      dispatch(actionThunk);
    }
  };

  return (
    <div className={styles.transaction_list}>
      <h1>Transaction list</h1>
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
              <td colSpan="8">
                {page} of {Math.ceil(totalTransaction / perPage)}
              </td>
              <td>
                <i
                  onClick={changePage.bind(null, -1)}
                  className="fa-solid fa-angle-left"
                />
                <span>{page}</span>
                <i
                  onClick={changePage.bind(null, 1)}
                  className="fa-solid fa-angle-right"
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
