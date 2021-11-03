import React, {Component} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/navbar';
import Footer from '../components/footer';
import '../css/submission-page.css';

class SubmissionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            userLat: null,
            userLong: null,
            address: '',
            type:'',
            description:''
        };
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
      }

      getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);     
        }else {
            alert("Geolocation is not supported")
        }
    }

    getCoordinates(position){
        this.setState({ 
            userLat: position.coords.latitude, 
            userLong: position.coords.longitude
        })
    }

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
        }
    }

      //------------------Form handling start------------------------------------------------
      handleAddressChange= (event) =>{
        this.setState({
            address: event.target.value
        })
      }

      handleTypeChange = (event) =>{
        this.setState({
            type: event.target.value
        })
      }
      
      handleDescriptionChange = (event) =>{
          this.setState({
              description: event.target.value
          })
      }

      handleSubmit = event =>{
          
          alert(`${this.state.address} ${this.state.type} ${this.state.description} Your location: ${this.state.userLat} ${this.state.userLong}`)
          event.preventDefault()//To prevent data loss written after submitting
      }
      //------------------Form handling end------------------------------------------------

      

    
    render() {
        this.getLocation();
        return (
            <>
                <Navigation />
                <div className="overlay">
                <Form className="submission-form" onSubmit={this.handleSubmit}>
                        
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Location of the Bike Parking Spot</Form.Label>
                        <Form.Control placeholder="35 Front Street West" value={this.state.address} onChange={this.handleAddressChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="parkingType">
                        <Form.Label>Bike Parking Type</Form.Label>
                        <Form.Control placeholder="Bike Rack, Indoor Bike Shelter, etc" value={this.state.type} onChange={this.handleTypeChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Ex. Very clean with lots of shades, very nice for a summer cycling break." value={this.state.description} onChange={this.handleDescriptionChange}/>
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
                        <Button block size="lg" type="submit" className="mt-4">
                                Submit
                            </Button>
                    </Row>
                    
                </Form>
                </div>
                <Footer />
            </>
        )
    }
}

export default SubmissionPage;