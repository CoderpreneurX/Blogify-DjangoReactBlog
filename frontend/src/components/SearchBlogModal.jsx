import React, { useRef, useState } from 'react'
import { searchBlogs } from '../utils/blogs'
import BlogPost from './BlogPost'
import { FaTimes } from 'react-icons/fa'

export default function SearchBlogModal({onDismiss}) {
    const searchRef = useRef(null)
    const [searchResults, setSearchResults] = useState(null)
    const [searchResultsCount, setSearchResultsCount] = useState(0)
    const [searchResultsNextPage, setSearchResultsNextPage] = useState(null)
    const [searchResultsPrevPage, setSearchResultsPrevPage] = useState(null)
    function handleBlogSearch(e) {
        e.preventDefault()
        const keywords = searchRef.current.value
        searchBlogs(keywords).then((response) => {
            setSearchResults(response.data.results)
            setSearchResultsCount(response.data.count)
            setSearchResultsNextPage(response.next)
            setSearchResultsPrevPage(response.previous)
            console.log(response.data.results)
        })
    }
    return (
        <section className='fixed h-screen w-full sm:px-4 py-8 grid place-items-center bg-black bg-opacity-60 top-0 left-0 z-20'>
            <div className='max-w-screen-md h-full w-full bg-white sm:rounded p-4'>
                <button className='mb-2' onClick={onDismiss}><FaTimes /></button>
                <form className='flex gap-2' onSubmit={handleBlogSearch}>
                    <input ref={searchRef} className='w-full' placeholder='Enter keywords' type="text" name="search_blog" id="search_blog" required />
                    <button type='submit'>Go</button>
                </form>
                <div className="search_results">
                    {searchResults && searchResults.length === 0 && (
                        <p className='text-center'>No results found</p>
                    )}
                    {searchResults && searchResults.map((result) => (
                        <BlogPost key={result.id} blog={result} />
                    ))}
                </div>
            </div>
        </section>
    )
}
