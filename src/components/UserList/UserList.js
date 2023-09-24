import React, { useEffect } from "react";
import styles from "./UserList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../../redux/reducers/userReducer";

export default function UserList() {
  const { page, perPage, userList, totalUser } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserThunk(1, 10));
  }, []);

  //   Hàm render hotel list
  const renderUserList = () => {
    // Khi chưa api chưa lấy dc danh sách
    if (!userList.length) {
      return (
        <tr style={{ textAlign: "center" }}>
          <td colSpan="7" style={{ fontSize: "24px" }}>
            Loading
          </td>
        </tr>
      );
    }

    // khi đã lấy danh sách
    return userList.map((item) => {
      return (
        <tr key={item._id}>
          <td>
            <input type="checkbox" name={item._id} />
          </td>
          <td>{item._id}</td>
          <td>{item.userName}</td>
          <td>{item.fullName}</td>
          <td>{item.phoneNumber}</td>
          <td>{item.email}</td>
          <td>
            <span
              className={
                item.isAdmin ? styles.admin_color : styles.menber_color
              }
            >
              {item.isAdmin ? "Admin" : "Menber"}
            </span>
          </td>
        </tr>
      );
    });
  };

  //   Hàm tăng giảm phần phân trang
  const changePage = (amount) => {
    let newPage = page + amount;

    if (newPage >= 1 && newPage <= Math.ceil(totalUser / perPage)) {
      const actionThunk = getUserThunk(newPage, perPage);
      dispatch(actionThunk);
    }
  };

  return (
    <div className={styles.user_list}>
      <h1>Transaction list</h1>
      <div className={styles.table_wrap}>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>User Name</th>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>{renderUserList()}</tbody>

          <tfoot>
            <tr>
              <td colSpan="6">
                {page} of {Math.ceil(totalUser / perPage)}
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
