import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

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
        console.log("Login response: ", data);
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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

// Props constraints
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};