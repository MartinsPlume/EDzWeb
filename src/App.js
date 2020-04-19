import React from 'react'

// import dependencies
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {PrivateRoute} from './authorization/PrivateRoute'

// import components

// import pages
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import MainPage from 'pages/MainPage'

// import reactstrap components

function App() {
  return (
    <Router>
      <PrivateRoute exact key = 'main' path='/' component = {MainPage}></PrivateRoute>
      <Route exact path='/login' key = 'login' component={LoginPage} />
      <Route exact path='/register' key = 'register' component={RegisterPage} />
    </Router>
  )
}

export default App