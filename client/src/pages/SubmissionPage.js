import React, {Component} from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Navigation from '../components/navbar';
import Footer from '../components/footer';
import '../css/submission-page.css';
import axios from 'axios';


class SubmissionPage extends Component {
    
    //Setting initial state of few input boxes for form validation
    constructor(props) {
        super(props);
        this.state = {
            lat: "",
            lng: "",
            address: "",
            parkType: "",
            capacity: "",
            queryRating: "★★★★★",
            description:"",
            imgFile: "",
            videoFile: "",
            addressError: "",
            typeError:"",
            descriptionError:"", 
            user_id: this.props.location.state.userID,
        };
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
    }

    resetUserInfo(){
        this.setState({
            address: "",
            parkType:"",
            capacity:"",
            queryRating:"★★★★★",
            description:"",
            imgFile: "",
            videoFile: "",
            addressError: "",
            typeError:"",
            descriptionError:"",
        })
    };

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
    handleParkTypeChange = (event) =>{
        this.setState({
            parkType: event.target.value
        })
    }

      //Sets state for capacity of bike parking
    handleCapacityChange = (event) =>{
        this.setState({
            capacity: event.target.value
        })
    }

      //Sets state for rating of bike parking
    handleRatingChange(event){
        this.setState({
            queryRating: event.target.value
        })
    }

      //Sets state for description
    handleDescriptionChange = (event) =>{
        this.setState({
            description: event.target.value
        })
    }

    handleImageFileChange = (event) =>{
        this.setState({
            imgFile: event.target.value
        })
    }

    handleVideoFileChange = (event) =>{
        this.setState({
            videoFile: event.target.value
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
        if (!regExp.test(this.state.parkType)){
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
        //alert(`Note: Not submitted anywhere, this is just to make sure geolocation is working. ${this.state.address} ${this.state.type} ${this.state.description} Your location: ${this.state.userLat} ${this.state.userLong}`)
        event.preventDefault()//To prevent data loss written after submitting
        // const isValid = this.validate();

        const obj ={
            address: this.state.address,
            parkType: this.state.parkType,
            capacity: this.state.capacity,
            rating: this.state.queryRating,
            description: this.state.description,
            imgFile: this.state.imgFile,
            videoFile: this.state.videoFile,
            lat: this.state.lat,
            lng: this.state.lng,
            userID: this.state.user_id,
        };
        console.log(obj)
        // if (isValid) {
        //     axios.post('http://localhost/bike4joy/submission.php',obj)
        //     .then(res=> console.log(res.data))
        //     .catch(error => console.log(error));
        //     console.log(obj);
        //   // clear form
        //   this.resetUserInfo
        // }
      }
      //------------------Form handling end------------------------------------------------
    
    render() {
        // this.getLocation();
        return (
            <>
            {/* Navbar */}
                <Navigation />
                <div className="overlay">
                    <p>User_id {this.state.user_id}</p>
                <Form className="submission-form" onSubmit={this.handleSubmit}>
                        {/* ---------------------------Location, type and description input form starts ---------------------------- */}
                    <Form.Group className="animate__animated animate__fadeInLeft mb-3">
                        <Form.Label>Location of the Bike Parking Spot</Form.Label>
                        <Form.Control placeholder="35 Front Street West" value={this.state.address} onChange={this.handleAddressChange}/>
                        <div style={{ fontSize: 13, color: "red" }}>
                                {this.state.addressError}
                            </div>
                    </Form.Group>
                    <Row className="animate__animated animate__fadeInRight mb-3">
                        <Form.Group as={Col} md="4">
                            <Form.Label>Bike Parking Type</Form.Label>
                        <Form.Control placeholder="Bike Rack, Indoor Bike Shelter, etc" value={this.state.parkType} onChange={this.handleParkTypeChange}/>
                        <div style={{ fontSize: 13, color: "red" }}>
                                {this.state.typeError}
                            </div>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Bicycle Capacity</Form.Label>
                            <Form.Control placeholder="10, 15, 20, etc" value={this.state.capacity} onChange={this.handleCapacityChange}/>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Label>Rating</Form.Label>
                            <Form.Select className="rating-dropdown" onChange={this.handleRatingChange}>
                                <option value="★★★★★">★★★★★</option>
                                <option value="★★★★">★★★★</option>
                                <option value="★★★">★★★</option>
                                <option value="★★">★★</option>
                                <option value="★">★</option>
                            </Form.Select>
                        </Form.Group>
                        
                    </Row>
                    <Form.Group className="animate__animated animate__fadeInLeft mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Ex. Very clean with lots of shades, very nice for a summer cycling break." value={this.state.description} onChange={this.handleDescriptionChange}/>
                        <div style={{ fontSize: 13, color: "red" }}>
                                {this.state.descriptionError}
                            </div>
                    </Form.Group>
                    {/* ---------------------------Location, type and description input form ends ---------------------------- */}

                    {/* ---------------------------Coordinates form starts ---------------------------- */}
                    <Row className="animate__animated animate__fadeInRight mb-3">
                        <Form.Group as={Col} md="6" controlId="longitude" >
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
                        <Form.Group as={Col} md="6" className="mb-3">
                            <Form.Label>Upload Image (Optional)</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={this.handleImageFileChange}/>
                        </Form.Group>
                        <Form.Group as={Col} md="6" className="mb-3" >
                            <Form.Label>Upload Video (Optional)</Form.Label>
                            <Form.Control type="file" accept="video/*" onChange={this.handleVideoFileChange}/>
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