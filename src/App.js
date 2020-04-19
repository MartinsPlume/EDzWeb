import React, { Component } from 'react'

// import dependencies
import { Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom';
import {PrivateRoute} from './authorization/PrivateRoute'

// import components

// import pages
import AuthorizationPage from 'pages/AuthorizationPage';
import MainPage from 'pages/MainPage'

// import reactstrap components


export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      routes: [
        {
          title: 'Authorization',
          key: 'authorization',
          link: '/authorization',
          tab: 1,
          component: AuthorizationPage
        },
        {
          title: 'Main',
          key: 'main',
          link: '/',
          tab: 2,
          component: MainPage
        }
      ]
    }
  }

  render() {
    return (
      <Router>
            <PrivateRoute exact key = 'main' path='/' component = {MainPage}></PrivateRoute>
            <Route exact key = 'authorization' path='/authorization' component = {AuthorizationPage}></Route>
      </Router>
    )
  }
}

export default App