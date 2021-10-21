import React, {Component} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/registration-page.css';

class RegistrationPage extends Component {
    render() {
        return (
            <>
                <Navigation />
                <Container fluid>
                <Row className="register-page">
                    <Col className="register-section">
                        <Form>
                            <Form.Label className="title">Registration</Form.Label>
                            <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                            />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password" className="mt-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                            />
                            </Form.Group>
                            <Button block size="lg" type="submit" className="mt-4">
                                Register
                            </Button>
                        </Form>
                    </Col>
                    <Col className="login-section">
                        <Form>
                            <Form.Label className="title">Log In</Form.Label>
                            <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                type="email"
                            />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password" className="mt-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                            />
                            </Form.Group>
                            <Button block size="lg" type="submit" className="mt-4">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
                </Container>
                <Footer />
            </>
        )
    }
}

export default RegistrationPage;