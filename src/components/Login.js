import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const loginFormStyle = {
  display: "flex",
  width: "23%",
  height: "386px",
  border: "1px solid #427b01",
  borderRadius: "9px",
  margin: "30px auto",
  padding: "25px",
};

const buttonStyle = {
  width: "200px",
  height: "50px",
  margin: "0 auto",
  fontSize: "25px",
  fontWeight: "bold",
};

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setLoginForm({ ...loginForm, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(loginForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          onLogin(user);
          setLoginForm({
            email: "",
            password: "",
          });
        });
        navigate("/");
      } else {
        res.json().then((err) => setErrors(err.error));
      }
    });
  }

  return (
    <>
      <h2 style={{ textAlign: "center", margin: "30px auto" }}>
        BizzSpace Login
      </h2>
      {errors ? (
        <p style={{ textAlign: "center", margin: "10px auto", color: "red" }}>
          {errors}
        </p>
      ) : null}
      <div style={loginFormStyle}>
        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="col-md-12">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              name="email"
              required
              onChange={handleChange}
              value={loginForm.email}
            />
          </div>

          {/* Password Confirmation */}
          <div className="col-md-12">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              name="password"
              required
              onChange={handleChange}
              value={loginForm.password}
            />
          </div>
          <div className="col-12" style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={buttonStyle}
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
      <p className="to-auth">
        Don't have an account?{" "}
        <NavLink className="auth-link nav-link" to="/signup">
          SignUp
        </NavLink>
      </p>
    </>
  );
}
