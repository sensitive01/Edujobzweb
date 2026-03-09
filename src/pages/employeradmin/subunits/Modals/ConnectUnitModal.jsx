import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const ConnectUnitModal = ({ show, onClose, onConnect, organizationid }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter an email address");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/employeradmin/send-connect-otp`,
        { userEmail: email },
      );
      setIsOtpSent(true);
      setSuccess("OTP sent successfully to " + email);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndConnect = async () => {
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/employeradmin/connect-subunit`,
        {
          userEmail: email,
          otp,
          organizationid,
        },
      );
      if (response.data.success) {
        onConnect(response.data.data);
        onClose();
        // Reset states
        setEmail("");
        setOtp("");
        setIsOtpSent(false);
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to connect subunit");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setOtp("");
    setIsOtpSent(false);
    setError("");
    setSuccess("");
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Connect Existing Subunit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Employer Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter employer email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isOtpSent}
            />
            <Form.Text className="text-muted">
              Enter the registered email of the center you want to connect.
            </Form.Text>
          </Form.Group>

          {isOtpSent && (
            <Form.Group className="mb-3">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        {!isOtpSent ? (
          <Button variant="primary" onClick={handleSendOtp} disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={handleVerifyAndConnect}
            disabled={loading}
          >
            {loading ? "Connecting..." : "Verify & Connect"}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ConnectUnitModal;
