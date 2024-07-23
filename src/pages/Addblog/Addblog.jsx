import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Addblog.css'
import { APIUrl } from '../../App'
import { UserContext } from '../../context/UserContext'
import { Spinner } from '@chakra-ui/react'

const Addblog = () => {
    const { user } = useContext(UserContext)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [text, setText] = useState('')
    const [category, setCategory] = useState('Telefon')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleAddBlog = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const newBlog = { title, image, text, category, author: user._id }
            const res = await axios.post(`${APIUrl}/blogs/create`, newBlog)
            console.log(res)
            navigate('/myblogs')
        } catch (err) {
            setError(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="addblog-container">
            <h2>Add New Blog</h2>
            <form onSubmit={handleAddBlog} className="addblog-form">
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
                <button type="submit" className="add-button">
                    {loading ? <Spinner /> : 'Blog əlavə et'}
                </button>

                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    )
}

export default Addblog
