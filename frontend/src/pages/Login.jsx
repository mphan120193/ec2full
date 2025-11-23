import React, { useState } from "react";
import { useLoginMutation } from "../redux/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Image } from "react-bootstrap";
import logoImage from "/Logo.png";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      localStorage.setItem("accessToken", res.accessToken);

      dispatch(
        setCredentials({
          _id: res._id,
          roles: res.roles,
          firstName: res.firstName,
        })
      );

      navigate("/home");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center py-5 bg-light"
      style={{ minHeight: "100vh" }}
    >
      <Container className="px-3">
        <Card
          className="shadow-lg rounded-4 border-0 mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <Card.Body className="p-4 text-center">
            <Image
              src={logoImage}
              alt="Sunshine Dental Care Logo"
              fluid
              className="mb-4"
              style={{ maxWidth: "240px" }}
            />

            <h1 className="fw-bold mb-3">Welcome Back!</h1>
            <p className="text-muted mb-4">
              Sign in to manage your appointments.
            </p>

            <Form onSubmit={handleLogin} className="text-start">
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

              <Form.Group className="mb-4" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="lg"
                  autoComplete="current-password"
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-100"
              >
                Sign In
              </Button>
            </Form>

            <p className="mt-4 text-muted text-center">
              Don't have an account? <Link to="/register">Register Here</Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
