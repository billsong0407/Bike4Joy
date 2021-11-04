import React, {Component} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/navbar';
import Footer from '../components/footer';
import '../css/registration-page.css';
import ParticleBackground from '../ParticleBackground';



const initialState={
    email: "",
    password: "",
    emailError: "",
    passwordError: "",

};

class RegistrationPage extends Component {

    state = initialState;
    
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


      validate = () => {
        let emailError = "";
        let passwordError = "";
        let regExp = /[a-zA-Z]/g;

        if (!this.state.email.includes("@")) {
          emailError = "invalid email, please include @ symbol";
        }
        if (emailError ) {
          this.setState({ emailError});
          return false;
        }
        if (!this.state.password.includes("1") && !this.state.password.includes("2") && !this.state.password.includes("3") && !this.state.password.includes("4") && !this.state.password.includes("5") && !this.state.password.includes("6") && !this.state.password.includes("7") && !this.state.password.includes("8") && !this.state.password.includes("9") && !this.state.password.includes("0")){
            passwordError = "password must at least a number";
        }
        if (this.state.password.length <= 6){
            passwordError = "password must be longer than 6 characters";
        }
        if (!regExp.test(this.state.password)){
            passwordError = "password must contain a letter";
        }
        if (passwordError) {
            this.setState({ passwordError});
            return false;
          }

    
        return true;
      };

      handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
          console.log(this.state);
          // clear form
          this.setState(initialState);
        }
      };


    render() {
        return (
            <>
            
                <Navigation />
                {/* <!--  
                 <ParticleBackground className="particleStyle" /> 
                 --> */}
                <Container fluid>
                <Row className="animate__animated animate__slideInDown register-page">
                    <Col className="register-section">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Label className="title">Registration</Form.Label>
                            <Form.Group size="lg" controlId="email">
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
                            <Button block size="lg" type="submit" className="mt-4">
                                Register
                            </Button>
                        </Form>
                    </Col>
                    
                </Row>
                </Container>
                
                <Footer />
            </>
        )
    }
}

export default RegistrationPage;