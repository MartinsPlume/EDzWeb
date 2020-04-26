import React, { useEffect , useState } from 'react'

// import dependencies

import {RoutesService} from '../services/RoutesService'
import {authenticationService} from '../authorization/Authentication'
import {PrivateRoute} from '../authorization/PrivateRoute'
import { Switch, NavLink, BrowserRouter as Router } from 'react-router-dom';

// import resources

// reactstrap components
import {Button, NavItem, Nav} from "reactstrap";
import NavigationBar from 'components/NavigationBar';

const MainPage = ()  => {

    const [routes, setRoutes] = useState(RoutesService(authenticationService.currentUserRoleValue));

    useEffect(() => {
      setRoutes(RoutesService(authenticationService.currentUserRoleValue))
    }, []);

      function renderRoutes() {
        // setRoutes(RoutesService(authenticationService.currentUserRoleValue))
         return routes.map(route => {
          const routeKey = `${route.key} ${route.title}`;
          return <PrivateRoute exact key={routeKey} path={route.link} component={route.component}/>;
        });
      }

      function renderMenuItems() {
        // setRoutes(RoutesService(authenticationService.currentUserRoleValue))
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
      
          return (
              <Router>
                <div>
                    <NavigationBar links={renderMenuItems()}/>
                      <div className="Navigation-Bar">
                          <Switch>
                            {renderRoutes()}
                          </Switch>
                      </div>
                </div>
              </Router>
          )
      }

export default MainPage
