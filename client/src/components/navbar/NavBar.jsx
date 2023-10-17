import React from 'react'
import { NavLink } from 'react-router-dom'
import'../navbar/NavBar.css'

function NavBar() {
  const loggedOutNavBar = (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>
    </header>
  )
  const loggedInNavBar = (
    <header>
      <nav>
        <NavLink to='/'>Quests</NavLink>
        <NavLink to='/'>Guilds</NavLink>
        <NavLink to='/'>Profile</NavLink>
        <NavLink to='/'>Log Out</NavLink>
      </nav>
    </header>
  )
  return loggedInNavBar

}

export default NavBar