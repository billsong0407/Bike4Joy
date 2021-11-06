import React, {Component} from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Navigation from '../components/navbar';
import Footer from '../components/footer';
import '../css/submission-page.css';

//Setting initial state of few input boxes for form validation
const initialState={
    address: "",
    type:"",
    description:"",
    addressError: "",
    typeError:"",
    descriptionError:"",   
}
class SubmissionPage extends Component {
    
    state = initialState;

    //required contructor for coordinates in react js
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            userLat: null,
            userLong: null,
            
        };
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
      }

      //Check and get current location of user
      getLocation(){
          // if location is supported
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);     
        }else {
            alert("Geolocation is not supported")
        }
    }

    //Sets the state of coordinates to current coordinates
    getCoordinates(position){
        this.setState({ 
            userLat: position.coords.latitude, 
            userLong: position.coords.longitude
        })
    }

    //checks for various location errors and alert the corresponding error
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

      //------------------Form handling start------------------------------------------------
     //Sets state for address
      handleAddressChange= (event) =>{
        this.setState({
            address: event.target.value
        })
      }

    //Sets state for type of bike parking
      handleTypeChange = (event) =>{
        this.setState({
            type: event.target.value
        })
      }

      //Sets state for description
      handleDescriptionChange = (event) =>{
          this.setState({
              description: event.target.value
          })
      }

      //Validates the input for the forms to see if it matches requirements
      validate = () => {
        let addressError = "";
        let typeError = "";
        let descriptionError = "";
        let regExp = /[a-zA-Z]/g;

        //Checks and sets error messages for address, type and description
        if (!regExp.test(this.state.address)){
          addressError = "Please include an address";
        }
        if (!regExp.test(this.state.type)){
          typeError = "Please make sure this is not blank";
        }
        if (!regExp.test(this.state.description)){
            descriptionError = "Please include a description";
        }
        
        //Return false if any of the form inputs does not match with the above requirements
        if (addressError) {
          this.setState({ addressError});
          return false;
        }
        if (typeError) {
            this.setState({typeError});
            return false;
          }
        if (descriptionError) {
            this.setState({descriptionError});
            return false;
          }
        return true;
      };

      //Handles the submission of form
      handleSubmit = event =>{
          //Alert shows that location is obtained but not submitted anywhere.
          alert(`Note: Not submitted anywhere, this is just to make sure geolocation is working. ${this.state.address} ${this.state.type} ${this.state.description} Your location: ${this.state.userLat} ${this.state.userLong}`)
          event.preventDefault()//To prevent data loss written after submitting
          const isValid = this.validate();
        if (isValid) {
          console.log(this.state);
          // clear form
          this.setState(initialState);
        }
      }
      //------------------Form handling end------------------------------------------------

      

    
    render() {
        this.getLocation();
        return (
            <>
            {/* Navbar */}
                <Navigation />
                <div className="overlay">
                <Form className="submission-form" onSubmit={this.handleSubmit}>
                        {/* ---------------------------Location, type and description input form starts ---------------------------- */}
                    <Form.Group className="animate__animated animate__fadeInLeft mb-3" controlId="address">
                        <Form.Label>Location of the Bike Parking Spot</Form.Label>
                        <Form.Control placeholder="35 Front Street West" value={this.state.address} onChange={this.handleAddressChange}/>
                        <div style={{ fontSize: 13, color: "red" }}>
                                {this.state.addressError}
                            </div>
                    </Form.Group>
                    <Form.Group className="animate__animated animate__fadeInRight mb-3" controlId="parkingType">
                        <Form.Label>Bike Parking Type</Form.Label>
                        <Form.Control placeholder="Bike Rack, Indoor Bike Shelter, etc" value={this.state.type} onChange={this.handleTypeChange}/>
                        <div style={{ fontSize: 13, color: "red" }}>
                                {this.state.typeError}
                            </div>
                    </Form.Group>
                    <Form.Group className="animate__animated animate__fadeInLeft mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Ex. Very clean with lots of shades, very nice for a summer cycling break." value={this.state.description} onChange={this.handleDescriptionChange}/>
                        <div style={{ fontSize: 13, color: "red" }}>
                                {this.state.descriptionError}
                            </div>
                    </Form.Group>
                    {/* ---------------------------Location, type and description input form ends ---------------------------- */}

                    {/* ---------------------------Coordinates form starts ---------------------------- */}
                    <Row className="animate__animated animate__fadeInRight mb-3">
                        <Form.Group as={Col} md="6" controlId="longitude">
                            <Form.Label>Longitude</Form.Label>
                            
                            
                            <Form.Control placeholder="Ex: 43.641867413067914"/>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="latitude">
                            <Form.Label>Latitude</Form.Label>
                            
                        
                            <Form.Control placeholder="Ex: -79.3873116119053"/>
                        </Form.Group>
                    </Row>
                    {/* ---------------------------Coordinates form ends ---------------------------- */}

                    {/* <!-- Obtional image and video submission fields --> */}
                    <Row className="animate__animated animate__fadeInLeft mb-3">
                        <Form.Group as={Col} md="6" controlId="image" className="mb-3" >
                            <Form.Label>Upload Image (Optional)</Form.Label>
                            <Form.Control type="file" accept="image/*" />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="video" className="mb-3">
                            <Form.Label>Upload Video (Optional)</Form.Label>
                            <Form.Control type="file" accept="video/*" />
                        </Form.Group>

                        {/* <!-- submit button --> */}
                        <Button block size="lg" type="submit" className="animate__animated animate__fadeInRight mt-4">
                                Submit
                            </Button>
                    </Row>
                    
                </Form>
                </div>
                {/* Footer */}
                <Footer />
            </>
        )
    }
}

export default SubmissionPage;