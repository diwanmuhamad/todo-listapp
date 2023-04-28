import react from 'react'
import './navbar.css'
interface navbarProps {
    title: String
}

const Navbar = (props: navbarProps) => {
    return (
    <div className='navbar'>
        <div className='titleNavbarContainer'>
            <h1 className="titleNavbar">{props.title}</h1>
        </div>
    </div>
    )
}

export default Navbar