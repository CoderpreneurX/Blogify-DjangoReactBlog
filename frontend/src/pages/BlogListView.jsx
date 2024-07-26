import React, { useEffect, useState } from 'react'
import { getBlogsList, loadPage } from '../utils/blogs.js'
import Loading from '../components/Loading'
import BlogPost from '../components/BlogPost'
import { FaAnglesLeft } from "react-icons/fa6"
import { FaAnglesRight } from "react-icons/fa6"
import { useNavigate } from 'react-router-dom'
import BlogHeader from '../components/BlogHeader.jsx'
import { FaSearch } from 'react-icons/fa'
import SearchBlogModal from '../components/SearchBlogModal.jsx'

export default function BlogListView() {
    const [isLoading, setIsLoading] = useState(true)
    const [isSearching, setIsSearching] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [blogsCount, setBlogsCount] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)
    const [currentFirstBlogNumber, setCurrentFirstBlogNumber] = useState(1)
    const [currentLastBlogNumber, setCurrentLastBlogNumber] = useState(5)
    const [nextPageLink, setNextPageLink] = useState(null)
    const [prevPageLink, setPrevPageLink] = useState(null)

    const navigate = useNavigate()

    function toggleSearch() {
        isSearching ? setIsSearching(false) : setIsSearching(true)
    }

    function loadNextPage() {
        setIsLoading(true)
        loadPage(pageNumber + 1).then((response) => {
            extractBlogData(response.data)
            setPageNumber(pageNumber + 1)
            setCurrentFirstBlogNumber(currentFirstBlogNumber + 5)
            if (currentLastBlogNumber + 5 > blogsCount) {
                setCurrentLastBlogNumber(blogsCount)
            } else {
                setCurrentLastBlogNumber(currentLastBlogNumber + 5)
            }
            setIsLoading(false)
        })
    }

    function loadPrevPage() {
        setIsLoading(true)
        loadPage(pageNumber - 1).then((response) => {
            extractBlogData(response.data)
            setPageNumber(pageNumber - 1)
            setCurrentFirstBlogNumber(currentFirstBlogNumber - 5)
            setCurrentLastBlogNumber(currentLastBlogNumber - 5)
            setIsLoading(false)
        })
    }

    function loadBlogPost(blogId) {
        navigate(`/blog/${blogId}/`)
    }

    async function extractBlogData(blog) {
        return new Promise((resolve) => {
            setBlogsCount(blog.count)
            setNextPageLink(blog.next)
            setPrevPageLink(blog.previous)
            setBlogs(blog.results)
            resolve('Extraction complete')
        })
    }

    useEffect(() => {
        getBlogsList().then((response) => {
            extractBlogData(response.data).then((response) => {
                setIsLoading(false)
            })
        })
    }, [])
    return (
        <>
            {isLoading ? (<Loading />) : (
                <>
                    {isSearching && <SearchBlogModal onDismiss={toggleSearch} />}
                    <BlogHeader />
                    <section className='p-4'>
                        <div className='flex justify-between items-center'>
                            <h1 className="section_title font-semibold text-xl text-slate-600 mb-4">Featured Blogs</h1>
                            <FaSearch className='cursor-pointer' onClick={toggleSearch} />
                        </div>
                        <div className="blogs">
                            {blogs.map((post) => (
                                <BlogPost onClick={() => { loadBlogPost(post.id) }} key={post.id} blog={post} />
                            ))}
                        </div>
                        {blogsCount && (
                            <div className='bg-gray-200 px-4 py-2 items-center gap-3 rounded flex'>
                                <p className='flex-1'>{currentFirstBlogNumber} - {currentLastBlogNumber} of {blogsCount} blogs</p>
                                <div className='flex gap-2'>
                                    <button onClick={loadPrevPage} disabled={prevPageLink ? false : true} className='rounded'><FaAnglesLeft /></button>
                                    <button onClick={loadNextPage} disabled={nextPageLink ? false : true} className='rounded'><FaAnglesRight /></button>
                                </div>
                            </div>
                        )}
                    </section>
                </>
            )}
        </>
    )
}
