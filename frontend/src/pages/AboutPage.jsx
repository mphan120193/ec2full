

import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import HomeHeader from "../components/HomeHeader";
import Homefooter from "../components/Homefooter";
import aboutImg from "../assets/images/aboutus_img.jpg";
//import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';

export default function AboutPage() {
    //useAutoRefreshToken();
  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      <HomeHeader />

      <Container className="py-5">
      <h2 className="text-center mb-5 bg-primary text-white rounded fs-1">ABOUT</h2>

        <Row className="align-items-center g-4">
          <Col md={6} className="text-center">
            <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
              <Image src={aboutImg} alt="About Us" fluid />
            </Card>
          </Col>

          <Col md={6}>
            <Card className="border-0 shadow-sm rounded-4 p-4">
              <Card.Body className="fs-5">
                <p>
                  <span className="fw-bold">At SunShine Dental of St. Petersburg, Florida</span>, we do
                  everything possible to ensure your utmost comfort and safety.
                  From the receptionist to the doctor himself, everyone at our
                  dental practice is intelligent, gentle, patient, and caring
                  when it comes to your health and your budget.
                </p>
                <p className="mt-3">
                  <span className="fw-bold fs-4">Compassionate Care</span>
                </p>
                <p>
                  Our professionals understand that a dental visit can be a
                  stressful time. Therefore, we deliver your treatment
                  information in a straightforward manner designed to make you
                  comfortable while helping you make informed decisions about
                  your dental care. We also help you prioritize your concerns and
                  design a treatment schedule that meets your needs.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Homefooter />
    </div>
  );
}
