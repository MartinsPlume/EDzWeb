import React, { Component } from 'react'

// import dependencies
import { authenticationService } from '../authorization/Authentication'
import {RoutesService} from '../services/RoutesService'
import {PrivateRoute} from '../authorization/PrivateRoute'
import { Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom';

// import resources

// reactstrap components
import {NavItem} from "reactstrap";

export class MainPage extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
          routes: [],
          currentUser:null
        }
      }

      componentDidMount(){
        this.setState({
            routes: RoutesService(authenticationService.currentUserRole)
      })
      console.log(this.state.routes)
    }

    renderRoutes() {
      const state = this.state;
      const { routes } = state;
    
      return routes.map(route => {
        const routeKey = `${route.key} ${route.title}`;
        return <PrivateRoute exact key={routeKey} path={route.link} component={route.component}/>;
      });
  }
  
  renderNavLinks() {
    const state = this.state;
    const { routes } = state;
  
    return routes.map(route => {
        return(
        <NavItem key={route.key}>
              <Link to={route.link} key={route.key}
              className={this.activeTab === route.tab ? "active" : ""}
              onClick={() => {
                this.toggle (route.tab)
              }}
              >
                  {route.title}
              </Link>
        </NavItem>
        )
    });
  }

  render() {
        return (
          <Router>
              <div>
                {this.renderRoutes()}
              </div>
            </Router>
        )
    }
}

export default MainPage
