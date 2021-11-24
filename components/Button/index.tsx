import styles from 'styles/button.module.scss';
import React from 'react';

interface ButtonProps {
    label: string
}

export const Button = ({label}: ButtonProps) => {
    return (
        <button className={styles.button}>
            {label}
        </button>
    )
}