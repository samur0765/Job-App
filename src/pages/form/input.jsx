import React from "react";
import styles from "./form.module.scss";

const Input = ({ label, name, value, options, handleChange, type }) => {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      {options ? (
        <select name={name} id={name} onChange={handleChange} required={true}>
          {options.map((item, key) => (
            <option key={key} value={item} selected={item === value}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          onChange={handleChange}
          defaultValue={value}
          required={true}
        />
      )}
    </div>
  );
};

export default Input;
