import { useState } from "react";
// import { Button, Modal, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

export const DeregisterUser = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const token = localStorage.getItem("token");
  const username = JSON.parse(localStorage.getItem("user")).username;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(
        `https://my-flix-2a35e956c61d.herokuapp.com/users/${username}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to delete account");
      }

      // Clear auth data
      localStorage.clear();

      // Redirect to login or home page
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="mt-4">
      <Button variant="danger" onClick={() => setShowConfirm(true)} className="mb-3 btn-lg">
        Deregister Account
      </Button>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deregistration</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you sure you want to permanently delete your account? This action
            cannot be undone.
          </p>

          {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes, delete my account"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
