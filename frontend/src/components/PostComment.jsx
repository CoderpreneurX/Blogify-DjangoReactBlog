import React from 'react'
import { FaRegHeart } from 'react-icons/fa6'

export default function PostComment({ comment }) {
    const initial = comment.user.username.split('')[0].toUpperCase()
    return (
        <div className='flex gap-2 py-2 border-b-2 my-2'>
            <div className="h-12 min-w-12 rounded-full flex justify-center items-center border bg-red-500 text-white">
                <h1 className='font-semibold text-3xl'>{initial}</h1>
            </div>
            <div>
                <h3 className="font-medium">@{comment.user.username}</h3>
                <p className="text-justify">{comment.content}</p>
            </div>
        </div>
    )
}
