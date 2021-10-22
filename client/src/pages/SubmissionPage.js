import React, {Component} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/submission-page.css';

class SubmissionPage extends Component {
    render() {
        return (
            <>
                <Navigation />
                <div className="overlay">
                <Form className="submission-form">
                    
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Location of the Bike Parking Spot</Form.Label>
                        <Form.Control placeholder="35 Front Street West" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="parkingType">
                        <Form.Label>Bike Parking Type</Form.Label>
                        <Form.Control placeholder="Bike Rack, Indoor Bike Shelter, etc" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Ex. Very clean with lots of shades, very nice for a summer cycling break."/>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="longitude">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control placeholder="Ex: 43.641867413067914"/>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="latitude">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control placeholder="Ex: -79.3873116119053"/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="image" className="mb-3" >
                            <Form.Label>Upload Image (Optional)</Form.Label>
                            <Form.Control type="file" accept="image/*" />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="video" className="mb-3">
                            <Form.Label>Upload Video (Optional)</Form.Label>
                            <Form.Control type="file" accept="video/*" />
                        </Form.Group>
                    </Row>
                    
                </Form>
                </div>
                <Footer />
            </>
        )
    }
}

export default SubmissionPage;