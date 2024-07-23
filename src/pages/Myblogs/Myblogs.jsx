import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Myblogs.css'
import { APIUrl } from '../../App'
import { UserContext } from '../../context/UserContext'
import { BlogContext } from '../../context/BlogContext'
import { Spinner } from '@chakra-ui/react'
import { Title } from '../../components/Title/Title'

const MyBlog = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { user, isLoading } = useContext(UserContext)

    const { blog, setBlog, blogs, setBlogs } = useContext(BlogContext)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${APIUrl}/blogs/${user._id}`)
                const responseBlogs = response.data.data
                localStorage.setItem('blogs', JSON.stringify(responseBlogs))
                setBlogs(responseBlogs)
            } catch (err) {
                setError('Blog yoxdur')
            } finally {
                setLoading(false)
            }
        }

        fetchBlogs()
    }, [])

    const handleDelete = async (currentBlog) => {
        try {
            await axios.delete(`${APIUrl}/blogs/delete/${currentBlog._id}`)
            let blogsLeft = blogs.filter((blog) => blog._id !== currentBlog._id)
            localStorage.setItem('blogs', JSON.stringify(blogsLeft))
            setBlogs(blogsLeft)
        } catch (err) {
            console.log(err)
            setError('Failed to delete blog.')
        }
    }

    const handleUpdate = (blog) => {
        localStorage.setItem('blog', JSON.stringify(blog))
        setBlog(blog)
        navigate('/update-blog')
    }

    const handleAddBlog = () => {
        navigate('/add-blog')
    }

    if (error)
        return (
            <div className="myblog-container">
                <p className="error-message-main">{error}</p>
                <button onClick={handleAddBlog} className="add-button-myblog">
                    Blog elave et
                </button>
            </div>
        )

    if (loading) {
        return (
            <div className="spinner-container">
                {
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                }
            </div>
        )
    }

    return (
        <div className="myblog-container">
            <h2>Bloglarım</h2>
            <button onClick={handleAddBlog} className="add-button-myblog">
                Blog elave et
            </button>
            <div className="blog-list">
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-item">
                        <div className="image-container-myblog">
                            {blog.image && (
                                <img src={blog.image.url} alt={blog.title} />
                            )}
                        </div>

                        <div className="blog-infos">
                            <h3>{blog.title}</h3>
                            <p className="mustbe-wrap">{blog.text?.text}</p>
                            <div className="blog-actions">
                                <button
                                    onClick={() => handleUpdate(blog)}
                                    className="update-button"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(blog)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBlog
