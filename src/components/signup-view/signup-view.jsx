import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const handleSubmit = (e) => {
    //prevent reloading page which is a default behavior
    e.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birhtDay: birthDay,
    };

    fetch("https://my-flix-2a35e956c61d.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formSignupUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formSignupPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formSignupEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formSignupBirthDay">
        <Form.Label>Birthday:</Form.Label>
        <input
          type="date"
          value={birthDay}
          onChange={(e) => setBirthDay(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

// Props constraints
SignupView.propTypes = {}; // No props are passed to SignupView