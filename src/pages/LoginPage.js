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
import { authenticationService } from "authorization/Authentication";

// import resources

// reactstrap components
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import { Strings } from "res/Strings";
import Logo from "components/Logo";

const Login = ({history}) => {

const handleLogin = useCallback(
    async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
        await authenticationService.login(email.value, password.value);
        setAlertSuccess(true)
        setTimeout(history.push("/"),2000);
        } catch (error) {
          console.log(error)
        setAlertWarning(true);
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

  const [alertSuccess, setAlertSuccess] = React.useState(false);
  const [alertWarning, setAlertWarning] = React.useState(false);

  return (
    <div>
      <div
        className="section section-image section-login"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      >
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
              <span>Logging in . . .</span>
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
              <span>Login failed</span>
            </Container>
          </Alert>
        </div>
        <Container>
          <Row>
            <Col className="mx-auto" lg="4" md="6">
              <Card className="card-register">
                  <Col sm="12" md={{ size: 9, offset: 4 }}>
                    <Logo/>
                  </Col>
                  <Col sm="12" md={{ size: 9, offset: 3 }}>
                    <h3 className="title mx-auto">{Strings.WelcomeText}</h3>
                  </Col>
                <Form onSubmit={handleLogin} className="register-form">
                  <label>Email</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input name="email" placeholder="Email" type="email" />
                  </InputGroup>
                  <label>Password</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input name="password" placeholder="Password" type="password" />
                  </InputGroup>
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="submit"
                  >
                    Login
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
              <div className="col text-center">
                <Button
                  className="btn-round"
                  outline
                  color="neutral"
                  href="/register"
                  size="lg"
                  target="_blank"
                >
                  Register
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, designed with{" "}
            <i className="fa fa-heart heart" /> by Creative Tim
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Login;
