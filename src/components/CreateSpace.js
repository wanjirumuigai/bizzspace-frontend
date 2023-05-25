import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const formStyle = {
  width: "35%",
  border: "grey solid 1px",
  borderRadius: "11px",
  padding: "30px",
  margin: "60px auto 20px",
};

function CreateSpace({ user }) {
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    image_url: "",
    location: "",
    space_type: "",
    lease_cost: "",
    user_id: user.user.id,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/spaces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.jwt}`,
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newSpace) => navigate(`/spaces/${newSpace.id}`));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
      <div className="form-container container-fluid" style={formStyle}>
        <section>
          <h2> Add Your Property </h2>
        </section>

        <form className="row g-3 align-items-left" onSubmit={handleSubmit}>
          <div className="mb-1">
            <label htmlFor="name" className="form-label">
              Property Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="size" className="form-label">
              {" "}
              Size{" "}
            </label>
            <input
              type="number"
              name="size"
              id="size"
              value={formData.size}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="location" className="form-label">
              {" "}
              Location{" "}
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-1">
            <label htmlFor="image_url" className="form-label">
              {" "}
              Image URL{" "}
            </label>
            <input
              type="text"
              name="image_url"
              id="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6" style={{ alignSelf: "self-end" }}>
            <label htmlFor="space_type" className="form-label">
              {" "}
              Space Type{" "}
            </label>
            <select
              className="form-select"
              name="space_type"
              id="space_type"
              onChange={handleChange}
              required
            >
              <option selected disabled>
                Space Type...
              </option>
              <option value="office">Office</option>
              <option value="shop">Shop</option>
              <option value="warehouse">Warehouse</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="lease_cost"> Lease Cost </label>
            <input
              type="number"
              name="lease_cost"
              id="lease_cost"
              value={formData.lease_cost}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-12" style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "200px",
                fontWeight: 600,
                fontSize: "20px",
                margin: "0 auto",
              }}
            >
              Add My Property
            </button>
          </div>

          <section>
            <h5 style={{ fontSize: "0.85rem" }}>
              By clicking Add My Property above, I agree that I have provided
              accurate and non-discriminatory information. I comply with the
              BizzSpace Terms and Conditions and the Terms of Service.{" "}
            </h5>
          </section>
        </form>
      </div>
    </>
  );
}

export default CreateSpace;
