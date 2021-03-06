import React, { Component } from 'react'

// import dependencies
import {Route, Switch, NavLink, BrowserRouter as Router } from 'react-router-dom';
import {PrivateRoute} from 'authorization/PrivateRoute'
import {authenticationService} from 'authorization/Authentication'

// import components
import Home from 'components/Home/Home'
import Exercises from 'components/Exercises/Exercises'
import Assignments from 'components/Assignments/Assignments';

// import pages
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';

import NavigationBar from 'components/NavigationBar';

// import reactstrap components
import {Button,
   NavItem,
   Nav}
   from "reactstrap";

// Main component
class App extends Component {
  constructor(props) {
    super(props)
  
    // define routes
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
        },
        {
          title: ' Assignments',
          key: 'Assignments',
          link: '/assignments',
          icon: 'nc-icon nc-bullet-list-67',
          component: Assignments
        }
      ]
    }
  }

  // Delete session storage on logout
  componentWillUnmount(){
    authenticationService.logout()
  }

  // Render routes from the state for the switch in Render
  renderRoutes() {
    const state = this.state;
    const { routes } = state;
     return routes.map(route => {
      const routeKey = `${route.key} ${route.title}`;
      return <PrivateRoute
      exact key={routeKey} 
      path={route.link} 
      component={route.component} 
      />;
    });
  }

  // render menu items from routes
  renderMenuItems() {
    const state = this.state;
    const { routes } = state;
    return routes.map(route => {
        return (
            <Nav key={route.key} className="mr-auto" navbar>
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
  
  // render the main component
  render() {
    return (
      <Router>
        <div>
          <NavigationBar
          links={this.renderMenuItems()}
          userRole={this.state.currentRole}/>
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