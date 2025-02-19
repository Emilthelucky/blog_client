import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import '../styles/global.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext.jsx'
import { BlogContextProvider } from './context/BlogContext.jsx'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <BlogContextProvider>
            <Router>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </Router>
        </BlogContextProvider>
    </UserContextProvider>
)
