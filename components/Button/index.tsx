import styles from 'styles/button.module.scss';
import React, { ReactNode } from 'react';

interface ButtonProps {
    label: string
    children: ReactNode
    handleClick?: () => void
}

export const Button = ({label, handleClick, children}: ButtonProps) => {
    return (
        <button onClick={handleClick} className={styles.button}>
            {children}
            {label}
        </button>
    )
}