import React, {Component} from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
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
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { "type": "Feature", "properties": { "_id": 5056, "ADDRESS_POINT_ID": 30069161, "ADDRESS_NUMBER": "35", "LINEAR_NAME_FULL": "York St", "ADDRESS_FULL": "35 York St", "POSTAL_CODE": "M5J 0C7", "MUNICIPALITY": "former Toronto", "CITY": "Toronto", "WARD": "Spadina-Fort York (10)", "PLACE_NAME": null, "GENERAL_USE_CODE": 115001, "CENTRELINE_ID": 13975053, "LO_NUM": 35, "LO_NUM_SUF": null, "HI_NUM": null, "HI_NUM_SUF": null, "LINEAR_NAME_ID": 4735, "X": null, "Y": null, "LONGITUDE": null, "LATITUDE": null, "ID": 54, "PARKING_TYPE": "Angled Bike Rack", "FLANKING": "Front St W", "BICYCLE_CAPACITY": 30, "SIZE_M": 2.9, "YEAR_INSTALLED": 2015, "BY_LAW": null, "DETAILS": null, "OBJECTID": 25 }, "geometry": { "type": "Point", "coordinates": [ -79.381465101411194, 43.643790673159501 ] } },
                { "type": "Feature", "properties": { "_id": 5057, "ADDRESS_POINT_ID": 30069163, "ADDRESS_NUMBER": "35", "LINEAR_NAME_FULL": "York St", "ADDRESS_FULL": "35 York St", "POSTAL_CODE": "M5J 0C7", "MUNICIPALITY": "former Toronto", "CITY": "Toronto", "WARD": "Spadina-Fort York (10)", "PLACE_NAME": null, "GENERAL_USE_CODE": 115001, "CENTRELINE_ID": 13975053, "LO_NUM": 35, "LO_NUM_SUF": null, "HI_NUM": null, "HI_NUM_SUF": null, "LINEAR_NAME_ID": 4735, "X": null, "Y": null, "LONGITUDE": null, "LATITUDE": null, "ID": 54, "PARKING_TYPE": "Angled Bike Rack", "FLANKING": "Front St W", "BICYCLE_CAPACITY": 30, "SIZE_M": 2.9, "YEAR_INSTALLED": 2015, "BY_LAW": null, "DETAILS": null, "OBJECTID": 25 }, "geometry": { "type": "Point", "coordinates": [ -79.38257283571842, 43.64604389375239 ] } },
                { "type": "Feature", "properties": { "_id": 5058, "ADDRESS_POINT_ID": 30069164, "ADDRESS_NUMBER": "35", "LINEAR_NAME_FULL": "York St", "ADDRESS_FULL": "35 York St", "POSTAL_CODE": "M5J 0C7", "MUNICIPALITY": "former Toronto", "CITY": "Toronto", "WARD": "Spadina-Fort York (10)", "PLACE_NAME": null, "GENERAL_USE_CODE": 115001, "CENTRELINE_ID": 13975053, "LO_NUM": 35, "LO_NUM_SUF": null, "HI_NUM": null, "HI_NUM_SUF": null, "LINEAR_NAME_ID": 4735, "X": null, "Y": null, "LONGITUDE": null, "LATITUDE": null, "ID": 54, "PARKING_TYPE": "Angled Bike Rack", "FLANKING": "Front St W", "BICYCLE_CAPACITY": 30, "SIZE_M": 2.9, "YEAR_INSTALLED": 2015, "BY_LAW": null, "DETAILS": null, "OBJECTID": 25 }, "geometry": { "type": "Point", "coordinates": [ -79.38063545860469, 43.64531017421497 ] } }
            ],
        }
    }
    render() {
        return (
            <>
                <Navigation />
                <Container className="results-page">
                    <p>3 results found</p>
                    <div className="results-map-section">
                        <Map
                            lat={this.state.data[0].geometry.coordinates[1]}
                            lng={this.state.data[0].geometry.coordinates[0]}
                            zoom={14}
                            mapData={this.state.data}
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