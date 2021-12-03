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
            imgName: "",
            imgFile: "",
            videoName: "",
            videoFile: "",
            addressError: "",
            typeError:"",
            descriptionError:"", 
            user_id: "",
        };
        this.getLocation = this.getLocation.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        // console.log(localStorage.getItem("userID"))
    }

    componentDidMount(){
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        const userID = sessionStorage.getItem('userID');
        if (isLoggedIn){
            // console.log("is logged in")
            this.setState({
                user_id: userID,
            })
        }else{
            this.setState({
                user_id: null,
            })
        }
    }

    resetUserInfo(){
        this.setState({
            address: "",
            parkType:"",
            capacity:"",
            queryRating:"★★★★★",
            description:"",
            imgName: "",
            imgFile: "",
            videoName: "",
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
            imgName: event.target.files[0].name,
            imgFile: event.target.files[0]
        })
    }

    handleVideoFileChange = (event) =>{
        this.setState({
            videoName: event.target.files[0].name,
            videoFile: event.target.files[0]
        })
    }

    handleLatChange = (event) => {
        this.setState({
            lat: event.target.value
        })
    }

    handleLngChange = (event) => {
        this.setState({
            lng: event.target.value
        })
    }

      //Validates the input for the forms to see if it matches requirements
      validate = () => {
        let addressError = "";
        let typeError = "";
        let capacityError = "";
        let descriptionError = "";
        let regExp = /[a-zA-Z]/g;
        let addressRegExp = /^\d+\s[A-z]+\s[A-z]+/;
        let capacityRegExp = /^[1-9]*$/;
        let emptyRegExp = /^(?!\s*$).+/;

        //Checks and sets error messages for address, type and description
        if (!addressRegExp.test(this.state.address)){
          addressError = "Please enter a valid address";
        }
        if (!emptyRegExp.test(this.state.parkType)){
          typeError = "Please make sure to specify a bike parking type";
        }
        if (!emptyRegExp.test(this.state.capacity)){
            capacityError = "Please make sure give an estimate of bicycle capacity quantity";
        }
        if (!Number.isInteger(parseInt(this.state.capacity)) || parseInt(this.state.capacity) <= 0){
            capacityError = "Please enter an integer > 0";
        }
        if (!regExp.test(this.state.description)){
            descriptionError = "Please include a description with characters";
        }
        
        this.setState({addressError});
        this.setState({typeError});
        this.setState({capacityError});
        this.setState({descriptionError});
        //Return false if any of the form inputs does not match with the above requirements
        if (addressError || typeError || capacityError || descriptionError) {
          return false;
        }
        
        return true;
      };

      //Handles the submission of form
      handleSubmit = event =>{
        //Alert shows that location is obtained but not submitted anywhere.
        //alert(`Note: Not submitted anywhere, this is just to make sure geolocation is working. ${this.state.address} ${this.state.type} ${this.state.description} Your location: ${this.state.userLat} ${this.state.userLong}`)
        event.preventDefault()//To prevent data loss written after submitting
        const isValid = this.validate();

        const obj ={
            address: this.state.address,
            parkType: this.state.parkType,
            capacity: this.state.capacity,
            rating: this.state.queryRating,
            description: this.state.description,
            lat: this.state.lat,
            lng: this.state.lng,
            userID: this.state.user_id,
        };

        const formData = new FormData();

        formData.append('imgFile', this.state.imgFile)
        formData.append('vidFile', this.state.videoFile)

        // console.log(obj)
        if (isValid) {
            axios.post("http://3.139.109.205/bike4joy/api/review/submit.php", formData, {params: obj})
            .then(res=> {
                // console.log(res.data)
                if (res.data.message === "successful submission"){
                    alert("Review Submitted")
                    this.resetUserInfo()
                }else {
                    alert("Some errors occured. Try again later")
                }
            })
            .catch(error => console.log(error));
        }
      }
      //------------------Form handling end------------------------------------------------
    
    render() {
        if (!this.state.user_id) return (
            <>
                <Navigation />
                <div className="submission-form">
                <h1>Please log in first to make a review</h1>
                </div>
                <Footer />
            </>
        );
        else return (
            <>
            {/* Navbar */}
                <Navigation />
                <div className="overlay">
                <Form className="submission-form" onSubmit={this.handleSubmit}>
                        {/* ---------------------------Location, type and description input form starts ---------------------------- */}
                    <Form.Group className="animate__animated animate__fadeInLeft mb-3">
                        
                        <Form.Label>Location of the Bike Parking Spot</Form.Label>
                        <Form.Control placeholder="13 Delaware Ave" value={this.state.address} onChange={this.handleAddressChange}/>
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
                            <div style={{ fontSize: 13, color: "red" }}>
                                {this.state.capacityError}
                            </div>
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
                        <Form.Group as={Col} md="6">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control value={this.state.lat} onChange={this.handleLatChange} placeholder="Ex: 43.641867413067914"/>
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control value={this.state.lng} onChange={this.handleLngChange} placeholder="Ex: -79.3873116119053"/>
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
                        <Form.Label>Submit as User ID {this.state.user_id}</Form.Label>
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