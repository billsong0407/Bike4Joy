import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../App.css';

const Navigation = () => {
    return(
        <Navbar expand="lg" sticky="top" className="page-nav">
            <Container fluid>
                <Link to="/">
                <Navbar.Brand>
                    <img
                        src="./images/white-logo.png"
                        width="160"
                        height="60"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav className="page-links" navbarScroll>
                    <Nav.Link href="/#search-form" className="text-link">Search</Nav.Link>
                </Nav>
                <Nav className="mx-5 me-auto" navbarScroll>
                    <Nav.Link href="/submission" className="text-link">Review</Nav.Link>
                </Nav>
                <Link to="/registration">
                    <Button variant="success">
                     Register
                    </Button>
                </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;