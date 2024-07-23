import React, { useState, useContext } from 'react'
import './Navigation.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { BlogContext } from '../../context/BlogContext'
import DelayedLink from '../../link/DelayedLink'
import { Spinner } from '@chakra-ui/react'

export const Navigation = () => {
    const [showTabs, setShowTabs] = useState(false)
    const { user, setUser } = useContext(UserContext)
    const { setBlog, setBlogs } = useContext(BlogContext)

    const Logout = () => {
        setTimeout(() => {
            localStorage.removeItem('user')
            setUser(null)
            localStorage.removeItem('blogs')
            setBlogs(null)
            localStorage.removeItem('blog')
            setBlog(null)
        }, 2000)
    }

    const handleTabClick = () => {
        setShowTabs(false)
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
                        <DelayedLink
                            routingTo="/login"
                            dynamicClassName="tab"
                            delay={2000}
                        >
                            Login
                        </DelayedLink>
                        <DelayedLink
                            routingTo="/register"
                            dynamicClassName="tab"
                            delay={2000}
                        >
                            Register
                        </DelayedLink>
                        <Link to="/qeyd" className="tab">
                            Qeydlər
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/" className="tab">
                            Ev
                        </Link>
                        <Link to="/myblogs" className="tab">
                            Bloglarım
                        </Link>
                        <Link to="/qeyd" className="tab">
                            Qeydlər
                        </Link>
                        <button onClick={Logout} className="tab logout">
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
                {!user ? (
                    <>
                        <Link
                            to="/login"
                            className="tab-drop"
                            onClick={handleTabClick}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="tab-drop"
                            onClick={handleTabClick}
                        >
                            Register
                        </Link>
                        <Link
                            to="/qeyd"
                            className="tab-drop"
                            onClick={handleTabClick}
                        >
                            Qeydlər
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/"
                            className="tab-drop"
                            onClick={handleTabClick}
                        >
                            Ev
                        </Link>
                        <Link
                            to="/myblogs"
                            className="tab-drop"
                            onClick={handleTabClick}
                        >
                            Bloglarım
                        </Link>
                        <Link
                            to="/qeyd"
                            className="tab-drop"
                            onClick={handleTabClick}
                        >
                            Qeydlər
                        </Link>
                        <button
                            onClick={() => {
                                Logout()
                                handleTabClick()
                            }}
                            className="tab-drop logout"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}
