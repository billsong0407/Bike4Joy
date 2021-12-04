import React, {Component} from 'react';
import Navigation from '../components/navbar';
import Footer from '../components/footer';
import Map from '../components/map';
import axios from 'axios';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
// import { Link, Redirect } from "react-router-dom";

import "../css/single-result-page.css";
const { GOOGLE_MAPS_API_KEY } = require("../config.json");

//function to display the review card
function ReviewCard(props) {
    return (
        <Col>
            <Card>
                {/* Review with an image */}
                {props.image && 
                    <Card.Img variant="top" src={props.image} className="review-card-visual" />
                }

                 {/* Review with video */}
                {!props.image && props.video && 
                    <div className="video-wrapper">
                        <video className="review-card-visual" controls>
                            <source src="/videos/samplevideo.mp4" type="video/mp4" />
                        </video>
                    </div>
                }

                {!props.image && !props.video && 
                    <Card.Img variant="top" src="../images/no_media.png" className="review-card-visual" />
                }
                <Card.Body>
                <Card.Text>
                    <p>{props.ratings}</p>
                    <p>{props.comment} - {props.author}</p>
                </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

// Single Object page
class SingleResultPage extends Component {

    // Component Constructor
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            reviews: [],
        }
    }

    
    componentDidMount(props){
        //decalre parameter as location id
        let param = this.props.match.params.id
        let param_val = param.split('=')[1]
        //sets state of location id as param_val
        this.setState({
            locID: param_val
        })
        this.getLocation(param_val)
        this.getReviews(param_val)
    }

    //gets location based on location id and set state of location
    getLocation(locID){
        axios.get("http://3.139.109.205/bike4joy/api/location/getByID.php", {params: {id: locID}})
        .then(res => {
            const location = res.data.results
            this.setState({ data: location });
        })
    }

    //get reviews by location id and set state of reviews 
    getReviews(locID){
        axios.get("http://3.139.109.205/bike4joy/api/review/get.php", {params: {id: locID}})
        .then(res => {
            const reviewsData = res.data.results
            console.log(reviewsData)
            this.setState({ reviews: reviewsData });
        })
    }

    render(){
        return (
            <>
                <Navigation />
                <Container className="single-result-page pt-5">
                    <Row className="d-flex align-items-center justify-content-center">
                        <Col className="animate__animated animate__slideInLeft single-map-section">
                            {/* Load Google Maps */}
                            {this.state.data.length > 0 &&
                            (<Map
                                lat={this.state.data[0].lat}
                                lng={this.state.data[0].lng}
                                zoom={12}
                                showLink={true}
                                mapData={this.state.data}
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `100%` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                >
                            </Map>)}
                            {this.state.data.length <= 0 &&
                                (<Map
                                lat={43.6532}
                                lng={-79.3832}
                                zoom={12}
                                showLink={true}
                                mapData={this.state.data}
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `100%` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            >
                            </Map>)}
                        </Col>
                        {/* Display Tabular information */}
                        {this.state.data.length > 0 && (
                        <Col className="animate__animated animate__slideInRight col-auto single-info">
                            <h2>Information</h2>
                            <Table hover responsive>
                                <tbody>
                                <tr>
                                    <td className="first-column">Address:</td>
                                    <td>{this.state.data[0].ADDRESS}</td>
                                </tr>
                                <tr>
                                    <td className="first-column">Postal Code:</td>
                                    <td>{this.state.data[0].POSTAL_CODE}</td>
                                </tr>
                                <tr>
                                    <td className="first-column">Type:</td>
                                    <td>{this.state.data[0].PARKING_TYPE}</td>
                                </tr>
                                <tr>
                                    <td className="first-column">Bicycle Capacity</td>
                                    <td>{this.state.data[0].BICYCLE_CAPACITY}</td>
                                </tr>
                                <tr>
                                    {/* link to location details (single object page)  */}
                                    <td></td>
                                    <td>
                                        <Button href="/submission" className="btn-success" aria-pressed="true">submit a review</Button>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        )}
                    </Row>
                    {/* Show reviews and corresponding ratings */}
                    <div className="py-5">
                        
                        <Row xs={1} md={3} className="g-4">
                            {this.state.reviews.length > 0 && (   
                                this.state.reviews.map(review => (
                                    <ReviewCard 
                                        image={review.IMAGE}
                                        video={review.VIDEO}
                                        ratings={review.RATING}
                                        comment={review.COMMENT}
                                        author={review.USERNAME}
                                    />
                                ))
                            )}
                        </Row>
                        {this.state.reviews.length <= 0 && (
                            <h1>No Reviews Found</h1>
                        )}
                    </div>
                </Container>
                <Footer />
            </>
        )
    }
}

export default SingleResultPage;