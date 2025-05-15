import React from "react";
import styles from "./error.module.scss";

const Error = ({ message }) => {
  return (
    <div className={styles.error}>
      <h2>Üzgünüz bir sorun oluştu</h2>
      <h3>{message}</h3>
      <p>Lütfen daha sonra tekrar deneyiniz..</p>
    </div>
  );
};

export default Error;
