import React, {Component} from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Navigation from '../components/navbar';
import Footer from '../components/footer';
import Map from '../components/map';

import "../css/results-page.css"
const { GOOGLE_MAPS_API_KEY } = require("../config.json");

// Result Card Component
class ResultCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            parkingLoc: props.location,
            address: props.location.ADDRESS,
            postalCode: props.location.POSTAL_CODE,
            rating: props.rating,
            loc_id: props.location.id,
            parkingType: props.location.PARKING_TYPE,
            redirect: false,
        }
    }
    toSinglePage = () => {
        this.setState({
            redirect: true,
        })
    }
    render(){
        if (this.state.redirect) return (
        <Redirect 
            to={{pathname: `/single/id=${this.state.loc_id}`}} 
        /> )
        else return (
            <Row className="no-gutters result-card">
                <Col className="col-auto">
                    {/* Street Image */}
                    <img className="street-image" src="../images/rack.jpg" alt="location"></img>
                </Col>
                <Col>
                    {/* location tabular information */}
                    <Table striped responsive>
                        <tbody>
                        <tr>
                            {/* location address  */}
                            <td className="first-column">Address:</td>
                            <td>{this.state.address}</td>
                        </tr>
                        <tr>
                            {/* location postal code  */}
                            <td className="first-column">Postal Code:</td>
                            <td>{this.state.postalCode}</td>
                        </tr>
                        <tr>
                            {/* location rating  */}
                            <td className="first-column">Parking Type:</td>
                            <td>{this.state.parkingType}</td>
                        </tr>
                        <tr>
                            {/* location rating  */}
                            <td className="first-column">Ratings:</td>
                            { this.state.rating ? (<td>{this.state.rating}</td>):((<td>Any Ratings</td>))}
                        </tr>
                        <tr>
                            {/* link to location details (single object page)  */}
                            <td></td>
                            <td><Button onClick={this.toSinglePage} className="btn-success" aria-pressed="true">Details</Button></td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }
}

class ResultsPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // state data
            data: [],
            locations: [],
            defaultLat: 43.6532,
            defaultLng: -79.3832,
            queryAddress: this.props.location.state.address,
            queryRating: this.props.location.state.rating,
        }
    }

    componentDidMount(){
        axios.get("http://127.0.0.1:8000/api/location/get.php", {params: {address: this.state.queryAddress}})
        .then(res => {
            const location = res.data.results
            this.setState({ data: location, defaultLat: location[0].lat, defaultLng: location[0].lng });
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
                            (<Map
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
                        </Map>)}
                        {this.state.data.length === 0 &&
                            (<Map
                            lat={43.6532}
                            lng={-79.3832}
                            zoom={14}
                            showLink={true}
                            mapData={this.state.data}
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `100%` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        >
                        </Map>)}
                    </div>
                    {/* Display results from search form  */}
                    <div className="result-cards">
                        {this.state.data.length > 0 ?
                            (this.state.data.map(location =>(
                                <ResultCard 
                                    location={location}
                                    rating={this.state.queryRating}
                                />
                            ))):(
                            <h1>No Results Found at {this.state.queryAddress}</h1>)
                        }
                    </div>
                </Container>
                <Footer />
            </>
        )
    }
}

export default ResultsPage;