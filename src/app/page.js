'use client'
import React, { useState } from 'react'
import ClickableText from '../components/ClickableText'
import Input from '../components/Input'
import { notice } from '../utils/strings'
import './index.scss'

export default function Home() {
    const [isWithNotice, setIsWithNotice] = useState(true)
    const [clientX, setClientX] = useState()
    const [clientY, setClientY] = useState()
    const [comments, setComments] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isShowInput, setIsShowInput] = useState(false)
    const [modifyingComment, setModifyingComment] = useState()

    const onClickPage = e => {
        if (isWithNotice) {
            return
        }

        setIsShowInput(true)
        setClientX(e.clientX)
        setClientY(e.clientY)
    }

    const onKeyDown = e => {
        if (e.key === 'Escape') {
            setIsShowInput(false)
            setModifyingComment()
        }
        if (e.key === 'Enter') {
            if (modifyingComment) {
                setComments(comments.map(comment => comment.id === modifyingComment.id ? ({ ...comment, text: inputValue}) : comment ))
                setModifyingComment()
            } else {
                comments.push({top: clientY, left: clientX, text: inputValue, id: Date.now() })
                setClientX()
                setClientY()
                setInputValue('')
                setIsShowInput(false)
            }
        }
    }

    return (
        <main className='main'>
            {isWithNotice &&
                <div className='notice' >
                    {notice}
                    <div className='hide-notice' onClick={() => setIsWithNotice(false)}>
                         Confirm To Start
                    </div>
                </div>}
            <div
                className='home'
                onClick={onClickPage}
            >
                {(isShowInput || modifyingComment) &&
                    <Input
                        label={modifyingComment ? 'Modify comment' : 'Add a comment'}
                        onClick={e => e.stopPropagation()}
                        className='input-client-position'
                        onKeyDown={onKeyDown}
                        value={inputValue}
                        onChange={e => {
                            setInputValue(e.target.value)
                        }}
                        style={{top: modifyingComment?.top + 50 || clientY, left: modifyingComment?.left || clientX}}
                    />}

                {comments.map((comment, index) =>
                    <div key={index} className='comment-client-position' style={{ top: comment.top, left: comment.left }}>
                        <ClickableText
                            onClick={e => {
                                e.stopPropagation()
                                setModifyingComment(comment)
                                setInputValue(comment.text)
                            }}
                        >
                            {comment.text}
                        </ClickableText>
                    </div>
                )}

            </div>
        </main>
    )
}
