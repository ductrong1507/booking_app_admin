import React, { useEffect } from "react";
import styles from "./RoomList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRoomThunk } from "../../redux/reducers/roomReducer";
import { API_BASE_URL } from "../../utils/apiConfig";
import axios from "axios";

export default function RoomList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomList, page, perPage, totalRoom } = useSelector(
    (state) => state.roomReducer
  );

  useEffect(() => {
    // call action thunk
    dispatch(getRoomThunk(1, 5));
  }, []);

  // hàm render room list
  const renderRoomList = () => {
    if (!roomList.length) {
      return (
        <tr style={{ textAlign: "center" }}>
          <td colSpan="7" style={{ fontSize: "24px" }}>
            Loading
          </td>
        </tr>
      );
    }
    return roomList.map((item) => {
      return (
        <tr key={item._id}>
          <td>
            <input type="checkbox" name={item._id} />
          </td>
          <td>{item._id}</td>
          <td className={styles.capitalize}>{item.title}</td>
          <td className={` ${styles.long_desc}`}>{item.desc}</td>
          <td className={styles.capitalize}>{item.price}</td>

          <td className={styles.capitalize}>{item.maxPeople}</td>

          <td>
            <button
              onClick={deleteRoomHandle.bind(null, item._id)}
              className={`${styles.btn_danger} ${styles.btn} ${styles.mr_4}`}
            >
              Delete
            </button>
            <button
              onClick={editRoomHandle.bind(null, item._id, item)}
              className={`${styles.btn_primary} ${styles.btn}`}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };

  // Delete hotel by ID
  const deleteRoomHandle = async (roomId) => {
    // Tạo biến confirm việc xóa
    const isDelete = window.confirm("Bạn có muốn xóa room này không ?");
    if (isDelete) {
      const userInfo =
        JSON.parse(localStorage.getItem("CURRENT_ADMIN_USER")) || {};
      try {
        const responseApi = await axios({
          url: `${API_BASE_URL}/api/room/${roomId}`,
          method: "DELETE",
          headers: {
            isAdmin: userInfo.isAdmin || false,
          },
        });

        // Kiểm tra xem có xóa thành công hay không
        // đưa ra thông báo rồi call lại danh sách
        alert(responseApi.data.message);

        if (responseApi.data.status) {
          if (roomList.length == 1) {
            dispatch(getRoomThunk(page - 1, perPage));
            return;
          }
          dispatch(getRoomThunk(page, perPage));
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  // Edit hotels button handle
  const editRoomHandle = (roomId, roomInfo) => {
    navigate("/admin/update-room", { state: { roomId, roomInfo } });
  };

  //   Hàm tăng giảm phần phân trang
  const changePage = (amount) => {
    let newPage = page + amount;

    if (newPage >= 1 && newPage <= Math.ceil(totalRoom / perPage)) {
      const actionThunk = getRoomThunk(newPage, perPage);
      dispatch(actionThunk);
    }
  };

  return (
    <div className={styles.rooms_list}>
      {/* Phần heading */}
      <div className={styles.rooms_list_heading}>
        <h1>Rooms list</h1>
        <button
          onClick={() => {
            navigate("/admin/create-room");
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
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Max People</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {}
            {renderRoomList()}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="6">
                {page} of {Math.ceil(totalRoom / perPage)}
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
