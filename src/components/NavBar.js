import { NavLink } from 'react-router-dom'
import Logo from './bizlogo.png'


function NavBar() {

return (

    <nav className="navbar">
    <div className="container">
    <div className="navbar-brand">

	   </div>
        <div className="nav-elements">
          <ul>

            <li>
              <NavLink className="nav-link" exact to="/"> Home </NavLink>
            </li>

            <li>
              <NavLink className="nav-link" to="/space/new"> Add A Property </NavLink>
            </li>

            <li>
               <img src= {Logo} alt="logo" />
            </li>
           
            <li>
              <NavLink className="nav-link" to="/reports"> Property DashBoard </NavLink>
            </li>

            <li>
              <NavLink className="nav-link" to="/contact"> Contact </NavLink>
            </li>

            <li>
              <NavLink className="nav-link" to="/signup"> Sign Up / Sign In </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
   
  )
}
export default NavBar;

