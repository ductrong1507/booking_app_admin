import React, { useEffect, useState } from "react";
import styles from "./UpdateHotel.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRoomThunk } from "../../redux/reducers/roomReducer";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";

export default function UpdateHotel() {
  const { roomList } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();
  const navgate = useNavigate();
  const location = useLocation();

  const { hotelInfo } = location.state || {};
  const {
    name,
    type,
    city,
    address,
    distance,
    title,
    desc,
    cheapestPrice,
    photos,
    featured,
    rooms,
    rating,
  } = hotelInfo || { rooms: [] };

  useEffect(() => {
    //  call room API để render list room
    dispatch(getRoomThunk());
  }, []);

  // Các state quản lý ô input
  const [updateHotelName, setUpdateHotelName] = useState(name);
  const [updateHotelType, setUpdateHotelType] = useState(type);
  const [updateCity, setUpdateCity] = useState(city);
  const [updateAddress, setUpdateAddress] = useState(address);
  const [updateDistance, setUpdateDistance] = useState(distance);
  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateDescription, setUpdateDescription] = useState(desc);
  const [updatePrice, setUpdatePrice] = useState(cheapestPrice || 0);
  const [updateLinkImg, setUpdateLinkImg] = useState(
    photos ? photos.join(";") : ""
  );
  const [updateFeatured, setUpdateFeatured] = useState(featured ? "Yes" : "No");
  const [updateRoomChecked, setUpdateRoomChecked] = useState(
    rooms.reduce((obj, room) => {
      obj[room] = true;
      return obj;
    }, {})
  );

  // Xử lý check vào room
  const checkboxRoomHandle = (e) => {
    // lấy ra tên và trạng thái check của ô checkbox
    const { name, checked } = e.target;

    // Set lại giá trị check
    setUpdateRoomChecked((prevSta) => {
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
            checked={updateRoomChecked[item._id] || false}
            onChange={(e) => checkboxRoomHandle(e)}
          />
          <p>{item.title}</p>
        </div>
      );
    });
  };

  // Handle nút update
  const updateButtonHandle = async (e) => {
    e.preventDefault();

    // Xử lý list hình ảnh
    let newImgArr = [];
    if (updateLinkImg.length !== 0) {
      newImgArr = updateLinkImg.split(";");
    }

    // Xử lý room
    let roomArr = [];
    for (const key in updateRoomChecked) {
      if (updateRoomChecked[key]) {
        roomArr.push(key);
      }
    }

    // xử lý ô featured
    const isFeatured = updateFeatured == "Yes";

    // Xử lý dữ liệu form
    const formData = {
      name: updateHotelName.trim(),
      type: updateHotelType.trim(),
      city: updateCity.trim(),
      address: updateAddress.trim(),
      distance: updateDistance.trim(),
      title: updateTitle.trim(),
      desc: updateDescription.trim(),
      cheapestPrice: !updatePrice ? "" : +updatePrice.trim(),
      photos: newImgArr,
      featured: isFeatured,
      rooms: roomArr,
      rating: rating,
    };

    try {
      const userInfo =
        JSON.parse(localStorage.getItem("CURRENT_ADMIN_USER")) || {};
      const responseApi = await axios({
        url: `${API_BASE_URL}/api/hotel/${location.state.hotelId}`,
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
        return navgate("/admin/hotels/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div id={styles.create_hotel}>
      <h1>
        Update Hotel{" "}
        <span>(ID: {location.state ? location.state.hotelId : "No data"})</span>
      </h1>

      {location.state ? (
        <>
          {/* Phần form  */}
          <form className={styles.form_container}>
            <div className={styles.form_group}>
              <label>Name</label>
              <input
                className={styles.form_control}
                type="text"
                name="hotelName"
                placeholder="My hotel"
                value={updateHotelName}
                onChange={(e) => setUpdateHotelName(e.target.value)}
              />
            </div>

            <div className={styles.form_group}>
              <label>Type</label>
              <input
                className={styles.form_control}
                type="text"
                name="type"
                placeholder="Hotel's type"
                value={updateHotelType}
                onChange={(e) => setUpdateHotelType(e.target.value)}
              />
            </div>

            <div className={styles.form_group}>
              <label>City</label>
              <input
                className={styles.form_control}
                type="text"
                name="city"
                placeholder="City"
                value={updateCity}
                onChange={(e) => setUpdateCity(e.target.value)}
              />
            </div>

            <div className={styles.form_group}>
              <label>Address</label>
              <input
                className={styles.form_control}
                type="text"
                name="address"
                placeholder="Hotel's address"
                value={updateAddress}
                onChange={(e) => setUpdateAddress(e.target.value)}
              />
            </div>

            <div className={styles.form_group}>
              <label>Distance from City Center</label>
              <input
                className={styles.form_control}
                type="text"
                name="distance"
                placeholder="Distance"
                value={updateDistance}
                onChange={(e) => setUpdateDistance(e.target.value)}
              />
            </div>

            <div className={styles.form_group}>
              <label>Title</label>
              <input
                className={styles.form_control}
                type="text"
                name="title"
                placeholder="Title"
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
              <label>
                Images <strong>(Mỗi link hình cách nhau bằng đấu ";")</strong>
              </label>
              <textarea
                className={`${styles.form_control} ${styles.text_area}`}
                type="text"
                name="image"
                value={updateLinkImg}
                onChange={(e) => setUpdateLinkImg(e.target.value)}
              ></textarea>
            </div>

            <div className={styles.form_group}>
              <label>Featured</label>

              <select
                name="featured"
                className={styles.input_select}
                value={updateFeatured}
                onChange={(e) => setUpdateFeatured(e.target.value)}
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
          <button
            type="submit"
            className={styles.btn}
            onClick={updateButtonHandle}
          >
            Update
          </button>
        </>
      ) : (
        <div>Không có dữ liệu ID Hotel</div>
      )}
    </div>
  );
}
