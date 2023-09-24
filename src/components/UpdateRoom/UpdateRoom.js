import React, { useState } from "react";
import styles from "./UpdateRoom.module.css";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateRoom() {
  const location = useLocation();
  const { roomInfo, roomId } = location.state || {};
  const { title, desc, price, maxPeople, roomNumbers } = roomInfo || {};

  // state quản lý các input
  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateDescription, setUpdateDescription] = useState(desc);
  const [updatePrice, setUpdatePrice] = useState(price);
  const [updateMaxPeople, setUpdateMaxPeople] = useState(maxPeople);
  const [updateRoomNumbers, setUpdateRoomNumbers] = useState(
    roomNumbers ? roomNumbers.join(";") : ""
  );
  const navgate = useNavigate();

  // xử lý nút submit button
  const updateButtonHandle = async (e) => {
    // Xử lý mảng room
    let roomArr = [];
    if (updateRoomNumbers.length !== 0) {
      roomArr = updateRoomNumbers.split(";").map(Number);
    }

    // Thông tin form
    const formData = {
      title: updateTitle.trim(),
      desc: updateDescription.trim(),
      price: +updatePrice,
      maxPeople: +updateMaxPeople,
      roomNumbers: roomArr,
    };

    // Gọi API để tạo room
    try {
      const userInfo =
        JSON.parse(localStorage.getItem("CURRENT_ADMIN_USER")) || {};

      const responseApi = await axios({
        url: `${API_BASE_URL}/api/room/${roomId}`,
        method: "PUT",
        headers: {
          isAdmin: userInfo.isAdmin || false,
        },
        data: formData,
      });

      // Thông báo cho người dùng
      alert(responseApi.data.message);

      // Chuyển hướng khi thành công
      if (responseApi.data.status) {
        return navgate("/admin/rooms/");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div id={styles.update_room}>
      <h1>
        Update Room <span>(ID: {location.state ? roomId : "No data"})</span>
      </h1>
      {location.state ? (
        <>
          {/* Phần form  */}
          <form className={styles.form_container}>
            <div className={styles.form_group}>
              <label>Title</label>
              <input
                className={styles.form_control}
                type="text"
                name="title"
                placeholder="Room's title"
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
              />
            </div>

            <div className={styles.form_group}>
              <label>Description</label>
              <input
                className={styles.form_control}
                type="text"
                name="description"
                placeholder="Description"
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
              />
            </div>

            <div className={styles.form_group}>
              <label>Price</label>
              <input
                className={styles.form_control}
                type="text"
                name="price"
                placeholder="Price"
                value={updatePrice}
                onChange={(e) => setUpdatePrice(e.target.value)}
              />
            </div>

            <div className={styles.form_group}>
              <label>Max People</label>
              <input
                className={styles.form_control}
                type="text"
                name="maxPeople"
                placeholder="Max people"
                value={updateMaxPeople}
                onChange={(e) => setUpdateMaxPeople(e.target.value)}
              />
            </div>

            <div className={styles.form_group}>
              <label>
                Room Numbers
                {/* <strong>(Mỗi phòng cách nhau bằng dấu ";")</strong> */}
              </label>
              <textarea
                className={`${styles.form_control} ${styles.text_area}`}
                type="text"
                name="roomNumbers"
                value={updateRoomNumbers}
                onChange={(e) => setUpdateRoomNumbers(e.target.value)}
                placeholder="Nhập số phòng cách nhau bằng dấu chấm phẩy, VD: 101;202;304"
              ></textarea>
            </div>
          </form>

          {/* Nút suubmit form */}
          <button
            type="submit"
            className={styles.btn}
            onClick={updateButtonHandle}
          >
            Update Room
          </button>
        </>
      ) : (
        <div>Không có dữ liệu ID Room</div>
      )}
    </div>
  );
}
