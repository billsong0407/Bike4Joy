import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../App.css';

const Navigation = () => {
    return(
        // Naviagtion bar on top of every page
        <Navbar expand="lg" sticky="top" className="page-nav">
            <Container fluid>
                <Link to="/">
                    <Navbar.Brand>
                        {/*  Website logo */}
                        <img
                            src="./images/white-logo.png"
                            width="160"
                            height="60"
                            className="animate__animated animate__fadeIn d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav className="page-links" navbarScroll>
                    <Nav.Link href="/#search-form" className="animate__animated animate__fadeIn text-link">Search</Nav.Link>
                </Nav>
                <Nav className="mx-5 me-auto" navbarScroll>
                    <Nav.Link href="/submission" className="animate__animated animate__fadeIn text-link">Review</Nav.Link>
                </Nav>
                {/* Button to register account */}
                <Link to="/registration">
                    <Button variant="success" className="animate__animated animate__fadeIn">
                        Register
                    </Button>
                </Link>
                <Link to="/login">
                    <Button variant="primary" className="animate__animated animate__fadeIn mx-2">
                        Log In
                    </Button>
                </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;