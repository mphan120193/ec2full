
import React, { useRef } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import HomeHeader from '../components/HomeHeader';
import Homefooter from '../components/Homefooter';
import ServicesImg from '../assets/images/dentalservices_img.jpg';
import GeneralImg from '../assets/images/generaldentistry_img.jpg';
import CosmeticImg from '../assets/images/cosmeticdentistry_img.jpg';
import RestorativeImg from '../assets/images/restorativedentistry_img.jpg';

const ServicesPage = () => {
  const generalRef = useRef(null);
  const cosmeticRef = useRef(null);
  const restorativeRef = useRef(null);

  const handleScroll = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container className="py-5">
      <HomeHeader />

      <h2 className="text-center mb-5 bg-primary text-white rounded fs-1">SERVICES</h2>

      {/* Hero Section */}
      <Row className="align-items-center mb-5">
        <Col md={6} className="text-center mb-4 mb-md-0">
          <img src={ServicesImg} alt="Services" className="img-fluid rounded" />
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow-sm border-0 rounded-4">
            <p>
              You and your family can take advantage of a full range of dental services here at Chase Dental. Our trained professionals
              provide top quality care to prevent dental problems and treat current conditions.
            </p>
            <ul className="list-unstyled fs-5 mt-3">
              <li className="mb-2 text-primary" role="button" onClick={() => handleScroll(generalRef)}><u>General Dentistry</u></li>
              <li className="mb-2 text-primary" role="button" onClick={() => handleScroll(cosmeticRef)}><u>Cosmetic Dentistry</u></li>
              <li className="mb-2 text-primary" role="button" onClick={() => handleScroll(restorativeRef)}><u>Restorative Dentistry</u></li>
            </ul>
          </Card>
        </Col>
      </Row>

      {/* General Dentistry */}
      <div ref={generalRef} className="mb-5 pt-5">
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <Card className="p-4 shadow-sm border-0 rounded-4 h-100">
              <h3 className="fw-bold mb-3">General Dentistry</h3>
              <p>
                Our goal is to help you maintain a healthy mouth and smile. Preventive care helps stop minor issues from becoming
                major dental problems. We're here to keep your oral health strong and support your overall well‑being.
              </p>
              <Button variant="secondary" className="mt-3">READ MORE</Button>
            </Card>
          </Col>
          <Col md={6} className="text-center">
            <img src={GeneralImg} alt="General Dentistry" className="img-fluid rounded" />
          </Col>
        </Row>
      </div>

      {/* Cosmetic Dentistry */}
      <div ref={cosmeticRef} className="mb-5 pt-5">
        <Row className="align-items-center">
          <Col md={6} className="text-center mb-4 mb-md-0 order-md-1 order-2">
            <img src={CosmeticImg} alt="Cosmetic Dentistry" className="img-fluid rounded" />
          </Col>
          <Col md={6} className="order-md-2 order-1">
            <Card className="p-4 shadow-sm border-0 rounded-4 h-100">
              <h3 className="fw-bold mb-3">Cosmetic Dentistry</h3>
              <p>
                A beautiful smile boosts confidence and brightens your life. Whether through minor adjustments or detailed treatment
                plans, we help transform your smile with precision and care.
              </p>
              <Button variant="secondary" className="mt-3">READ MORE</Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Restorative Dentistry */}
      <div ref={restorativeRef} className="mb-5 pt-5">
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <Card className="p-4 shadow-sm border-0 rounded-4 h-100">
              <h3 className="fw-bold mb-3">Restorative Dentistry</h3>
              <p>
                Restore the function and beauty of your smile. Our restorative treatments repair damaged or missing teeth, helping you
                regain confidence and optimal oral health.
              </p>
              <Button variant="secondary" className="mt-3">READ MORE</Button>
            </Card>
          </Col>
          <Col md={6} className="text-center">
            <img src={RestorativeImg} alt="Restorative Dentistry" className="img-fluid rounded" />
          </Col>
        </Row>
      </div>

      <Homefooter />
    </Container>
  );
};

export default ServicesPage;
