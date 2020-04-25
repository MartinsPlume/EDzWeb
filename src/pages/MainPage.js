import React, { Component } from 'react'

import StudentHome from '../components/Student/StudentHome'
import StudentExercises from '../components/Student/StudentExercises'

// import dependencies

import {RoutesService} from '../services/RoutesService'
import {authenticationService} from '../authorization/Authentication'
import {PrivateRoute} from '../authorization/PrivateRoute'
import { Switch, Link, NavLink, BrowserRouter as Router } from 'react-router-dom';


// import resources

// reactstrap components
import {Button, NavItem, Nav} from "reactstrap";
import NavigationBar from 'components/NavigationBar';

export class MainPage extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
          routes : [
            {
              title: ' Home',
              key: 'home',
              link: '/',
              icon: 'nc-icon nc-globe',
              component: StudentHome
            },
            {
              title: ' Exercises',
              key: 'exercises',
              link: '/exercises',
              icon: 'nc-icon nc-tile-56',
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
