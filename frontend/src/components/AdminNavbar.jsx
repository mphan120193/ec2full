
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

const AdminNavbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleHome = () => navigate("/home");
  const handleCRUDUser = () => navigate("/system/user-manage");
  const handleManageDoctor = () => navigate("/system/manage-doctor");
  const handleManageDoctorSchedule = () =>
    navigate("/system/manage-doctor-schedule");
  const handleCustomerMessage = () => navigate("/system/customer-message");

  const titleName = `Welcome ${userInfo.firstName}`;

  return (
    <Navbar bg="info" expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand
          onClick={handleHome}
          className="fw-bold text-white cursor-pointer"
          style={{ cursor: "pointer" }}
        >
          SunShine Dental
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <NavDropdown title="System" id="system-menu">
              <NavDropdown.Item onClick={handleCRUDUser}>
                CRUD User
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleManageDoctor}>
                Manage Doctor
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleManageDoctorSchedule}>
                Manage Doctor Appointment
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleCustomerMessage}>
                Customer Messages
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className="ms-auto">
            {userInfo ? (
              <NavDropdown title={titleName} id="user-menu">
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link onClick={() => navigate("/login")}>
                  <FaSignInAlt className="me-2" /> Sign In
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/register")}>
                  <FaSignOutAlt className="me-2" /> Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;



