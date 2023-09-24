import React, { useRef } from "react";
import axios from "axios";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../../utils/apiConfig";
import { onLogin } from "../../redux/reducers/authReducer";

export default function LoginPage() {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handel login page
  const loginHandel = async (e) => {
    e.preventDefault();
    // kiểm tra nhập đủ các trường
    if (
      !userNameRef.current.value.trim() ||
      !passwordRef.current.value.trim()
    ) {
      alert("Vui lòng nhập đủ các trường!");
      return;
    }

    // Gọi API để đăng nhập
    try {
      const resultAPI = await axios({
        url: `${API_BASE_URL}/api/user/login`,
        method: "POST",
        data: {
          userName: userNameRef.current.value.trim().toLowerCase(),
          password: passwordRef.current.value.trim().toLowerCase(),
        },
      });

      // CHuyển hướng và call reducer
      if (resultAPI.data.status) {
        // Kiểm tra xem có phải admin không
        if (resultAPI.data.result.isAdmin) {
          alert(resultAPI.data.message);
          dispatch(onLogin(resultAPI.data));
          navigate(-1, { replace: true });
        } else {
          alert(
            "Bạn không phải là admin không thể đăng nhập. Hãy vào database chỉnh thủ công quyền admin bằng true!"
          );
        }
      } else {
        // Kiểm tra thông tin đăng nhập đúng userName, password không
        alert(resultAPI.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id={styles.auth_page}>
      <h1>Login</h1>
      <form onSubmit={loginHandel}>
        <div className={styles.form_group}>
          <input
            className={styles.form_control}
            type="text"
            name="userName"
            ref={userNameRef}
            placeholder="Your username"
          />
        </div>

        <div className={styles.form_group}>
          <input
            className={styles.form_control}
            type="text"
            name="password"
            ref={passwordRef}
            placeholder="Your password"
          />
        </div>
        <button type="submit" className={styles.btn}>
          Login
        </button>
      </form>
    </section>
  );
}
