import React, { useState } from 'react'
import './Navigation.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { useContext } from 'react'
import { BlogContext } from '../../context/BlogContext'

export const Navigation = () => {
    const [showTabs, setShowTabs] = useState(false)
    const { user, setUser } = useContext(UserContext)

    const { blog, blogs, setBlog, setBlogs } = useContext(BlogContext)

    const Logout = () => {
        localStorage.removeItem('user')
        setUser(null)
        localStorage.removeItem('blogs')
        setBlogs(null)
        localStorage.removeItem('blog')
        setBlog(null)
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <div className="creator">
                    <p className="creator-p">
                        <span className="code-by">© Coded by Emil</span>
                        <span className="name">Adishirinov</span>
                    </p>
                </div>
            </div>
            <div className="tabs">
                {!user ? (
                    <>
                        <Link to="/" className="tab">
                            Home
                        </Link>
                        <Link to="/login" className="tab">
                            Login
                        </Link>
                        <Link to="/register" className="tab">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/" className="tab">
                            Home
                        </Link>
                        <Link to="/myblogs" className="tab">
                            My Blogs
                        </Link>
                        <button onClick={() => Logout()} className="tab logout">
                            Logout
                        </button>
                    </>
                )}
            </div>
            <button
                className="toggle-btn"
                onClick={() => setShowTabs(!showTabs)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width={25}
                    height={25}
                >
                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                </svg>
            </button>
            <div className={`tabs-dropdown ${showTabs ? 'show' : ''}`}>
                <button className="tab-drop">Home</button>
                <button className="tab-drop">Contact</button>
                <button className="tab-drop">About</button>
            </div>
        </nav>
    )
}
