import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Updateblog.css'
import { APIUrl } from '../../App'
import { BlogContext } from '../../context/BlogContext'
import { UserContext } from '../../context/UserContext'
import { Spinner } from '@chakra-ui/react'

const UpdateBlog = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [text, setText] = useState('')
    const [category, setCategory] = useState('Telefon')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { blog } = useContext(BlogContext)
    console.log(blog)

    useEffect(() => {
        if (!blog) {
            navigate('/myblogs')
            return
        }

        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `${APIUrl}/blogs/blog/${blog._id}`
                )
                const blogData = response.data.data
                setTitle(blogData.title || '')
                setImage(blogData.image ? blogData.image.url : '')
                setText(blogData.text ? blogData.text.text : '')
                setCategory(blogData.category || 'Telefon') // Set category from blog data
            } catch (err) {
                setError('Failed to fetch blog.')
            } finally {
                setLoading(false)
            }
        }

        fetchBlog()
    }, [blog, navigate])

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const updatedBlog = { title, image, text, category }
            await axios.put(`${APIUrl}/blogs/update/${blog._id}`, updatedBlog)
            localStorage.removeItem('blog')
            navigate('/myblogs')
        } catch (err) {
            setError('Failed to update blog.')
        }
    }

    if (error) return <p className="error-message">{error}</p>
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
        <div className="updateblog-container">
            <h2>Update Blog</h2>
            <form onSubmit={handleUpdate} className="updateblog-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Text</label>
                    <textarea
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Telefon">Telefon</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Planset">Planset</option>
                    </select>
                </div>
                <button type="submit" className="update-button">
                    Blogu guncelle
                </button>
            </form>
        </div>
    )
}

export default UpdateBlog
