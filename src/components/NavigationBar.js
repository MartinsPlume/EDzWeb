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
        }
    }

    // handle log off button
    handleLogout(){
        authenticationService.logout()
    }

    // render the logout button
    renderLogoutButton(){
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
    
    // render the Navigation bar layout
    // Everything is in one component Reactsrap NavBar
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