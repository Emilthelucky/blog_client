import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import { APIUrl } from '../../App'
import { Title } from '../../components/Title/Title'
import { UserContext } from '../../context/UserContext'
import { useContext } from 'react'
import { Spinner } from '@chakra-ui/react'

export const Home = () => {
    const [blogs, setBlogs] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('Hamisi')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const { isLoading } = useContext(UserContext)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(false)
                setBlogs([])
                let response
                if (selectedCategory === 'Hamisi') {
                    setLoading(true)
                    response = await axios.get(`${APIUrl}/blogs/all`)
                    setLoading(false)
                } else {
                    console.log(selectedCategory)
                    setLoading(true)
                    response = await axios.post(
                        `${APIUrl}/blogs/all/category`,
                        { category: selectedCategory }
                    )
                    setLoading(false)
                }
                setBlogs(response.data.data)
                setError(null)
            } catch (error) {
                setError(
                    error.response?.data?.message || 'Error fetching blogs'
                )
            }
        }
        fetchBlogs()
    }, [selectedCategory])

    const handleCategoryClick = (category) => {
        setSelectedCategory(category)
    }

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
        <div className="home-area">
            <Title title="Tech Blog" />
            <div className="categoryies">
                {['Hamisi', 'Telefon', 'Laptop', 'Planset'].map((category) => (
                    <button
                        key={category}
                        className={`category ${
                            selectedCategory === category ? 'selected' : ''
                        }`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            {error && <div className="error-message-home">{error}</div>}
            <div className="blog-cards">
                {blogs.map((blog, index) => {
                    const imageLeft = index % 2 === 0
                    return (
                        <div
                            className={`blog-card ${
                                imageLeft ? 'image-left' : 'image-right'
                            }`}
                            key={blog._id}
                        >
                            <div className="image-container-home">
                                <img src={blog.image.url} alt={blog.title} />
                            </div>
                            <div className="blog-info">
                                <h2 className="h2-blogs">{blog.title}</h2>
                                <p className="blog-text">{blog.text.text}</p>
                                <div className="time-info">
                                    <p className="author">
                                        Blogu paylasan: {blog.author.username}
                                    </p>
                                    <p className="p-blogs">
                                        {new Date(
                                            blog.createdAt
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
