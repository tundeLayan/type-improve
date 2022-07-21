import React from 'react';

import styles from "./button.module.scss";

const Button = ({label,...rest}) => {
  return (
    <button data-testid="button" className={styles.btn} {...rest}>{label}</button>
  )
}

export default Button