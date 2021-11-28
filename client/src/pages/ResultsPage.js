import React, {Component} from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import Navigation from '../components/navbar';
import Footer from '../components/footer';
import Map from '../components/map';

import "../css/results-page.css"
const { GOOGLE_MAPS_API_KEY } = require("../config.json");

// Result Card Component
function ResultCard(props) {

    return (
        <Row className="no-gutters result-card">
            <Col className="col-auto">
                {/* Street Image */}
                <img className="street-image" src={props.imgURL} alt="location"></img>
            </Col>
            <Col>
                {/* location tabular information */}
                <Table striped responsive>
                    <tbody>
                    <tr>
                        {/* location address  */}
                        <td className="first-column">Address:</td>
                        <td>{props.address}</td>
                    </tr>
                    <tr>
                        {/* location postal code  */}
                        <td className="first-column">Postal Code:</td>
                        <td>{props.postalCode}</td>
                    </tr>
                    <tr>
                        {/* location rating  */}
                        <td className="first-column">Ratings:</td>
                        <td>{props.rating}</td>
                    </tr>
                    <tr>
                        {/* link to location details (single object page)  */}
                        <td></td>
                        <td><Button href="/single" className="btn-success"
                        aria-pressed="true">Details</Button></td>
                    </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
}

class ResultsPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // state data
            data: [],
            locations: [],
            queryAddress: this.props.location.state.address,
            queryRating: this.props.location.state.rating,
            
            // locations: [
            //     {"imageURL": "../images/p1.jpg", "postalCode": "M5J 1E5", "address": "46 York St", "rating": "★★★★★ (2 reviews)", "lat": "", "lng": "", "parkingType": "", "capacity": ""},
            //     {"imageURL": "../images/p2.jpg", "postalCode": "M5J 0C7", "address": "35 York St", "rating": "★★★☆☆ (3 reviews)", "lat": "", "lng": "", "parkingType": "", "capacity": ""},
            //     {"imageURL": "../images/p3.jpg", "postalCode": "M5J 1E5", "address": "61 Front St W", "rating": "★★★★☆ (7 reviews)", "lat": "", "lng": "", "parkingType": "", "capacity": ""}
            // ]
        }
    }

    componentDidMount(){
         axios.get("http://127.0.0.1:8000/api/location/get.php", {params: {address: this.state.queryAddress}})
        .then(res => {
            const location = res.data.results
            this.setState({ data: location });
        })
    }

    render() {
        return (
            <>
                <Navigation />
                <Container className="results-page">
                    {/* <p>3 results found</p> */}
                    <div className="results-map-section mt-5">
                        {/* Google Maps Element  */}
                        {this.state.data.length > 0 &&
                            <Map
                                lat={this.state.data[0].lat}
                                lng={this.state.data[0].lng}
                                zoom={14}
                                showLink={true}
                                mapData={this.state.data}
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `100%` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            >
                            </Map>
                        }
                    </div>
                    {/* Display results from search form  */}
                    <div className="result-cards">
                        {this.state.locations.length > 0 &&
                            this.state.locations.map(location =>(
                                <ResultCard 
                                    imgURL={location.imageURL}
                                    address={location.address}
                                    postalCode={location.postalCode}
                                    rating={location.rating}
                                />
                            ))
                        }
                        {this.state.locations.length <= 0 &&
                            <p>No Results Found at {this.state.queryAddress}</p>
                        }
                    </div>
                </Container>
                <Footer />
            </>
        )
    }
}

export default ResultsPage;