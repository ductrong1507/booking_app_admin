import React, { useEffect } from "react";
import styles from "./HotelList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteHotelThunk,
  getHotelThunk,
} from "../../redux/reducers/hotelReducer";
import { useNavigate } from "react-router-dom";

export default function HotelList() {
  const { page, perPage, hotelList, totalHotel } = useSelector(
    (state) => state.hotelReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //  call action thunk
    const actionThunk = getHotelThunk(1, 10);
    dispatch(actionThunk);
  }, []);

  //   Hàm render hotel list
  const renderHotelList = () => {
    if (!hotelList.length) {
      return (
        <tr style={{ textAlign: "center" }}>
          <td colSpan="7" style={{ fontSize: "24px" }}>
            Loading
          </td>
        </tr>
      );
    }
    return hotelList.map((item) => {
      return (
        <tr key={item._id}>
          <td>
            <input type="checkbox" name={item._id} />
          </td>
          <td>{item._id}</td>
          <td className={styles.capitalize}>{item.name}</td>
          <td className={styles.capitalize}>{item.type}</td>
          <td className={styles.capitalize}>{item.title}</td>
          <td>{item.city}</td>

          <td>
            <button
              onClick={deleteHotelHandle.bind(null, item._id)}
              className={`${styles.btn_danger} ${styles.btn} ${styles.mr_4}`}
            >
              Delete
            </button>

            <button
              onClick={editHotelHandle.bind(null, item._id, item)}
              className={`${styles.btn_primary} ${styles.btn}`}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };

  // Edit hotels button handle
  const editHotelHandle = (hotelId, hotelInfo) => {
    navigate("/admin/update-hotel", { state: { hotelId, hotelInfo } });
  };

  // Delete hotel by ID
  const deleteHotelHandle = (hotelId) => {
    // Tạo biến confirm việc xóa

    const isDelete = window.confirm("Bạn có muốn xóa khách sạn này không ?");
    if (isDelete) {
      //  call action thunk delete
      const actionThunk = deleteHotelThunk(hotelId, page, perPage);
      dispatch(actionThunk);
    }
  };

  //   Hàm tăng giảm phần phân trang
  const changePage = (amount) => {
    let newPage = page + amount;

    if (newPage >= 1 && newPage <= Math.ceil(totalHotel / perPage)) {
      const actionThunk = getHotelThunk(newPage, perPage);
      dispatch(actionThunk);
    }
  };

  return (
    <div className={styles.hotels_list}>
      {/* Phần headig */}
      <div className={styles.hotels_list_heading}>
        <h1>Hotels list</h1>
        <button
          onClick={() => {
            navigate("/admin/create-hotel");
          }}
          className={`${styles.btn_success} ${styles.btn}`}
        >
          Add new
        </button>
      </div>

      {/* Phần table */}
      <div className={styles.table_wrap}>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Title</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {}
            {renderHotelList()}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="6">
                {page} of {Math.ceil(totalHotel / perPage)}
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
