import React from 'react'
import { FaTimes } from "react-icons/fa";

export default function Message({ content, type, onDismiss }) {
    return (
        <div className='fixed top-16 left-0 w-full'>
            <div className={`px-4 py-2 max-w-lg mx-auto items-center rounded shadow flex gap-2 ${(type === 'failure' ? 'failure_message' : 'success_message')}`}>
                <p className='flex-1'>{content}</p>
                <FaTimes className='cursor-pointer' onClick={onDismiss} />
            </div>
        </div>
    )
}
