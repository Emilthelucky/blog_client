import React, { useState } from 'react'
import './Login.css'
import { APIUrl } from '../../App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { useContext } from 'react'

const Login = () => {
    const { user, setUser } = useContext(UserContext)
    const [formData, setFormData] = useState({
        username: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setSuccess(null)
        setError(null)

        try {
            const response = await axios.post(`${APIUrl}/users/login`, formData)
            console.log(response)
            setUser(response.data.data)
            localStorage.setItem('user', JSON.stringify(response.data.data))
            setSuccess('Istifadeci daxil oldu')
            setTimeout(() => {
                navigate('/')
            }, 2000)
        } catch (error) {
            console.log(error)
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
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
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
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="login-button"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default Login
