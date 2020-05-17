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
    Button,
    NavbarBrand,
    NavItem,
    NavLink,
    Nav,
    Navbar,
    Container,
    Col,
    Row
  } from "reactstrap";

  // import resources
  import {Strings} from '../res/Strings'
import Logo from './Logo';

class NavigationBar extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             links: props.links,
             role: props.userRole
        }
    }

    handleLogout(){
        authenticationService.logout()
    }

    renderLogoutButton(){
        console.log(this.state.userRole)
            return(
            <NavLink href={'/login'}>
                <Button
                xs="auto"
                onClick = {this.handleLogout}
                    className="btn-round mr-1"
                    color="warning"
                    type="button"
                >
                    <i
                            aria-hidden={false}
                            className='nc-icon nc-button-power'
                            />
                    {Strings.LogOffText}
                </Button>
            </NavLink>
            )
        }
    
    render(){
        return (
            <div>
              <Navbar className="bg-success" expand="md">
                  <Container>
                        <Col xs="auto">
                            <NavbarBrand href='/'>
                                <Logo/>
                            </NavbarBrand>
                        </Col>
                        <Col xs="auto">
                            <Row>
                                {this.state.links}
                            </Row>
                        </Col>
                        <Col xs="auto">
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    {this.renderLogoutButton()}
                                </NavItem>
                            </Nav>
                        </Col>
                    </Container>
              </Navbar>
            </div>
        )
    }
}

export default NavigationBar
