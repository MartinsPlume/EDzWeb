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
    
    render(){
        return (
            <div>
                <Navbar color='dark' dark expand='md'>
                    <NavbarBrand href="/">EDz</NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        {this.state.links}
                    </Nav>
                    
                </Navbar>
            </div>
        )
    }
}

export default NavigationBar
