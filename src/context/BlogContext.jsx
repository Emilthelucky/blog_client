import { createContext } from 'react'
import { useState } from 'react'

export const BlogContext = createContext()

export const BlogContextProvider = ({ children }) => {
    const [blog, setBlog] = useState(() => {
        const savedBlog = localStorage.getItem('blog')
        return savedBlog ? JSON.parse(savedBlog) : null
    })
    const [blogs, setBlogs] = useState(() => {
        const savedBlogs = localStorage.getItem('blogs')
        return savedBlogs ? JSON.parse(savedBlogs) : null
    })

    // const [blogId, setBlogId] = useState(() => {
    //     const savedBlogId = localStorage.getItem('blogs')
    //     return savedBlogs ? JSON.parse(savedBlogs) : null
    // })

    console.log(blog)
    console.log(blogs)

    return (
        <BlogContext.Provider value={{ blog, blogs, setBlog, setBlogs }}>
            {children}
        </BlogContext.Provider>
    )
}
