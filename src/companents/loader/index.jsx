import React from "react";
import { FaSpinner } from "react-icons/fa";
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.spinner}>
      <FaSpinner />
    </div>
  );
};

export default Loader;
