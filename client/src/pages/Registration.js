import React, {Component} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import Navigation from '../components/navbar';
import Footer from '../components/footer';
import '../css/registration-page.css';
import axios from 'axios';


class RegistrationPage extends Component {

    //Setting initial state of few input boxes for form validation
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            nameError: "",
            emailError: "",
            passwordError: "",
            redirectToReview: false,
            redirectToLogIn: false,
        }
    };

    //reset user info properties
    resetUserInfo(){
        this.setState({
            name: "",
            email: "",
            password: "",
            nameError: "",
            emailError: "",
            passwordError: "",
        })
    };
    
    //------------------Form handling start------------------------------------------------
    //sets the state of the email value
    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        })
      };

      //sets the state of the password value
    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    };

    //sets the state of the name value
    handleNameChange = event => {
        this.setState({
            name: event.target.value
        })
    };

      //Validates the input for the forms to see if it matches requirements
    validate = () => {
        //declare various variables and regular expression for validation checking
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
        if (! /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(this.state.email)) {
          emailError = "invalid email, please include @ symbol";
        }

        //Checks and sets error messages for password
        if (!/\d/.test(this.state.password)){
            passwordError = "password must at least a number";
        }
        if (this.state.password.length <= 6){
            passwordError = "password must be longer than 6 characters";
        }
        if (!regExp.test(this.state.password)){
            passwordError = "password must contain a letter";
        }
        
        //sets the error of the name, email and password if it doesnt match the requirements
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
        //declare few objects be to called from the register.php file
        const obj ={
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
          };

          //connection to the register.php file 
        if (isValid) {
            axios.get('http://3.139.109.205/bike4joy/api/user/register.php', {params: obj})
            .then(res=> {
                const message = res.data.message
                //check if user is already registered or not
                if (message === "User already registered"){
                    //sets state for page redirection later on
                    this.setState({redirectToLogIn: true})
                    alert(`${this.state.email} exists, have an account ? redirecting to login`);
                    //not registered
                }else {
                    this.setState({redirectToReview: true, user_id: res.data.results})
                    alert("registration success!");
                }
                this.resetUserInfo()
            })
            .catch(error => {console.log(error)});
        }
    };

    render() {
        //redirection to various pages based on the state 
        if (this.state.redirectToLogIn) {
            return <Redirect to={{pathname:"/login", state: {email: this.state.email}}} />;
        }
        else if (this.state.redirectToReview) {
            return <Redirect to={{pathname:"/submission", state: {userID: this.state.user_id}}} />;
        } else
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