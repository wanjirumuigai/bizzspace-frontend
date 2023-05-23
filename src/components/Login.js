const loginFormStyle = {
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
  margin: "0 auto",
  fontSize: "25px",
  fontWeight: "bold",
};


export default function Login() {
  return (
    <>
      <h2 style={{ textAlign: "center", margin: "30px auto" }}>
        BizzSpace Login
      </h2>

      <div style={loginFormStyle}>
        <form className="row g-3">
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
            />
          </div>
          <div className="col-12" style={{ textAlign: "center" }}>
            <button type="submit" className="btn btn-primary" style={buttonStyle}>
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
