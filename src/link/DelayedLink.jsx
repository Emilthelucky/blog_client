import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const DelayedLink = ({ routingTo, delay, children, dynamicClassName }) => {
    const navigate = useNavigate()
    const { showLoading, hideLoading } = useContext(UserContext)

    const handleClick = (e) => {
        e.preventDefault()
        showLoading()
        setTimeout(() => {
            hideLoading()
            navigate(`${routingTo}`)
        }, delay)
    }

    return (
        <Link href={routingTo}>
            <button className={dynamicClassName} onClick={handleClick}>
                {children}
            </button>
        </Link>
    )
}

export default DelayedLink
