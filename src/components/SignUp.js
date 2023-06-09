import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const signupFormStyle = {
  display: "flex",
  width: "30%",
  border: "1px solid #000",
  borderRadius: "20px",
  margin: "30px auto",
  padding: "30px",
};

const buttonStyle = {
  width: "200px",
  height: "50px",
  margin: "20px auto",
  fontSize: "25px",
  fontWeight: "bold",
};

export default function SignUp({onSignup}) {
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
    telephone_no: "",
    email: "",
    role: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("https://bizzspace-api.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          onSignup(user);
          setFormData({
            first_name: "",
            last_name: "",
            password: "",
            password_confirmation: "",
            telephone_no: "",
            email: "",
            role: "",
          });
          navigate("/")
        });
      } else {
        res.json().then((err) => setErrors(err.error));
      }
    });
  }

  return (
    <>
      <h2 style={{ textAlign: "center", margin: "30px auto" }}>
        BizzSpace SignUp
      </h2>
      {errors ? (
        <p style={{ textAlign: "center", margin: "10px auto", color: "red" }}>
          {errors}
        </p>
      ) : null}
      <div style={signupFormStyle}>
        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Names */}
          <div className="col-md-6">
            <label htmlFor="inputFirstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputFirstName"
              name="first_name"
              required
              onChange={handleChange}
              value={formData.first_name}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputLastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputLastName"
              name="last_name"
              required
              onChange={handleChange}
              value={formData.last_name}
            />
          </div>
          {/* Email + Tel */}
          <div className="col-md-6">
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
              value={formData.email}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputTelephone" className="form-label">
              Telephone No
            </label>
            <input
              type="text"
              className="form-control"
              id="inputTelephone"
              name="telephone_no"
              required
              onChange={handleChange}
              value={formData.telephone_no}
            />
          </div>

          {/* Password Confirmation */}
          <div className="col-md-6">
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
              value={formData.password}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPasswordConfirmation" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPasswordConfirmation"
              name="password_confirmation"
              required
              onChange={handleChange}
              value={formData.password_confirmation}
            />
          </div>
          {/* Choose user role */}
          <div className="col-md-12">
            <label htmlFor="inputRole" className="form-label">
              I want to:
            </label>
            <select
              id="inputRole"
              className="form-select"
              name="role"
              onChange={handleChange}
              required
            >
              <option selected disabled>
                Choose...
              </option>
              <option value="space_owner">Lease my space</option>
              <option value="user">Rent a space</option>
            </select>
          </div>
          <div className="col-12" style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={buttonStyle}
            >
              SIGN UP
            </button>
          </div>
        </form>
      </div>
      <p className="to-auth">
        Already have an account?{" "}
        <NavLink className="auth-link nav-link" to="/login">
          Login
        </NavLink>
      </p>
    </>
  );
}
