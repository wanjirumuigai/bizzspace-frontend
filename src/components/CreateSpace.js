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

  const [location, setLocation] = useState({
    street: "",
    building: "",
    floor_name: "",
    room_no: "",
    town: "",
    location_join: join_locations,
  });

  function join_locations() {
    return `${this.street}, ${this.building}, ${this.floor_name}, ${this.room_no}, ${this.town}`;
  }

  const url = "https://bizzspace-api.onrender.com/";
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    size: "",
    image_url: "",
    space_type: "",
    lease_cost: "",
    user_id: user.user.id,
  });

  function handleLocation(e) {
    setLocation({
      ...location,
      [e.target.name]: e.target.value,
    });
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      location: location.location_join(),
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${url}/spaces`, {
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

        {errors ? (
          <p style={{ textAlign: "center", margin: "10px auto", color: "red" }}>
            {errors}
          </p>
        ) : null}

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

          <div className="mb-1">
            <label htmlFor="street" className="form-label">
              {" "}
              Street Address {" "}
            </label>
            <input
              type="text"
              name="street"
              id="street"
              value={location.street}
              onChange={handleLocation}
              className="form-control"
              required
            />
          </div>

          <div className="mb-1">
            <label htmlFor="building" className="form-label">
              {" "}
              Building Name{" "}
            </label>
            <input
              type="text"
              name="building"
              id="building"
              value={location.building}
              onChange={handleLocation}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="floor_name" className="form-label">
              {" "}
              Floor Name{" "}
            </label>
            <input
              type="text"
              name="floor_name"
              id="floor_name"
              value={location.floor_name}
              onChange={handleLocation}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="room_no" className="form-label">
              {" "}
              Room Number{" "}
            </label>
            <input
              type="text"
              name="room_no"
              id="room_no"
              value={location.room_no}
              onChange={handleLocation}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="town" className="form-label">
              {" "}
              Town {" "}
            </label>
            <input
              type="text"
              name="town"
              id="town"
              value={location.town}
              onChange={handleLocation}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="size" className="form-label">
              {" "}
              Size in Feet{" "}
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
{/* 
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
          </div> */}

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
            <label htmlFor="lease_cost"> Lease Cost in KSH </label>
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
              By clicking Add My Property above, You agree that you have provided
              accurate and non-discriminatory information. You comply with the
              BizzSpace Terms of Service.{" "}
            </h5>
          </section>
        </form>
      </div>
    </>
  );
}

export default CreateSpace;
