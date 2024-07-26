import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getBlogComments, likeBlogPost, likeBlogPostComment, postComment, retrieveBlogPost } from '../utils/blogs.js'
import { FaRegHeart, FaHeart } from 'react-icons/fa6'
import BlogHeader from '../components/BlogHeader.jsx'
import Message from '../components/Message.jsx'
import PostComment from '../components/PostComment.jsx'
import { isUserAuthenticated } from '../utils/auth.js'

export default function BlogDetailView() {
  const [isUserAnonymous, setIsUserAnonymous] = useState(true)
  const [comments, setComments] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [isLoadingComments, setIsLoadingComments] = useState(true)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogContent, setBlogContent] = useState('')
  const [blogDate, setBlogDate] = useState('')
  const [blogLikes, setBlogLikes] = useState(0)
  const [blogTags, setBlogTags] = useState([])
  const [blogUser, setBlogUser] = useState({})

  const commentRef = useRef(null)
  const likeBtnRef = useRef(null)

  const { blogId } = useParams()

  function handleBlogPostLike() {
    if (!isUserAnonymous) {
      likeBtnRef.current.disabled = true
      likeBlogPost(blogId).then((response) => {
        setBlogLikes(response.data.likes_count)
        likeBtnRef.current.disabled = false
      })
    } else {
      setMessage('You need to login to perform this action!')
      setMessageType('failure')
    }
  }

  function handleCommentBlogPost(e) {
    e.preventDefault()
    if (!isUserAnonymous) {
      const commentData = new FormData()
      commentData.append('content', commentRef.current.value)
      commentData.append('blog_post_id', blogId)
      postComment(blogId, commentData).then((response) => {
        getComments()
      })
    } else {
      setMessage('You need to login to perform this action!')
      setMessageType('failure')
    }
  }

  function getComments() {
    getBlogComments(blogId).then((response) => {
      setComments(response.data.results)
    })
  }

  useEffect(() => {
    isUserAuthenticated().then((response) => {
      if (response) {
        setIsUserAnonymous(false)
      }
    }).catch((error) => {
      setIsUserAnonymous(true)
    })
    retrieveBlogPost(blogId).then((response) => {
      setBlogTitle(response.data.title)
      setBlogContent(response.data.content)
      setBlogLikes(response.data.likes)
      setBlogTags(response.data.tags)
      setBlogUser(response.data.user)
      const date = new Date(response.data.updated_at).toISOString().split('T')[0]
      setBlogDate(date)
    })
    getComments()

  }, [])
  
  return (
    <>
      <BlogHeader />
      <section className='p-4 relative'>
        {message && (
          <Message content={message} type={messageType} onDismiss={() => {
            setMessage(null)
            setMessageType(null)
          }} />
        )}
        <h1 className='text-2xl font-bold text-slate-600'>{blogTitle}</h1>
        <div className='border-t-2 font-medium text-slate-600 border-b-2 my-4 p-2 flex justify-between'>
          <p>By {blogUser.first_name} {blogUser.last_name}</p>
          <p>Published on {blogDate}</p>
        </div>
        <p>{blogContent}</p>
        <div className='my-4 flex gap-2 items-center'>
          <p className='text-lg font-medium'>Likes:</p>
          <button ref={likeBtnRef} onClick={handleBlogPostLike} className='bg-red-600 rounded flex gap-2 items-center'>{blogLikes} <FaRegHeart /></button>
        </div>
        <div className="border-t-2 border-b-2 px-4 py-2 my-4">
          <p className='font-medium text-slate-600'>Comments</p>
        </div>
        <div className="comments">
          {comments.length === 0 ? (
            <p className='text-center text-slate-600 mb-4'>No comments yet!</p>
          ) : comments.map((comment) => (
            <PostComment key={comment.id} comment={comment} />
          ))}
        </div>
        <form className='flex gap-2' onSubmit={(e) => { handleCommentBlogPost(e) }}>
          <input required className='w-full' placeholder='Type a comment...' ref={commentRef} type="text" name="comment" id="comment" />
          <button type='submit'>Post</button>
        </form>
      </section>
    </>
  )
}
