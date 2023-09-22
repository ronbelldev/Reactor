import React, { useEffect, useRef } from 'react'
import { useOnClickOutside } from '../../utils/hooks'
import './index.scss'

const Input = ({
    onClick,
    label,
    onKeyDown,
    className ='',
    onChange,
    placeholder = 'Type text',
    style,
    value
}) => {
    const inputRef = useRef(null)

    useOnClickOutside(inputRef, () => onKeyDown({ key: 'Escape' }))

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <div className={`container ${className}`} style={style} onClick={onClick}>
            <div className="input-group">
                <label className="input-group__label" htmlFor="myInput">{label}</label>
                <input
                    ref={inputRef}
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    type="text"
                    id="myInput"
                    className="input-group__input"
                    value={value}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}

export default Input
