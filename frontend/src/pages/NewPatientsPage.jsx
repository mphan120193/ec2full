
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import HomeHeader from '../components/HomeHeader';
import Homefooter from '../components/Homefooter';
import { useNavigate } from 'react-router-dom';
import newPatientImg from '../assets/images/newpatients_img.jpg';
//import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';

export default function NewPatientsPage() {
  const navigate = useNavigate();
  //useAutoRefreshToken();

  return (
    <div className="bg-light py-4">
      <Container>
        <HomeHeader />

        {/* Title */}
        <h2 className="text-center mb-5 bg-primary text-white rounded fs-1">NEW PATIENTS</h2>

        {/* Content Row */}
        <Row className="align-items-center g-4">
          <Col md={6} className="text-center">
            <Image
              src={newPatientImg}
              alt="New Patients"
              fluid
              rounded
            />
          </Col>

          <Col md={6}>
            <p>
              Here at Chase Dental, we love meeting new patients. Part of easing your
              concerns is explaining what you can expect from our practice. When you are
              new to our office, we put in the effort to provide you with a positive and
              comforting experience. Once you have been with us for a while, you can
              continue to expect the highest level of service.
            </p>
            <p>
              We focus on providing quality dental care, excellent customer service, and a
              relaxing environment to maintain a lasting patient relationship. We consider
              your first visit the start of a long-term relationship with you.
            </p>
            <p>
              During your initial appointment, we will perform various tests to assess your
              oral health and create a personalized dental plan. We look forward to meeting
              you!
            </p>
            <p>
              For more information or to{' '}
              <span
                className="text-primary fw-bold"
                role="button"
                onClick={() => navigate('/appointment')}
              >
                request an appointment
              </span>
              , please contact us today at{' '}
              <span className="fw-bold text-primary">(727) 527-4955</span>.
            </p>
          </Col>
        </Row>

        <div className="mt-5">
          <Homefooter />
        </div>
      </Container>
    </div>
  );
}
