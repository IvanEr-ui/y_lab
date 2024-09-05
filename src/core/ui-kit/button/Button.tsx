import React from 'react'
import './button.css'

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    isize: "large" | "medium" | "small",
    disabled?: boolean,
}

export function UIButton({ children, isize, disabled = false, ...props }: Button) {

    return (
        <button className={`ui-button ${isize}`} disabled={disabled} {...props}>
            {children}
        </button>
    )
}