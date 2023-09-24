import React from "react";
import styles from "./SideBar.module.css";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <nav id={styles.side_bar}>
      {/* Phần main side bar: dashboard */}
      <div className={styles.side_bar_section}>
        <h3 className={styles.side_bar_section_title}>Main</h3>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <i className="fa-solid fa-table-columns" />
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Phần  side bar: Lists information */}
      <div className={styles.side_bar_section}>
        <h3 className={styles.side_bar_section_title}>Lists</h3>
        <ul>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <i className="fa-solid fa-table-columns" />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/hotels"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <i className="fa-solid fa-hotel" />
              Hotels
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/rooms"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <i className="fa-solid fa-door-open" />
              Rooms
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/transactions"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <i className="fa-solid fa-file-invoice" />
              Transaction
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Phần  side bar: Create New */}
      <div className={styles.side_bar_section}>
        <h3 className={styles.side_bar_section_title}>New</h3>
        <ul>
          <li>
            <NavLink
              to="/admin/create-hotel"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <i className="fa-solid fa-hotel" />
              New hotels
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/create-room"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <i className="fa-solid fa-door-open" />
              New rooms
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
