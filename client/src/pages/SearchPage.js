import React, {Component} from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';

import Navigation from '../components/navbar';
import Footer from '../components/footer'
import Map from '../components/map';
import '../css/search-page.css';

import 'animate.css';

const { GOOGLE_MAPS_API_KEY } = require("../config.json");
const { parkingData } = require("../data/bike_parking.json")

class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitutde: null,
            userLat: null,
            userLong: null,
            userAddress: null,

        };
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.reverseGeocodeCoordinates = this.reverseGeocodeCoordinates.bind(this);
      }
    
    // Get user location through browser
    getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);     
        }else {
            alert("Geolocation is not supported")
        }
    }

    // get user current coordinates
    getCoordinates(position){
        this.setState({ 
            userLat: position.coords.latitude, 
            userLong: position.coords.longitude
        })
        this.reverseGeocodeCoordinates();
    }

    reverseGeocodeCoordinates(){
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.userLat},${this.state.userLong}&sensor=false&key=${GOOGLE_MAPS_API_KEY}`)
        .then(response => response.json())
        .then(data => this.setState({
            userAddress: data.results[0].formatted_address
        }))
        .catch(error => alert(error))
    }

    // Error exception handling for getting user geolocation
    handleLocationError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
            default:
            alert("An unknown error occurred.")
        }
    }
      

  render() {
    return (
        <>
            <Navigation></Navigation>
            {/* <!-- Banner --> */}
            <div className="main-banner">
                <div className="container">
                    <h1 className="animate__animated animate__backInLeft title">Bike4Joy</h1>
                    <h3 className="animate__animated animate__backInRight subtitle">Find or review an outdoor bike parking place in Toronto</h3>
                    <a href="#search-form" className="animate__animated animate__bounce btn btn-success btn-lg active try-button" role="button"
                        aria-pressed="true">TRY IT NOW!</a>
                </div>

            </div>
            <div className="search-wrapper">
            <div className="search-section container-fluid" id="search-form">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            {/* Information */}
                            <h4 className="animate__animated animate__bounce tag-line">Over 100+ Bike Parking Places in Toronto City</h4>
                            <h2 className="animate__animated animate__bounce title">Find a Bike Parking Place</h2>
                        </div>
                        <div className="col-lg-9">
                            {/* <!-- Search Form --> */}
                            <Form className="input-group">
                                {/* <!-- Dropdown menu --> */}
                                <FloatingLabel controlId="floatingSelectGrid" label="Please Select" className="floating-label">
                                <Form.Select aria-label="Search Location">
                                    <option value="Address">Address</option>
                                    <option value="Postal Code">Postal Code</option>
                                </Form.Select>
                                </FloatingLabel>
                               <Form.Control placeholder={this.state.userAddress} className="input-text"/> 
                                {/* <!-- Rating Dropdowns --> */}
                                <FloatingLabel controlId="floatingSelectGrid" label="Please Select" className="floating-label">
                                <Form.Select>
                                    <option value="any">Any Rating</option>
                                    <option value="5">★★★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="3">★★★</option>
                                    <option value="2">★★</option>
                                    <option value="1">★</option>
                                </Form.Select>
                                </FloatingLabel>         
                                {/* <!-- final search button --> */}     
                                <Button href="/results" variant="success" type="submit" className="search-button">
                                    Search
                                </Button>
                            </Form>
                        </div>
                        
                    </div>
                    <div className="row justify-content-center">
                        {/* Button to get current location */}
                        <Button onClick={this.getLocation} className="mt-1 loc-button"variant="outline-info" >Use current location</Button>
                        <p>Latitude: {this.state.userLat}</p>
                        <p>Longitude: {this.state.userLong}</p>
                    </div>
                </div>
            </div>
            <div className="map-section">
                {/* Display Google Maps */}
                <Map
                    lat={43.6532}
                    lng={-79.3832}
                    zoom={12}
                    mapData={parkingData}
                    showLink={false}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%`, border: `3px solid black` }} />}
                >
                </Map>
            </div>
            </div>
            <Footer />
        </>
    );
  }
}


export default SearchPage;