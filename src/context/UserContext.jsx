import { createContext } from 'react'
import { useState } from 'react'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    })

    const [isLoading, setIsLoading] = useState(false)
    console.log(isLoading)

    const showLoading = () => {
        setIsLoading(true)
    }

    const hideLoading = () => {
        setIsLoading(false)
    }

    console.log(user)

    return (
        <UserContext.Provider
            value={{ user, setUser, isLoading, showLoading, hideLoading }}
        >
            {children}
        </UserContext.Provider>
    )
}
