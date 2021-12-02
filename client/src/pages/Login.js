import React, {Component} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import axios from 'axios';

import Navigation from '../components/navbar';
import Footer from '../components/footer';
import '../css/registration-page.css';


class LogInPage extends Component {

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
            user_id: null,
        }
    };

    // componentDidMount(props) {
    //     if (props.location.state.email){
    //         this.setState({email: props.location.state.email})
    //     }
    // }

    resetUserInfo(){
        this.setState({
            name: "",
            email: "",
            password: "",
            nameError: "",
            emailError: "",
            passwordError: "",
            user_id: "",
        })
    };
    
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

    //Validates the input for the forms to see if it matches requirements
    validate = () => {
        let emailError = "";
        let passwordError = "";
        let regExp = /[a-zA-Z]/g;

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
 
        this.setState({ emailError });
        this.setState({ passwordError });

        //Return false if password does not match requirements
        if (emailError || passwordError){
            return false;
        }
    
        return true;
    };

    userJustLoggedIn(userID){
        sessionStorage.setItem("isLoggedIn", 'true');
        sessionStorage.setItem("userID", userID);
    }

    //Handles the submission of form
    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        const obj ={
            email: this.state.email,
            userPassword: this.state.password,
          };

        if (isValid) {
            // console.log(obj)
            axios.get('http://3.139.109.205/bike4joy/api/user/login.php', {params: obj})
            .then(res=> {
                const message = res.data.message
                if (message === "success"){
                    this.userJustLoggedIn(res.data.results)
                    this.setState({redirectToReview: true, user_id: res.data.results})
                    alert("Log In Success!");
                }
                this.resetUserInfo()
            })
            .catch(error => {
                console.log(error)
                alert("Invalid email or password")
            });
        }
    };


    render() {
        if (this.state.redirectToReview) {
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
                            {/* -- Email form -- */}
                            <Form.Label className="title">Log In</Form.Label>
                            <Form.Group size="lg" controlId="email" className="mt-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
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
                                Log In
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

export default LogInPage;