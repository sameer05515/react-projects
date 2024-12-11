import React from 'react';
import styles from './styles.module.css';

function CustomInput(props) {
    const { variant = 'small', ...otherProps } = props;

  return (
    <input className={`${styles['input']} ${styles[variant]}`} {...otherProps}/>
  )
}

export default CustomInput