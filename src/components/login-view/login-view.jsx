import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    //prevent reloading page which is default behavior of form submit
    e.preventDefault();

    const data = {
      username: username,
      password: password
    };

    fetch("https://my-flix-2a35e956c61d.herokuapp.com/login", {
      // fetch("http://localhost:8080/login", { // for local testing
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
          console.log("No such user in the database");
        }
      })
      .catch((er) => {
        alert("Login failed");
        console.error("Error:", er);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formLoginUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formLoginPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="mt-3">Log In</Button>
    </Form>
  );
};

// Props constraints
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};