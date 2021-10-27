import React, {Component} from 'react';
import { Table, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Navigation from '../components/navbar';
import Footer from '../components/footer';
import Map from '../components/map';

import "../css/results-page.css"
const { GOOGLE_MAPS_API_KEY } = require("../config.json");

function ResultCard(props) {

    return (
        <Row className="no-gutters result-card">
            <Col className="col-auto">
                <img className="street-image" src={props.imgURL} alt="p1"></img>
            </Col>
            <Col>
                <Table striped hover responsive>
                    <tr>
                        <td className="first-column">Address:</td>
                        <td>{props.address}</td>
                    </tr>
                    <tr>
                        <td className="first-column">Postal Code:</td>
                        <td>{props.postalCode}</td>
                    </tr>
                    <tr>
                        <td className="first-column">Reviews:</td>
                        <td>{props.rating}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><a href="#search-form" className="btn btn-success btn-lg active try-button" role="button"
                        aria-pressed="true">Details</a></td>
                    </tr>
                </Table>
            </Col>
        </Row>
    );
}

class ResultsPage extends Component {
    render() {
        return (
            <>
                <Navigation />
                <Container className="results-page">
                    <p>3 results found</p>
                    <div className="results-map-section">
                        <Map
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `100%` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        >
                        </Map>
                    </div>
                    <div className="result-cards">
                        <ResultCard 
                            imgURL="../images/p1.jpg"
                            address="46 York St"
                            postalCode="M5J 1E5"
                            rating="★★★★★ (2 reviews)"
                        />
                        <ResultCard 
                            imgURL="../images/p2.jpg"
                            address="35 York St"
                            postalCode="M5J 0C7"
                            rating="★★★☆☆ (3 reviews)"
                        />
                        <ResultCard 
                            imgURL="../images/p3.jpg"
                            address="61 Front St W"
                            postalCode="M5J 1E5"
                            rating="★★★★☆ (7 reviews)"
                        />
                    </div>
                </Container>
                <Footer />
            </>
        )
    }
}

export default ResultsPage;