
import React from "react";
import { Container, Card, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logoImage from "/Logo.png";

export default function WelcomeScreen() {
  const navigate = useNavigate();

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
              style={{ maxWidth: "260px" }}
            />

            <h1 className="fw-bold mb-3">Welcome to Sunshine Dental Care</h1>
            <p className="text-muted mb-4">
              Your brighter smile starts here. Experience gentle, comprehensive dental care.
            </p>

            <div className="d-grid gap-3 mx-auto" style={{ maxWidth: "350px" }}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Sign In to Your Account
              </Button>

              <Button
                variant="outline-secondary"
                size="lg"
                onClick={() => navigate("/register")}
              >
                Register Now
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

