import React, {Component} from 'react';
import Navigation from '../components/navbar';
import Footer from '../components/footer';
import Map from '../components/map';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';

import "../css/single-result-page.css";
const { GOOGLE_MAPS_API_KEY } = require("../config.json");

class SingleResultPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { "type": "Feature", "properties": { "_id": 5056, "ADDRESS_POINT_ID": 30069161, "ADDRESS_NUMBER": "35", "LINEAR_NAME_FULL": "York St", "ADDRESS_FULL": "35 York St", "POSTAL_CODE": "M5J 0C7", "MUNICIPALITY": "former Toronto", "CITY": "Toronto", "WARD": "Spadina-Fort York (10)", "PLACE_NAME": null, "GENERAL_USE_CODE": 115001, "CENTRELINE_ID": 13975053, "LO_NUM": 35, "LO_NUM_SUF": null, "HI_NUM": null, "HI_NUM_SUF": null, "LINEAR_NAME_ID": 4735, "X": null, "Y": null, "LONGITUDE": null, "LATITUDE": null, "ID": 54, "PARKING_TYPE": "Angled Bike Rack", "FLANKING": "Front St W", "BICYCLE_CAPACITY": 30, "SIZE_M": 2.9, "YEAR_INSTALLED": 2015, "BY_LAW": null, "DETAILS": null, "OBJECTID": 25 }, "geometry": { "type": "Point", "coordinates": [ -79.381465101411194, 43.643790673159501 ] } }
            ],
            reviews: [

            ],
        }
    }
    render(){
        return (
            <>
                <Navigation />
                <Container className="single-result-page pt-5">
                    <Row className="d-flex align-items-center justify-content-center">
                        <Col className="animate__animated animate__slideInLeft single-map-section">
                            <Map
                                
                                lat={this.state.data[0].geometry.coordinates[1]}
                                lng={this.state.data[0].geometry.coordinates[0]}
                                zoom={14}
                                mapData={this.state.data}
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `100%` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            ></Map>
                        </Col>
                        <Col className="animate__animated animate__slideInRight col-auto single-info">
                            <h2>Information</h2>
                            <Table hover responsive>
                                <tbody>
                                <tr>
                                    <td className="first-column">Address:</td>
                                    <td>{this.state.data[0].properties.ADDRESS_FULL}, {this.state.data[0].properties.CITY}</td>
                                </tr>
                                <tr>
                                    <td className="first-column">Postal Code:</td>
                                    <td>{this.state.data[0].properties.POSTAL_CODE}</td>
                                </tr>
                                <tr>
                                    <td className="first-column">Type:</td>
                                    <td>{this.state.data[0].properties.PARKING_TYPE}</td>
                                </tr>
                                <tr>
                                    <td className="first-column">Bicycle Capacity</td>
                                    <td>{this.state.data[0].properties.BICYCLE_CAPACITY}</td>
                                </tr>
                                <tr>
                                    <td className="first-column">Size:</td>
                                    <td>{this.state.data[0].properties.SIZE_M}</td>
                                </tr>
                                <tr>
                                    <td className="first-column">Year Installed:</td>
                                    <td>2015</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <div className="py-5">
                        <h1>Reviews:</h1>
                        <Row xs={1} md={3} className="g-4">
                            
                            <Col>
                            <Card>
                                <Card.Img variant="top" src="/images/p1.jpg" className="review-card-visual" />
                                <Card.Body>
                                <Card.Text>
                                    <p>Ratings: ★★★★☆</p>
                                    <p>Racks are in good quality - Bob Leung</p>
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            </Col>
                            <Col>
                            <Card>
                                <div className="video-wrapper">
                                    <video className="review-card-visual" controls>
                                        <source src="/videos/samplevideo.mp4" type="video/mp4" />
                                    </video>
                                </div>
                                <Card.Body>
                                <Card.Text>
                                    <p>Ratings: ★★☆☆☆</p>
                                    <p>Many abandoned bikes are taking the spots - Jasper Percy</p>
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            </Col>
                            <Col>
                            <Card>
                                <Card.Img variant="top" src="/images/p2.jpg" className="review-card-visual" />
                                <Card.Body>
                                <Card.Text>
                                    <p>Ratings: ★★★★☆</p>
                                    <p>Parking spots are clean and safe - Pradeep Kumar</p>
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            </Col>
                            {/* <Col>
                            <Card>
                                <Card.Img variant="top" src="/images/p3.jpg" className="review-card-visual" />
                                <Card.Body>
                                <Card.Text>
                                    <p>Ratings: ★★★★☆</p>
                                    <p>Racks are in good quality - Bob Leung</p>
                                </Card.Text>
                                </Card.Body>
                            </Card>
                            </Col> */}
                            
                        </Row>
                        {/* <Row xs={1} md={2} className="g-4">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <Col>
                                <Card>
                                    <Card.Img variant="top" src="holder.js/100px160" />
                                    <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                                </Col>
                            ))}
                            </Row> */}
                    </div>
                </Container>
                <Footer />
            </>
        )
    }
}

export default SingleResultPage;