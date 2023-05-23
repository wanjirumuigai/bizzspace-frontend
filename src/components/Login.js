import { useState } from "react";

export default function Login() {
  return (
    <>
      <h2 style={{ textAlign: "center", margin: "30px auto" }}>
        BizzSpace Login
      </h2>

      <div>
        <form className="row g-3">
          {/* Email */}
          <div className="col-md-12">
            <label for="inputEmail" className="form-label">
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
            <label for="inputPassword" className="form-label">
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
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
