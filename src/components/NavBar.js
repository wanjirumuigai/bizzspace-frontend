import { NavLink, useNavigate } from 'react-router-dom'
// import Logo from './bizlogo.png'

const Navbar = ({user, onLogout}) => {

  const navigate = useNavigate()

  function handleLogout(){
    onLogout()
    navigate("/")
  }



function NavBar() {


return (

    <nav className="navbar">

      <div className="container">
      <div className="navbar-brand">
			{/* <img src= {Logo} alt="logo"/> */}

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

              {/* <NavLink className="nav-link" to="/login">Login / SignUp</NavLink> */}
              {!user ? <NavLink className="nav-link" to="/login">Login / SignUp</NavLink> : <NavLink className="nav-link" onClick={handleLogout}>Logout</NavLink>}

            </li>

          </ul>
        </div>
      </div>
    </nav>
   
  )
}
export default NavBar;

