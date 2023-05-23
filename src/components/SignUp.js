export default function SignUp() {
  const signupFormStyle = {
    "display": "flex",
    "width": "30%",
    "border": "1px solid #000",
    "border-radius": "20px",
    "margin": "100px auto",
    "padding": "30px"
  };

  return (
    <div style={signupFormStyle}>
      <form class="row g-3">
        {/* Names */}
        <div class="col-md-6">
          <label for="inputFirstName" class="form-label">
            First Name
          </label>
          <input
            type="text"
            class="form-control"
            id="inputFirstName"
            name="firstName"
          />
        </div>
        <div class="col-md-6">
          <label for="inputLastName" class="form-label">
            Last Name
          </label>
          <input
            type="text"
            class="form-control"
            id="inputLastName"
            name="lastName"
          />
        </div>
        {/* Email + Tel */}
        <div class="col-md-6">
          <label for="inputEmail" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            name="email"
          />
        </div>
        <div class="col-md-6">
          <label for="inputTelephone" class="form-label">
            Telephone No
          </label>
          <input
            type="text"
            class="form-control"
            id="inputTelephone"
            name="telephoneNo"
          />
        </div>

        {/* Password Confirmation */}
        <div class="col-md-6">
          <label for="inputPassword" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            name="password"
          />
        </div>
        <div class="col-md-6">
          <label for="inputPasswordConfirmation" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="inputPasswordConfirmation"
            name="passwordConfirmation"
          />
        </div>
        {/* Choose user role */}
        <div class="col-md-12">
          <label for="inputRole" class="form-label">
            I want to:
          </label>
          <select id="inputRole" class="form-select" name="role">
            <option selected disabled>
              Choose...
            </option>
            <option value="space_owner">Lease my space</option>
            <option value="user">Rent a space</option>
          </select>
        </div>
        <div class="col-12" style={{"text-align": "center"}}>
          <button type="submit" class="btn btn-primary">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
}
