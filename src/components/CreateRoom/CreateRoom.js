import React, { useState } from "react";
import styles from "./CreateRoom.module.css";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";
import { useNavigate } from "react-router-dom";

export default function CreateRoom() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [roomNumbers, setRoomNumbers] = useState([]);
  const navgate = useNavigate();

  // xử lý nút submit button
  const submitButtonHandle = async (e) => {
    e.preventDefault();

    // Xử lý mảng room
    let roomArr = [];
    if (roomNumbers.length !== 0) {
      roomArr = roomNumbers.split(";").map(Number);
    }

    // Xử lý không bỏ trống những ô input quan trọng
    if (!title || !description || !price || !maxPeople || !roomNumbers.length) {
      return alert("Các trường không được để trống, hãy kiểm tra lại!");
    }

    const formData = {
      title,
      desc: description,
      price: price,
      maxPeople: maxPeople,
      roomNumbers: roomArr,
    };

    // Gọi API để tạo room
    try {
      const userInfo =
        JSON.parse(localStorage.getItem("CURRENT_ADMIN_USER")) || {};

      const responseApi = await axios({
        url: `${API_BASE_URL}/api/room`,
        method: "POST",
        headers: {
          isAdmin: userInfo.isAdmin || false,
        },
        data: formData,
      });

      if (!responseApi.data.status) {
        return alert(responseApi.data.message);
      }

      alert(responseApi.data.message);
      navgate("/admin/rooms/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div id={styles.create_room}>
      <h1>Add new Room</h1>

      {/* Phần form  */}
      <form className={styles.form_container}>
        <div className={styles.form_group}>
          <label>Title</label>
          <input
            className={styles.form_control}
            type="text"
            name="title"
            placeholder="Room's title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.form_group}>
          <label>Description</label>
          <input
            className={styles.form_control}
            type="text"
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.form_group}>
          <label>Price</label>
          <input
            className={styles.form_control}
            type="text"
            name="price"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className={styles.form_group}>
          <label>Max People</label>
          <input
            className={styles.form_control}
            type="text"
            name="maxPeople"
            placeholder="Max people"
            onChange={(e) => setMaxPeople(e.target.value)}
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
            onChange={(e) => setRoomNumbers(e.target.value)}
            placeholder="Nhập số phòng cách nhau bằng dấu chấm phẩy, VD: 101;202;304"
          ></textarea>
        </div>
      </form>

      {/* Nút suubmit form */}
      <button type="submit" className={styles.btn} onClick={submitButtonHandle}>
        Create New
      </button>
    </div>
  );
}
