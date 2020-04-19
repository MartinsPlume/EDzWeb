import React, { Component } from 'react'

// import dependencies
import { Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom';

// import components
import NavTabs from '../components/NavTabs'

// import pages
import LoginPage from '../components/Login'
import RegisterPage from '../components/Register'

// import reactstrap components
import {
  NavItem,
} from "reactstrap";

export class AuthorizationPage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      routes: [
        {
          title: 'Login',
          key: 'login',
          link: '/login',
          tab: 1,
          component: LoginPage
        },
        {
          title: 'Register',
          key: 'register',
          link: '/register',
          tab: 2,
          component: RegisterPage
        }
      ],
      activeTab:1
    }
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
    this.setState({
      activeTab : tab
    });
  }
}

  renderRoutes() {
    const state = this.state;
    const { routes } = state;
  
    return routes.map(route => {
      const routeKey = `${route.key} ${route.title}`;
      return <Route exact key={routeKey} path={route.link} component={route.component}/>;
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
              <NavTabs links = {this.renderNavLinks()} toggle = {this.toggle}></NavTabs>
              <div>
                <Switch>
                      {this.renderRoutes()}
                </Switch>
              </div>
          </div>
      </Router>
    )
  }
}

export default AuthorizationPage