// src/components/Signup.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import iitk_logo from "../assets/IIT_Kanpur_Logo.svg"

const Signup = ({ userUS }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [UserName , setUserName] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check if any field is empty
    if (!email.trim() || !password.trim() ||  !UserName.trim()) {
      setError("Please enter all details.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, UserName }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }
      navigate("/login");
    } catch (err) {
      console.error("Error during SignUp:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
     <div style={{display: 'flex', margin: "auto",  justifyContent: "center", alignItems: "center", height: "80vh"}}>
        <div style={{}}><img src={iitk_logo} alt="IIT_Logo" /></div>
    <div style={{ width: "500px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
    {/* <div> */}
      {/* <div style={{ width: "500px", margin: "auto", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "8%"}}> */}
        <div className="w-75 h-50 p-4 box">
          <h2 className="mb-3 text-center fw-bolder fs-1">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Control
                type="text"
                placeholder="UserName"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Sign up
              </Button>
            </div>
          </Form>
          <div className="p-4 box mt-3 text-center">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
