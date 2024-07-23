import React, { useState } from 'react'
import './Register.css'
import { APIUrl } from '../../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { useContext } from 'react'
import { Spinner } from '@chakra-ui/react'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const { isLoading } = useContext(UserContext)

    if (isLoading) {
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setSuccess(null)
        setError(null)

        try {
            const response = await axios.post(
                `${APIUrl}/users/register`,
                formData
            )
            setSuccess(response.data.data)
            console.log(response)
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setLoading(false)
            setTimeout(() => {
                setSuccess(null)
                setError(null)
            }, 2000)
        }
    }

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="register-button">
                    Register
                </button>
            </form>
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default Register
