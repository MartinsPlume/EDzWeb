import React, { Component } from 'react'

import StudentHome from '../components/Student/StudentHome'
import StudentExercises from '../components/Student/StudentExercises'

// import dependencies

import {RoutesService} from '../services/RoutesService'
import {authenticationService} from '../authorization/Authentication'
import {PrivateRoute} from '../authorization/PrivateRoute'
import { Switch, Link, BrowserRouter as Router } from 'react-router-dom';

// import resources

// reactstrap components
import {NavItem, Nav} from "reactstrap";
import NavigationBar from 'components/NavigationBar';

export class MainPage extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
          routes : [
            {
              title: 'Home',
              key: 'home',
              link: '/',
              component: StudentHome
            },
            {
              title: 'Exercises',
              key: 'exercises',
              link: '/exercises',
              component: StudentExercises
            }
          ]
        }
      }

      renderRoutes() {
        const state = this.state;
        const { routes } = state;
      
        return routes.map(route => {
          const routeKey = `${route.key} ${route.title}`;
          return <PrivateRoute exact key={routeKey} path={route.link} component={route.component}/>;
        });
      }

      renderMenuItems() {
      const state = this.state;
      const { routes } = state;
      
      return routes.map(route => {
          return (
            <NavItem>
              <Link to={route.link} key={route.key}>
                  <div className="menu-item">{route.title}</div>
              </Link>
            </NavItem>
          );
        });
      }
      
        render() {
          return (
              <Router>
                <div>
                    <NavigationBar links={this.renderMenuItems()}/>
                      <div className="Navigation-Bar">
                          <Switch>
                            {this.renderRoutes()}
                          </Switch>
                      </div>
                </div>
              </Router>
          )
        }
      }

export default MainPage
