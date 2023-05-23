import {useState} from "react"


const signupFormStyle = {
  "display": "flex",
  "width": "30%",
  "border": "1px solid #000",
  "borderRadius": "20px",
  "margin": "100px auto",
  "padding": "30px"
};

export default function SignUp() {
  const [formData, setFormData] = useState({
    first_name : "",
    last_name: "",
    password: "",
    password_confirmation: "",
    telephone_no: "",
    email: "",
    role: ""
  })


  function handleChange(e){
    const name = e.target.name
    const value = e.target.value

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e){
    e.preventDefault()

    console.log(formData)
  }

  return (
    <div style={signupFormStyle}>
      <form className="row g-3" onSubmit={handleSubmit}>
        {/* Names */}
        <div className="col-md-6">
          <label for="inputFirstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputFirstName"
            name="first_name"
            onChange={handleChange}
            value={formData.first_name}
          />
        </div>
        <div className="col-md-6">
          <label for="inputLastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputLastName"
            name="last_name"
            onChange={handleChange}
            value={formData.last_name}
          />
        </div>
        {/* Email + Tel */}
        <div className="col-md-6">
          <label for="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="col-md-6">
          <label for="inputTelephone" className="form-label">
            Telephone No
          </label>
          <input
            type="text"
            className="form-control"
            id="inputTelephone"
            name="telephone_no"
            onChange={handleChange}
            value={formData.telephone_no}
          />
        </div>

        {/* Password Confirmation */}
        <div className="col-md-6">
          <label for="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <div className="col-md-6">
          <label for="inputPasswordConfirmation" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPasswordConfirmation"
            name="password_confirmation"
            onChange={handleChange}
            value={formData.password_confirmation}
          />
        </div>
        {/* Choose user role */}
        <div className="col-md-12">
          <label for="inputRole" className="form-label">
            I want to:
          </label>
          <select id="inputRole" className="form-select" name="role" onChange={handleChange}>
            <option selected disabled>
              Choose...
            </option>
            <option value="space_owner">Lease my space</option>
            <option value="user">Rent a space</option>
          </select>
        </div>
        <div className="col-12" style={{"textAlign": "center"}}>
          <button type="submit" className="btn btn-primary">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
}
