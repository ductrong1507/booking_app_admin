import React from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../redux/reducers/authReducer";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, userLogin } = useSelector((state) => state.authReducer);

  return (
    <section id={styles.navbar_container}>
      <div id={styles.navbar}>
        {/* Navbar content */}
        <div className={styles.navbar_content}>
          <h3 onClick={() => navigate("/")}>Admin Page</h3>

          {isLogin ? (
            <div className={styles.navbar_content_btn}>
              <p>
                Hello, {userLogin.isAdmin && "Admin"} {userLogin.userName}
              </p>

              <button onClick={() => dispatch(onLogout())}>Log out</button>
            </div>
          ) : (
            <div className={styles.navbar_content_btn}>
              <button onClick={() => navigate("/login")}>Login</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
