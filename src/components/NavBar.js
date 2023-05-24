import { NavLink } from 'react-router-dom'
// import Logo from './bizlogo.png'

const Navbar = () => {
return (
    <nav className="navbar">
      <div className="container">
      <div className="navbar-brand">
			{/* <img src= {Logo} alt="logo"/> */}
	   </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/property">Add A Property</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/login">Login / SignUp</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Navbar

