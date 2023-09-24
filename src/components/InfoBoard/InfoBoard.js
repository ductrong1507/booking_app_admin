import React, { useEffect } from "react";
import styles from "./InfoBoard.module.css";
import LastestTransaction from "../LastestTransaction/LastestTransaction";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../../redux/reducers/userReducer";

export default function InfoBoard() {
  const { totalUser } = useSelector((state) => state.userReducer);
  const { totalTransaction, totalAmount } = useSelector(
    (state) => state.transactionReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserThunk(1, 10));
  }, []);

  return (
    <section id={styles.info_board}>
      {/* Phần tổng quan widget */}
      <div className={styles.info_board_nav}>
        <div className={styles.info_board_nav_item}>
          <h3 className={styles.info_board_nav_item_title}>Users</h3>
          <p className={styles.info_board_nav_item_amount}>{totalUser}</p>
          <p
            className={`${styles.info_board_nav_item_icon} ${styles.user_icon}`}
          >
            <i className="fa-regular fa-user" />
          </p>
        </div>

        <div className={styles.info_board_nav_item}>
          <h3 className={styles.info_board_nav_item_title}>Orders</h3>
          <p className={styles.info_board_nav_item_amount}>
            {totalTransaction}
          </p>
          <p
            className={`${styles.info_board_nav_item_icon} ${styles.order_icon}`}
          >
            <i className="fa-regular fa-cart-shopping" />
          </p>
        </div>

        <div className={styles.info_board_nav_item}>
          <h3 className={styles.info_board_nav_item_title}>Earnings</h3>
          <p className={styles.info_board_nav_item_amount}>${totalAmount}</p>
          <p
            className={`${styles.info_board_nav_item_icon} ${styles.earnings_icon}`}
          >
            <i className="fa-solid fa-dollar-sign" />
          </p>
        </div>

        <div className={styles.info_board_nav_item}>
          <h3 className={styles.info_board_nav_item_title}>Balance</h3>
          <p className={styles.info_board_nav_item_amount}>${totalAmount}</p>
          <p
            className={`${styles.info_board_nav_item_icon} ${styles.balance_icon}`}
          >
            <i className="fa-regular fa-money-bill" />
          </p>
        </div>
      </div>

      {/* Phần transaction */}
      <LastestTransaction />
    </section>
  );
}
