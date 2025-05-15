import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <img src="/logo.png" alt="logo" />
        <h2>Başvuru Takibi</h2>
      </div>

      <nav>
        <NavLink to="/" className={(e) => (e.isActive ? styles.active : "")}>
          Başvurular
        </NavLink>
        <NavLink
          to="/job/create"
          className={(e) => (e.isActive ? styles.active : "")}
        >
          Yeni Başvuru
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
