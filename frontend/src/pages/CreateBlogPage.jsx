import React, { useRef } from 'react'
import { submitBlogPost } from '../utils/blogs.js'

export default function CreateBlogPage() {
    const blogTitleRef = useRef(null)
    const blogContentRef = useRef(null)

    function createBlog(e) {
        e.preventDefault()
        const blogData = new FormData()
        blogData.append('title', blogTitleRef.current.value)
        blogData.append('content', blogContentRef.current.value)
        submitBlogPost(blogData).then((response) => {
            console.log(response)
        })
    }
  return (
    <section>
      <h1 className="section_title">Create Blog</h1>
      <form onSubmit={createBlog}>
        <input ref={blogTitleRef} type="text" name="blog_title" placeholder='Blog title' id="blog_title" />
        <textarea ref={blogContentRef} name="blog_content" id="blog_content" placeholder='Start typing...'></textarea>
        <button type='submit'>Submit</button>
      </form>
    </section>
  )
}
