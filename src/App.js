import React, { Component } from 'react'

// import dependencies
import {Route, Switch, NavLink, BrowserRouter as Router } from 'react-router-dom';
import {PrivateRoute} from './authorization/PrivateRoute'
import {authenticationService} from './authorization/Authentication'

// import components

import Home from 'components/Home/Home'
import Exercises from 'components/Exercises/Exercises'

// import pages
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';

import {Button, NavItem, Nav} from "reactstrap";
import NavigationBar from 'components/NavigationBar';

// import reactstrap components

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      routes : [
        {
          title: ' Home',
          key: 'home',
          link: '/',
          icon: 'nc-icon nc-globe',
          component: Home
        },
        {
          title: ' Exercises',
          key: 'exercises',
          link: '/exercises',
          icon: 'nc-icon nc-tile-56',
          component: Exercises
        }
      ],
      currentRole : authenticationService.currentUserRoleValue
    }
  }

  componentWillUnmount(){
    authenticationService.logout()
  }

  renderRoutes() {
    const state = this.state;
    const { routes } = state;
     return routes.map(route => {
      const routeKey = `${route.key} ${route.title}`;
      return <PrivateRoute 
      exact key={routeKey} 
      path={route.link} 
      component={route.component} 
      currentRole = {this.state.currentRole}/>;
    });
  }

  renderMenuItems() {
    const state = this.state;
    const { routes } = state;
    return routes.map(route => {
        return (
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to={route.link} key={route.key}>
                <Button
                  className="btn-round mr-1"
                  outline
                  size = "lg"
                  color="default"
                  type="button"
                >
                  <i
                            aria-hidden={false}
                            className={route.icon}
                          />
                  {route.title}
                </Button>
              </NavLink>
            </NavItem>
          </Nav>
        );
      });
    }

  render() {
    return (
      <Router>
        <div>
          <NavigationBar links={this.renderMenuItems()}/>
            <div>
              <Switch>
                {this.renderRoutes()}
              </Switch>
            </div>
          <Route exact path='/login' key = 'login' component={LoginPage} />
          <Route exact path='/register' key = 'register' component={RegisterPage} />
        </div>
      </Router>
    )
  }
}

export default App