import React, {Component} from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap'

import Navigation from '../components/navbar';
import Footer from '../components/footer'
import '../css/search-page.css';


class SearchPage extends Component {
  render() {
    return (
        <>
            <Navigation></Navigation>
            {/* <!-- Banner --> */}
            <div className="main-banner">
                <div className="container">
                    <h1 className="title">Bike4Joy</h1>
                    <h3 className="subtitle">Find or review an outdoor bike parking place in Toronto</h3>
                    <a href="#search-form" className="btn btn-success btn-lg active try-button" role="button"
                        aria-pressed="true">TRY IT NOW!</a>
                </div>

            </div>
            <div className="search-page container-fluid">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <h4 className="tag-line">Over 200+ Bike Parking Places in Toronto City</h4>
                            <h2 className="title">Find a Bike Parking Place</h2>
                        </div>
                        <div className="col-lg-9">
                            {/* <!-- Search Form --> */}
                            <Form className="input-group" id="search-form">
                               
                                {/* <!-- Dropdown menu --> */}
                                <FloatingLabel controlId="floatingSelectGrid" label="Please Select" className="floating-label">
                                <Form.Select aria-label="Search Location">
                                    <option value="Address">Address</option>
                                    <option value="Postal Code">Postal Code</option>
                                </Form.Select>
                                </FloatingLabel>
                              
                               <Form.Control placeholder="35 Front Street West" className="input-text"/> 
                                
                                {/* <!-- Rating Dropdowns --> */}
                                <FloatingLabel controlId="floatingSelectGrid" label="Please Select" className="floating-label">
                                <Form.Select>
                                    <option value="any">Any Rating</option>
                                    <option value="5">★★★★★</option>
                                    <option value="4">★★★★</option>
                                    <option value="3">★★★</option>
                                    <option value="2">★★</option>
                                    <option value="1">★</option>
                                </Form.Select>
                                </FloatingLabel>                    
                                {/* <!-- final search button --> */}
                                <Button variant="success" type="submit" className="search-button">
                                    Search
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
  }
}

export default SearchPage;