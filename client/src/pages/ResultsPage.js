import React, {Component} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/navbar';
import Footer from '../components/footer';

class ResultsPage extends Component {
    render() {
        return (
            <>
                <Navigation />
                <Container fluid>
                    <div>
                        <p>3 results found</p>
                    </div>
                </Container>
                <Footer />
            </>
        )
    }
}

export default ResultsPage;