import React, { useEffect, useState } from 'react'
import BlogPost from '../components/BlogPost'
import { client } from '../utils/api'
import Loading from '../components/Loading'

export default function Homepage() {
  const [isLoading, setIsLoading] = useState(true)
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    client.get('/blogs/').then((res) => {
      setBlogs(res.data.results)
      setIsLoading(false)
    }).catch((err) => {
      console.error(err)
    })
  }, [])
  return (
    <>{isLoading ? <Loading /> : (
      <section>
        <h1>Blogs</h1>
        {blogs.map((post) => (
          <BlogPost onClick={(id) => {console.log(id)}} blog={post} key={post.id} />
        ))}
      </section>
    )}</>
  )
}
