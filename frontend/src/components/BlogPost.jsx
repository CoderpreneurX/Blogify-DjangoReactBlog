import React from 'react'
import { Link } from 'react-router-dom'

export default function BlogPost({ blog }) {
  const blogDate = new Date(blog.updated_at).toISOString().split('T')[0]
  return (
    <div className='border rounded my-2 p-4'>
      <Link to={`/blog/${blog.id}/`} className='text-slate-600 hover:underline font-semibold text-lg'>{blog.title}</Link>
      <div className='flex justify-between items-center'>
        <p className='text-sm my-2 text-slate-700'>{blog.user.first_name} {blog.user.last_name}</p>
        <p className="text-sm my-2 text-slate-700">{blogDate}</p>
      </div>
    </div>
  )
}
