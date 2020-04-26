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

// import dependencies

// reactstrap components
import {
    Button,
    NavbarBrand,
    NavItem,
    NavLink,
    Nav,
    Navbar,
    Container
  } from "reactstrap";

  //
  import {LogOffText} from '../res/strings'

class NavigationBar extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             links: props.links
        }
    }

    handleLogout(){
        authenticationService.logout()
    }

    renderLogoutButton(){
            return(
            <NavLink href={'/login'}>
                <Button
                onClick = {this.handleLogout}
                    className="btn-round mr-1"
                    color="warning"
                    type="button"
                >
                    <i
                            aria-hidden={false}
                            className='nc-icon nc-button-power'
                            />
                    {LogOffText}
                </Button>
            </NavLink>
            )
        }
    
    render(){
        return (
            <div>
              <Navbar className="bg-success" expand="md">
                <NavbarBrand href='/'>
                    EDz
                </NavbarBrand>
                <Container>
                    {this.state.links}
                </Container>
                <Container>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            
                                {this.renderLogoutButton()}
                            
                        </NavItem>
                    </Nav>
                </Container>
              </Navbar>
            </div>
        )
    }
}

export default NavigationBar
