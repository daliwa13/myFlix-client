import { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import PropTypes from "prop-types";

export const UpdateProfileForm = ({ user, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    username: user.username || "",
    password: "",
    email: user.email || "",
    birthDate: user.birthDate ? user.birthDate.slice(0, 10) : "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("token");
  const currentUsername = JSON.parse(localStorage.getItem("user")).username;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await fetch(
        `https://my-flix-2a35e956c61d.herokuapp.com/users/${currentUsername}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to update profile");
      }

      const updatedUser = await response.json();
      setSuccessMessage("Profile updated successfully!");

      // Update localStorage if username changed
      if (updatedUser.username !== currentUsername) {
        localStorage.setItem("username", updatedUser.username);
      }

      if (onUpdateSuccess) {
        onUpdateSuccess(updatedUser);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-primary text-white p-4 mt-4">
      <h3 className="mb-4">Update Profile</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="updateUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="updatePassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value=""
            onChange={handleChange}
            placeholder="Password (old or new) is required to update profile"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="updateEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="updateBirthDate">
          <Form.Label>Birth Date</Form.Label>
          <Form.Control
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="light" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </Form>

      {successMessage && (
        <Alert variant="success" className="mt-3">
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
    </Card>
  );
};

// Props constraints
UpdateProfileForm.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthDate: PropTypes.string,
  }).isRequired,
  onUpdateSuccess: PropTypes.func,
}