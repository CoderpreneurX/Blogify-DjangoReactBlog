import { client } from "./api";
import { isUserAuthenticated } from './auth'

const getBlogsUrl = import.meta.env.VITE_API_GET_BLOGS_URL
const submitBlogsUrl = import.meta.env.VITE_API_SUBMIT_BLOGS_URL
const retrieveBlogPostUrl = import.meta.env.VITE_API_RETRIEVE_BLOG_URL
const likeBlogPostUrl = import.meta.env.VITE_API_LIKE_POST_URL
const likeBlogPostCommentUrl = import.meta.env.VITE_API_LIKE_POST_COMMENT_URL
const blogSearchUrl = import.meta.env.VITE_API_SEARCH_POST_URL

export async function getBlogsList() {
    return client.get(getBlogsUrl).then((response) => {
        return response
    }).catch((error) => {
        console.error(error)
    })
}

export async function loadPage(pageNumber) {
    return client.get(getBlogsUrl + `?page=${pageNumber}`).then((response) => {
        return response
    }).catch((error) => {
        console.error(error)
    })
}

export async function submitBlogPost(blogData) {
    return client.post(
        submitBlogsUrl,
        blogData,
    ).then((response) => {
        return response
    }).catch((error) => {
        console.error(error)
    })
}

export async function retrieveBlogPost(postNumber) {
    return client.get(retrieveBlogPostUrl + postNumber + '/').then((response) => {
        return response
    }).catch((error) => {
        console.error(error)
    })
}

export async function getBlogComments(postNumber) {
    return client.get(retrieveBlogPostUrl + postNumber + '/comments/').then((response) => {
        return response
    }).catch((error) => {
        console.error(error)
    })
}

export async function postComment(postNumber, commentData) {
    return isUserAuthenticated().then((response) => {
        if (response) {
            return client.post(
                retrieveBlogPostUrl + postNumber + '/comments/create/',
                commentData
            ).then((response) => {
                return response
            }).catch((error) => {
                console.error(error)
            })
        }
    }).catch((error) => {
        return {
            message: 'Please login to perform this action!',
            type: 'failure',
        }
    })
}

export async function likeBlogPost(postNumber) {
    return isUserAuthenticated().then((response) => {
        if (response) {
            return client.post(likeBlogPostUrl + postNumber + '/like/').then((response) => {
                return response
            }).catch((error) => {
                console.error(error)
            })
        }
    }).catch((error) => {
        return {
            message: 'Please login to perform this action!',
            type: 'failure',
        }
    })
}

export async function likeBlogPostComment(commentId) {
    return isUserAuthenticated().then((response) => {
        if (response) {
            return client.post(likeBlogPostCommentUrl + commentId + '/like/').then((response) => {
                return response
            }).catch((error) => {
                console.error(error)
            })
        }
    }).catch((error) => {
        return {
            message: 'Please login to perform this action!',
            type: 'failure',
        }
    })
}

export async function searchBlogs(keywords) {
    return client.get(blogSearchUrl + keywords + '/').then((response) => {
        return response
    }).catch((error) => {
        console.error(error)
    })
}