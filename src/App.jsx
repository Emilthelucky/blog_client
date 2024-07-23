import './App.css'
import { Navigation } from './components/Navigation/Navigation'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register/Register.jsx'
import Login from './pages/Login/Login.jsx'
import MyBlog from './pages/Myblogs/Myblogs.jsx'
import UpdateBlog from './pages/Updateblog/Updateblog.jsx'
import Addblog from './pages/Addblog/Addblog.jsx'
export const APIUrl = 'http://localhost:5000'
import { useContext } from 'react'
import { UserContext } from './context/UserContext.jsx'
import { Home } from './pages/home/Home.jsx'

export const App = () => {
    const { user } = useContext(UserContext)

    return (
        <div className="main-area">
            <Navigation />
            <Routes>
                <Route
                    path="/myblogs"
                    element={!user ? <Login /> : <MyBlog />}
                />
                <Route
                    path="/update-blog"
                    element={!user ? <Login /> : <UpdateBlog />}
                />
                <Route
                    path="/add-blog"
                    element={!user ? <Login /> : <Addblog />}
                />
                <Route
                    path="/register"
                    element={!user ? <Register /> : <Home />}
                />
                <Route path="/login" element={!user ? <Login /> : <Home />} />
                <Route path="/" element={user ? <Home /> : <Login />} />
            </Routes>
        </div>
    )
}
