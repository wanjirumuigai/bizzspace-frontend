import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Reports = ({ user }) => {
  const [booked, setBooked] = useState([]);
  const [available, setAvailable] = useState([]);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const url = "https://bizzspace-api.onrender.com";

  useEffect(() => {
    fetch(`${url}/booked`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

        Authorization: `Bearer ${user.jwt}`,
      },
    }).then((res) => {
      if (!res.ok) {
        navigate("/login");
      } else {
        res.json().then((data) => {
          setBooked(data);
          setIsLoaded(true);
        });
      }
    });
  }, []);

  useEffect(() => {
    fetch("available", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

        Authorization: `Bearer ${user.jwt}`,
      },
    }).then((res) => {
      if (!res.ok) {
        navigate("/login");
      } else {
        res.json().then((data) => {
          setAvailable(data);
        });
      }
    });
  }, []);

  const arrayCost = booked.map((item) => item.lease_cost);
  const totalCost = arrayCost.reduce((a, b) => a + b, 0);

  const totalArray = booked.map((item) => item);
  const totalAvailable = available.map((item) => item);

  if (!isLoaded) return <p>Loading ...</p>;
  return (
    <div>
      <table className="GeneratedTable">
        <thead>
          <tr>
            <td>SNo.</td>
            <th>Description</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.</td>
            <td>Total Amount Collected</td>
            <td>Ksh. {new Intl.NumberFormat().format(totalCost)}</td>
          </tr>
          <tr>
            <td>2.</td>
            <td>Total Bookings</td>
            <td>{totalArray.length} bookings</td>
          </tr>
          <tr>
            <td>3.</td>
            <td>Available Listings</td>
            <td>{totalAvailable.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
