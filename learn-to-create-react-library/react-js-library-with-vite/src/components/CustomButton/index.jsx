import React from 'react';
import styles from './styles.module.css';

function Button(props) {
    const { variant = 'primary', children, ...otherProps } = props;
    return (
        <button className={`${styles['button']} ${styles[variant]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button