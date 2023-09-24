import React, { useEffect, useRef, useState } from "react";
import styles from "./CreateHotel.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getRoomThunk } from "../../redux/reducers/roomReducer";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";
import { useNavigate } from "react-router-dom";

export default function CreateHotel() {
  const { roomList } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();
  const navgate = useNavigate();

  // Các state quản lý ô input
  const [hotelName, setHotelName] = useState("");
  const [hotelType, setHotelType] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [linkImg, setLinkImg] = useState([]);
  const [featured, setFeatured] = useState("");
  const [roomChecked, setRoomChecked] = useState({});

  useEffect(() => {
    //  call room API để render list room
    dispatch(getRoomThunk());
  }, []);

  // Xử lý check vào room
  const checkboxRoomHandle = (e) => {
    // lấy ra tên và trạng thái check của ô checkbox
    const { name, checked } = e.target;

    // Set lại giá trị check
    setRoomChecked((prevSta) => {
      return {
        ...prevSta,
        [name]: checked,
      };
    });
  };

  // render room để chọn
  const renderRoomList = () => {
    return roomList.map((item) => {
      return (
        <div key={item._id} className={styles.input_checkbox}>
          <input
            type="checkbox"
            name={item._id}
            checked={roomChecked[item._id] || false}
            onChange={(e) => checkboxRoomHandle(e)}
          />
          <p>{item.title}</p>
        </div>
      );
    });
  };

  // Xử lý nút submit
  const submitButtonHandle = async (e) => {
    e.preventDefault();

    // Xử lý list hình ảnh
    let newImgArr = [];
    if (linkImg.length !== 0) {
      newImgArr = linkImg.split(";");
    }

    // Xử lý room
    let roomArr = [];
    for (const key in roomChecked) {
      if (roomChecked[key]) {
        roomArr.push(key);
      }
    }

    // xử lý ô featured
    const isFeatured = featured == "Yes";

    // Xử lý không bỏ trống những ô input quan trọng
    if (!hotelName || !hotelType || !city || !address || !price) {
      return alert(
        "Các trường hotelName, hotelType, city, address, price không được để trống, hãy kiểm tra lại!"
      );
    }

    // Xử lý dữ liệu form
    const formData = {
      name: hotelName,
      type: hotelType,
      city,
      address,
      distance,
      title,
      desc: description,
      cheapestPrice: +price,
      photos: newImgArr,
      featured: isFeatured,
      rooms: roomArr,
      rating: 4,
    };

    // Call API để tạo hotel
    try {
      const userInfo =
        JSON.parse(localStorage.getItem("CURRENT_ADMIN_USER")) || {};
      const responseApi = await axios({
        url: `${API_BASE_URL}/api/hotel`,
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
      navgate("/admin/hotels/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div id={styles.create_hotel}>
      <h1>Add new Hotel</h1>

      {/* Phần form  */}
      <form className={styles.form_container}>
        <div className={styles.form_group}>
          <label>Name</label>
          <input
            className={styles.form_control}
            type="text"
            name="hotelName"
            placeholder="My hotel"
            onChange={(e) => setHotelName(e.target.value)}
          />
        </div>

        <div className={styles.form_group}>
          <label>Type</label>
          <input
            className={styles.form_control}
            type="text"
            name="type"
            placeholder="Hotel's type"
            onChange={(e) => setHotelType(e.target.value)}
          />
        </div>

        <div className={styles.form_group}>
          <label>City</label>
          <input
            className={styles.form_control}
            type="text"
            name="city"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className={styles.form_group}>
          <label>Address</label>
          <input
            className={styles.form_control}
            type="text"
            name="address"
            placeholder="Hotel's address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className={styles.form_group}>
          <label>Distance from City Center</label>
          <input
            className={styles.form_control}
            type="text"
            name="distance"
            placeholder="Distance"
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>

        <div className={styles.form_group}>
          <label>Title</label>
          <input
            className={styles.form_control}
            type="text"
            name="title"
            placeholder="Title"
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
          <label>
            Images <strong>(Mỗi link hình cách nhau bằng đấu ";")</strong>
          </label>
          <textarea
            className={`${styles.form_control} ${styles.text_area}`}
            type="text"
            name="image"
            onChange={(e) => setLinkImg(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.form_group}>
          <label>Featured</label>

          <select
            name="featured"
            className={styles.input_select}
            onChange={(e) => setFeatured(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className={styles.form_group}>
          <label>Room</label>
          {renderRoomList()}
        </div>
      </form>

      {/* Nút suubmit form */}
      <button type="submit" className={styles.btn} onClick={submitButtonHandle}>
        Create New
      </button>
    </div>
  );
}
