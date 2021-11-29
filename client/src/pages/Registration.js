import React, {Component} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/navbar';
import Footer from '../components/footer';
import '../css/registration-page.css';
import axios from 'axios';


//Setting initial state of few input boxes for form validation
const initialState={
    name: "",
    email: "",
    password: "",
    nameError: "",
    emailError: "",
    passwordError: "",

};

class RegistrationPage extends Component {

    state = initialState;
    
    //------------------Form handling start------------------------------------------------
    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        })
      };

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    };

    handleNameChange = event => {
        this.setState({
            name: event.target.value
        })
    };

      //Validates the input for the forms to see if it matches requirements
      validate = () => {
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        let regExp = /[a-zA-Z]/g;
        const namePattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;

        // checks for name validation
        if (!namePattern.test(this.state.name)){
            nameError = "Invalid full name"
        }

        //Checks and sets error messages for email 
        if (!this.state.email.includes("@")) {
          emailError = "invalid email, please include @ symbol";
        }

        //Checks and sets error messages for password
        if (!this.state.password.includes("1") && !this.state.password.includes("2") && !this.state.password.includes("3") && !this.state.password.includes("4") && !this.state.password.includes("5") && !this.state.password.includes("6") && !this.state.password.includes("7") && !this.state.password.includes("8") && !this.state.password.includes("9") && !this.state.password.includes("0")){
            passwordError = "password must at least a number";
        }
        if (this.state.password.length <= 6){
            passwordError = "password must be longer than 6 characters";
        }
        if (!regExp.test(this.state.password)){
            passwordError = "password must contain a letter";
        }
        
        this.setState({ nameError });
        this.setState({ emailError });
        this.setState({ passwordError });

        //Return false if password does not match requirements
        if (nameError || emailError || passwordError){
            return false;
        }
    
        return true;
      };

      //Handles the submission of form
      handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        const obj ={
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
          };

        if (isValid) {
            axios.post('http://localhost/bike4joy/registration.php',obj)
            .then(res=> console.log(res.data))
            .catch(error => console.log(error));
            console.log(obj);

            // clear form
            this.setState(initialState);
        }
      };


    render() {
        return (
            <>
                {/* Navbar */}
                <Navigation />
                <Container fluid>
                <Row className="animate__animated animate__slideInDown register-page">
                    <Col className="register-section">
                        <Form onSubmit={this.handleSubmit}>
                            {/* -- Name form -- */}
                            <Form.Label className="title">Registration</Form.Label>
                            <Form.Group size="lg" controlId="name" className="mt-4">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                autoFocus
                                placeholder="Jane Doe"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                            <div style={{ fontSize: 13, color: "red" }}>
                                {this.state.nameError}
                            </div>
                            </Form.Group>
                            {/* -- Email form -- */}
                            <Form.Group size="lg" controlId="email" className="mt-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="name" //Set to type="name" instead of type="email" on purpose to demonstrate that form validation is implemented manually
                                placeholder="name@email.com"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                            <div style={{ fontSize: 13, color: "red" }}>
                                {this.state.emailError}
                            </div>
                            </Form.Group>
                            {/* -- Password form -- */}
                            <Form.Group size="lg" controlId="password" className="mt-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                            <div style={{ fontSize: 13, color: "red" }}>
                                {this.state.passwordError}
                            </div>
                            </Form.Group>
                            {/* <!-- register button --> */}
                            <Button block size="lg" type="submit" className="mt-4">
                                Register
                            </Button>
                        </Form>
                    </Col>
                    
                </Row>
                </Container>
                {/* Footer */}
                <Footer />
            </>
        )
    }
}

export default RegistrationPage;