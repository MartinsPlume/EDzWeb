/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from 'react'
import { authenticationService } from '../authorization/Authentication'

// reactstrap components
import {
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container
  } from "reactstrap";


class NavBar extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             links: props.links
        }
    }

    handleLogout(){
        authenticationService.logout()
    }
    
    render(){
        return (
            <div id="navbar"
            className="navigation-example"
            // style={{
            //     backgroundImage:
            //       "url(" + require("assets/img/ilya-yakover.jpg") + ")"
            //   }}
            >
                <Navbar className="bg-primary" expand="lg">
              <Container>
                <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                  EDz
                </NavbarBrand>
                <button
                  aria-controls="navbarNav"
                  aria-expanded={false}
                  aria-label="Toggle navigation"
                  className="navbar-toggler navbar-toggler-right burger-menu"
                  data-target="#navbar-primary"
                  data-toggle="collapse"
                  id="navbar-primary"
                  type="button"
                >
                  <span className="navbar-toggler-bar" />
                  <span className="navbar-toggler-bar" />
                  <span className="navbar-toggler-bar" />
                </button>
                <UncontrolledCollapse navbar toggler="#navbar-primary">
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                        <i
                          aria-hidden={true}
                          className="nc-icon nc-single-02"
                        />
                         Profile
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href='/login' onClick={this.handleLogout}>
                        <i
                          aria-hidden={true}
                          className="nc-icon nc-button-power"
                        />
                         Sign out
                      </NavLink>
                    </NavItem>
                  </Nav>
                </UncontrolledCollapse>
              </Container>
            </Navbar>

            </div>
        )
    }
}

export default NavBar
