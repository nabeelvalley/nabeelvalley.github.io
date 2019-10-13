import React from 'react'
import './Navbar.css'
import { NavLink, withRouter } from 'react-router-dom'

const Navbar = (props) => (
    <nav className="Navbar">
        <div className="logo" style={props.location.pathname === '/home' ? { visibility: 'hidden', width: 0, height: 0 } : {}}><NavLink activeClassName="active" to="/home">Nabeel Valley</NavLink></div>
        <ul className="linkGroup">
            <li className="link"><NavLink activeClassName="active" to="/home">Home</NavLink></li>
            <li className="link"><NavLink activeClassName="active" to="/blog">Blog</NavLink></li>
            <li className="link"><NavLink activeClassName="active" to="/code">Code</NavLink></li>
            <li className="link"><NavLink activeClassName="active" to="/about">About</NavLink></li>
        </ul>
    </nav>
)

export default withRouter(Navbar)