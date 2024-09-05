import { useRef, useState } from 'react'
import './input.css'


interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
    isize: "large" | "medium" | "small",
    label?: string,
    toggleVisibility?: boolean,
    validateLabel?: {
        view: boolean | undefined,
        desciption: string
    }
}

export function UIInput({ name, isize, label, toggleVisibility, validateLabel, ...props }: Input) {

    const inputRef = useRef<HTMLInputElement>(null);
    const [visib, setVisib] = useState(false)
    const [typeProps] = useState(props.type)
    const validateOutline = validateLabel && !validateLabel?.view && props.value

    const handleToggleVisibility = () => {
        setVisib(!visib);

        if (inputRef.current) {
            inputRef.current.type = visib ? 'text' : typeProps ? typeProps : 'password';
        }
    };
    console.log(!validateLabel?.view)

    return (
        <div className={`input-box ${isize}`}>
            <input className={`ui-input ${validateOutline ? 'validate-outline' : ''}`} ref={inputRef} {...props} />

            {validateOutline &&
                <span className='validate-label'>
                    {validateLabel?.desciption}
                </span>
            }
            {label && <span className='input-label'>{label}</span>}
            {toggleVisibility &&
                <span
                    className={`toggle-visibility ${visib ? "view" : ''}`}
                    onClick={handleToggleVisibility}
                ></span>
            }
        </div >
    )
}