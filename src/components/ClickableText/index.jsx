import React from 'react'
import './index.scss'

const ClickableText = ({ onClick, children, style }) =>
  <div onClick={onClick} className='clickable-text' style={style}>
    {children}
  </div>

export default ClickableText
