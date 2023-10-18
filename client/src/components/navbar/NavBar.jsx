import { React} from 'react'
import useUserStore from "../../hooks/userStore";
import { NavLink } from 'react-router-dom'
import'../navbar/NavBar.css'

function NavBar() {
  const { user } = useUserStore();

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
        <NavLink to='/'>Dashboard</NavLink>
        <NavLink to='/'>Guilds</NavLink>
        <NavLink to='/'>Profile</NavLink>
        <NavLink to='/'>Log Out</NavLink>
      </nav>
    </header>
  )
  return user.username ? loggedInNavBar : loggedOutNavBar

}

export default NavBar