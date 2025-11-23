

import { useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useGetDoctorListQuery } from "../slices/doctorApiSlice";
import { logout } from "../slices/authSlice";
import logoImage from "/Logo.png";
import React from "react";

const HomeHeader = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data: doctorArrList } = useGetDoctorListQuery();
  const doctorArr = doctorArrList?.data;
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const handleGetDoctorDetail = (doctorID) => {
    navigate(`/get-doctor-detail/${doctorID}`);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      {/* Top Contact Bar */}
      <div className="bg-primary text-white py-2">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <FaMapMarkerAlt className="me-2" />
            5918 DR M.L.K Jr St N St.Petersburg, FL 33703
          </div>
          <div className="d-flex align-items-center">
            <FaPhone className="me-2" /> (727) 310-9596
          </div>
        </Container>
      </div>

      {/* Main Navigation */}
      <Navbar expand="lg" bg="light" className="py-3 shadow-sm">
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={logoImage}
              alt="Sunshine Dental Logo"
              style={{ maxWidth: "150px", height: "auto" }}
              className="me-2"
            />
            <span className="fw-bold text-primary">Sunshine Dental</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {/* ABOUT with doctor dropdown */}

              <NavDropdown
                title={
                  <span
                    onClick={() => navigate("/about")}
                    style={{ cursor: "pointer" }}
                  >
                    ABOUT
                  </span>
                }
                id="about-nav-dropdown"
              >
                {doctorArr && doctorArr.length > 0 ? (
                  doctorArr.map((doctor, index) => (
                    <React.Fragment key={doctor._id}>
                      <NavDropdown.Item
                        onClick={() => handleGetDoctorDetail(doctor._id)}
                      >
                        {doctor.firstName}
                      </NavDropdown.Item>
                      {index < doctorArr.length - 1 && <NavDropdown.Divider />}
                    </React.Fragment>
                  ))
                ) : (
                  <NavDropdown.Item disabled>
                    No Doctors Available
                  </NavDropdown.Item>
                )}
              </NavDropdown>

              <Nav.Link onClick={() => navigate("/new-patient")}>
                NEW PATIENT
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/appointment")}>
                APPOINTMENTS
              </Nav.Link>

              {/* SERVICES */}
              
              <Nav.Link onClick={() => navigate("/services")}>
              SERVICES
              </Nav.Link>

              <Nav.Link onClick={() => navigate("/contact")}>CONTACT</Nav.Link>
            </Nav>

            {/* Authentication Buttons */}
            <Nav className="ms-auto">
              {userInfo ? (
                <NavDropdown
                  title={userInfo.firstName || "Profile"}
                  id="user-dropdown"
                >
                  <NavDropdown.Item
                    onClick={() => navigate(`/profile/${userInfo._id}`)}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    <FaSignOutAlt className="me-2" /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Button
                    variant="outline-primary"
                    className="me-2"
                    onClick={() => navigate("/login")}
                  >
                    <FaSignInAlt className="me-1" /> Sign In
                  </Button>

                  <Button
                    variant="primary"
                    onClick={() => navigate("/register")}
                  >
                    <FaUserPlus className="me-1" /> Register
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default HomeHeader;
