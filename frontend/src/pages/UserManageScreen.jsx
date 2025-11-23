
import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import plusIcon from '../assets/images/plus-solid.svg';
import { ROLES_LIST } from '../utils/roles_list';
import {
  useGetAllUserQuery,
  useDeleteUserMutation,
  useLazyGetAllUserQuery,
  useEditUserMutation,
} from '../slices/userApiSlice';
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';

const UserManageScreen = () => {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.userInfo.roles);

  const { data: userList, isLoading, isError, error } = useGetAllUserQuery();
  const [triggerGetUser] = useLazyGetAllUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [editUser] = useEditUserMutation();

  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');

  const handleAddNewUser = () => navigate('/system/create-new-user');

  const handleDelete = async (id) => {
    try {
      await deleteUser({ id }).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditUser = async (user) => {
    setShow(true);
    setId(user._id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setAddress(user.address);

    const { data: response } = await triggerGetUser({ id: user._id });
    let img = response[0].image;

    if (img) {
      let imgBinary = new Buffer(img, 'base64').toString('binary');
      setImage(imgBinary);
    } else {
      setImage('');
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      let base64 = await getBase64(file);
      setImage(base64);
    }
  };

  const handleShowImage = () => {
    if (!image) return;
    const newTab = window.open();
    newTab.document.write(`<img src="${image}" alt="Preview" />`);
  };

  const handleSave = async () => {
    try {
      await editUser({ id, firstName, lastName, email, address, image }).unwrap();
      setShow(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (isError) {
    return <p className="text-danger text-center">Error: {error?.message}</p>;
  }

  if (userRole === ROLES_LIST.Doctor) {
    navigate('/system/manage-doctor');
    return null;
  }

  return (
    <div>
      <Header />
      <Container className="py-4">
        <h1 className="text-center mb-4">Manage Users</h1>

        <div className="d-flex justify-content-end mb-3">
          <Button variant="primary" onClick={handleAddNewUser}>
            <img src={plusIcon} alt="add" width="16" className="me-2" />
            Add New User
          </Button>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList?.map((u) => (
              <tr key={u._id}>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.address}</td>
                <td className="d-flex gap-2">
                  <Button variant="secondary" onClick={() => handleEditUser(u)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(u._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Edit Modal */}
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />

                {image && (
                  <div className="mt-3 text-center" onClick={handleShowImage} style={{ cursor: 'pointer' }}>
                    <img src={image} alt="Preview" style={{ width: '120px', borderRadius: '8px' }} />
                  </div>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>

            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default UserManageScreen;
