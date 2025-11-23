
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/userApiSlice";
import logoImage from '/Logo.png';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await register({ firstName, lastName, email, password }).unwrap();
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center py-5 bg-light" style={{ minHeight: "100vh" }}>
      <Container className="px-3">
        <Card className="shadow-lg rounded-4 border-0 mx-auto" style={{ maxWidth: "600px" }}>
          <Card.Body className="p-4 text-center">
            <Image
              src={logoImage}
              alt="Sunshine Dental Care Logo"
              fluid
              className="mb-4"
              style={{ maxWidth: "240px" }}
            />

            <h1 className="fw-bold mb-3">Create Your Account</h1>
            <p className="text-muted mb-4">Join Sunshine Dental Care today.</p>

            <Form onSubmit={submitHandler} className="text-start">
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  size="lg"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  size="lg"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  autoComplete="email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="lg"
                  autoComplete="new-password"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="confirmPassword">
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  size="lg"
                  autoComplete="new-password"
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-100"
              >
                Register
              </Button>
            </Form>

            <p className="mt-4 text-muted text-center">
              Already have an account? <Link to="/login">Sign In Here</Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
