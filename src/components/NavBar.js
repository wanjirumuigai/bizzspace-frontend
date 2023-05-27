import { NavLink, useNavigate } from "react-router-dom";

function NavBar({ user, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/");
  }

  return (
    <div id="site-navbar">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid nav-container">
          <p className="navbar-brand">BizzSpace</p>
          {user ? <p className="currentUser">Hi, {user.user.first_name}</p> : null}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/spaces/new">
                  Add Property
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/reports">
                  Reports
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  Property Dashboard
                </NavLink>
              </li> */}
              <li className="nav-item">
                {!user ? (
                  <NavLink className="nav-link" to="/login">
                    Login / SignUp
                  </NavLink>
                ) : (
                  <NavLink className="nav-link" onClick={handleLogout}>
                    Logout
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    // <nav className="navbar">
    //   <div className="nav-elements">
    //     <ul>
    //       <li>
    //         <NavLink className="nav-link" exact to="/">
    //           Home
    //         </NavLink>
    //       </li>

    //       <li>
    //         <NavLink className="nav-link" to="/space/new">
    //           Add A Property
    //         </NavLink>
    //       </li>

    //       <li>
    //         <NavLink className="nav-link" to="/reports">
    //           Property DashBoard
    //         </NavLink>
    //       </li>

    //       <li>
    //         <NavLink className="nav-link" to="/contact">
    //           Contact
    //         </NavLink>
    //       </li>

    //       <li>
    //         {!user ? (
    //           <NavLink className="nav-link" to="/login">
    //             Login / SignUp
    //           </NavLink>
    //         ) : (
    //           <NavLink className="nav-link" onClick={handleLogout}>
    //             Logout
    //           </NavLink>
    //         )}
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
}
export default NavBar;
