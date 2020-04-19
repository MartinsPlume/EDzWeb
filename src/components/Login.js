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

// import dependencies
import { authenticationService } from "../authorization/Authentication";
import { useHistory } from "react-router-dom";

// import resources
import {WelcomeText} from '../res/strings'

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

const LoginPage = ({history}) => {

const handleLogin = useCallback(
    async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
        await authenticationService.login(email.value, password.value);
        history.push("/home");
        } catch (error) {
        alert(error);
        }
    },
    [history]
    );

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  return (
    <>
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">{WelcomeText}</h3>
                <Form className="login-form" onSubmit={handleLogin}>
                  <label>Email</label>
                  <Input input name="email" placeholder="Email" type="text" />
                  <label>Password</label>
                  <Input input name="password" placeholder="Password" type="password" />
                  <Button block className="btn-round" color="danger">
                    Login
                  </Button>
                </Form>
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Forgot password?
                  </Button>
                </div>
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
    </>
  );
}

export default LoginPage;
