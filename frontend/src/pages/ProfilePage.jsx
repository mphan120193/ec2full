import React from 'react';
import './ProfilePage.scss';
import HomeHeader from '../components/HomeHeader';
import Homefooter from '../components/Homefooter';
import { useParams } from 'react-router-dom';

//import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';

import { Container, Row, Col, Card, ListGroup, Badge, Alert, Spinner } from 'react-bootstrap';
import { FaUserCircle, FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa';

import { useGetAllUserQuery, useGetAppointmentByUserIDQuery } from '../slices/userApiSlice';
import {useGetDoctorListQuery} from '../slices/doctorApiSlice';


import {ROLES_LIST} from '../utils/roles_list';
import {TIME_LIST} from '../utils/code_list';
import {STATUS_LIST} from '../utils/code_list';







const ProfilePage = () => {
    //useAutoRefreshToken();
    const { id: userID } = useParams();
    


    const {
        data: userDataArray, 
        isLoading: isUserLoading,
        isError: isUserError,
        error: userError,
    } = useGetAllUserQuery({ id: userID }, { skip: !userID });

    const {
        data: appointmentListResponse, 
        isLoading: isLoadingAppointments,
        isError: isErrorAppointments,
        error: appointmentsError, 
        
    } = useGetAppointmentByUserIDQuery({ id: userID }, { skip: !userID });

    const userInfo = userDataArray?.[0] || null;
    const appointments = appointmentListResponse || [];
    const { data: doctorArrList, isLoading, isError, error } = useGetDoctorListQuery();

    let doctorNameList={}
    if(doctorArrList?.data){

        doctorNameList = doctorArrList?.data.reduce((accumulator, currentItem) => {
            // 1. Get the dynamic key (convert id to string to match your example format)
            const key = String(currentItem._id);
            
            // 2. Assign the name (value) to the new dynamic key in the accumulator
            accumulator[key] = currentItem.firstName;
            
            // 3. Return the accumulator for the next iteration
            return accumulator;
          }, {});
          

    }

    

    

    
    const overallLoading = isUserLoading || isLoadingAppointments;
    
    const overallError = isUserError || isErrorAppointments;

    


    if (overallLoading) {
        return (
            <Container className="my-5 text-center">
                <Spinner animation="border" role="status" className="text-primary" />
                <p className="mt-2">Loading user profile and appointments...</p>
            </Container>
        );
    }


    if (overallError) {
        
        return (
            <Container className="my-5 text-center">
                <Alert variant="danger">
                    <p>Error loading profile data. Please try again.</p>
                    {userError && <p>User data error: {userError?.data?.message || userError.error}</p>}
                    {appointmentsError && <p>Appointments error: {appointmentsError?.data?.message || appointmentsError.error}</p>}
                </Alert>
            </Container>
        );
    }













    if (!userInfo) {
        return (
            <Container className="my-5 text-center">
                <Alert variant="info">No user found with ID: <strong>{userID}</strong>.</Alert>
            </Container>
        );
    }
    const roleNames = Object.entries(ROLES_LIST)
    .filter(([_, value]) => userInfo.roles.includes(value))
    .map(([key]) => key);

    
    return (
        <>
        <HomeHeader/>
        <Container className="my-5 profile-container">
            <h2 className="text-center mb-4 profile-heading">{userInfo.firstName} Profile</h2>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-lg profile-card">
                        <Card.Body>
                            <div className="text-center mb-4">
                                <FaUserCircle size={80} className="text-primary profile-avatar" />
                                <h3 className="mt-3">{userInfo.firstName} {userInfo.lastName}</h3>
                                
                                <p className="text-muted">{roleNames || 'Patient'}</p>
                            </div>

                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <FaEnvelope className="me-2 text-secondary" /> Email: <strong>{userInfo.email}</strong>
                                </ListGroup.Item>

                                {userInfo.phone && (
                                    <ListGroup.Item>
                                        <FaPhone className="me-2 text-secondary" /> Phone: <strong>{userInfo.phone}</strong>
                                    </ListGroup.Item>
                                )}

                                {userInfo.address && (
                                    <ListGroup.Item>
                                        <FaCalendarAlt className="me-2 text-secondary" /> Address: <strong>{userInfo.address}</strong>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center mt-5">
                <Col md={10} lg={8}>
                    <Card className="shadow-lg appointments-card">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <h4><FaCalendarAlt className="me-2" />Your Appointments</h4>
                            
                        </Card.Header>
                        <Card.Body>
                            
                            {isLoadingAppointments ? (
                                <div className="text-center">
                                    <Spinner animation="border" role="status" className="text-primary" />
                                    <p className="mt-2">Loading appointments...</p>
                                </div>
                            ) : isErrorAppointments ? (
                                <Alert variant="danger" className="text-center">
                                    Error loading appointments: {appointmentsError?.data?.message || appointmentsError?.error || 'Unknown error'}
                                </Alert>
                            ) : appointments.length === 0 ? ( 
                                <Alert variant="info" className="text-center">
                                    You have no appointments.
                                </Alert>
                            ) : (
                                <ListGroup variant="flush">
                                    {appointments.map((appointment) => (
                                        
                                        <ListGroup.Item key={appointment.id || appointment._id} className="d-flex justify-content-between align-items-center appointment-item">
                                            <div>
                                                <strong>{appointment.date} at {TIME_LIST[appointment.timeType]}</strong>
                                                <br />
                                                
                                                <small>Doctor Name: <span className='fw-bold'>{doctorNameList[appointment.doctorID].toUpperCase()}</span></small>
                                                
                                                <br />
                                                <small className="text-muted">Message: {appointment.message}</small>
                                            </div>
                                            <div>
                                                
                                                <Badge bg={appointment.statusID === 'S2' ? 'success' : appointment.statusID === 'S1' ? 'warning' : 'danger'}>
                                                    {STATUS_LIST[appointment.statusID.toUpperCase()]}
                                                </Badge>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Homefooter/>
        </>
        
    );




}

export default ProfilePage;