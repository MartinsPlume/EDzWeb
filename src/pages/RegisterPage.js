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
import React, { useCallback } from "react";

import {history} from '../services/HistoryService'

// import dependencies
import { authenticationService } from "../authorization/Authentication";

// reactstrap components
import {
  Alert, 
  Button, 
  Card, 
  Form, 
  Input, 
  Container, 
  Row, 
  Col } from "reactstrap";

// core components
const RegisterPage = ({history}) => {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

const handleRegister = useCallback(
    async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
        await authenticationService.register(email.value, password.value);
        setAlertSuccess(true)
        setTimeout(redirect(),2000)
        } catch (error) {
        setAlertWarning(true)
        }
  },
  [history]
  );

  function redirect(){
    history.push("/login");
  }

  const [alertSuccess, setAlertSuccess] = React.useState(false);
  const [alertWarning, setAlertWarning] = React.useState(false);

  return (
    <div>
    <div>
    <Alert color="success" isOpen={alertSuccess}>
          <Container>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => setAlertSuccess(false)}
            >
              <i className="nc-icon nc-simple-remove" />
            </button>
            <span>Registering . . .</span>
          </Container>
        </Alert>

        <Alert color="warning" isOpen={alertWarning}>
          <Container>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => setAlertWarning(false)}
            >
              <i className="nc-icon nc-simple-remove" />
            </button>
            <span>Registration failed</span>
          </Container>
        </Alert>
    </div>
    <div
        className="section section-image section-login"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      >

        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Welcome</h3>
                <Form onSubmit={handleRegister} className="register-form">
                  <label>Email</label>
                  <Input name="email" placeholder="Email" type="text" />
                  <label>Password</label>
                  <Input name="password" placeholder="Password" type="password" />
                  <Button
                  block className="btn-round"
                  color="danger"
                  type="submit">
                    Register
                  </Button>
                </Form>
                {/* <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Forgot password?
                  </Button>
                </div> */}
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by Creative Tim
          </h6>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
