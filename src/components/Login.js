import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardGroup, Col, Row } from "reactstrap";
import { Form, Input, message } from "antd";
import LModel from "../services/api";
import ClientSession from "../services/client-session";
import ResponseCodes from "../utils/ResponseCodes";
import superagent from "superagent";
const FormItem = Form.Item;
export class Login extends Component {
  success = msg => {
    message.success(msg);
  };

  error = msg => {
    message.error(msg);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        this.error(ResponseCodes.MSG_VALIDATION_ERROR);
      } else {
        let payload = values;
        new Promise((resolve, reject) => {
          superagent
            .post(LModel.API_BASE_URL + "auth/sign_in")
            .send({ email: payload.email, password: payload.password })
            .set("Accept", "application/json")
            .then(res => {
              if (res.status == 200) {
                console.log("response from sign in", res);
                ClientSession.storeAuth(res, err => {
                  if (err) {
                    this.error("Opps!, unable to login please try again");
                  } else {
                    this.props.history.push("/home");
                    console.log("here");
                  }
                });
              }
            })
            .catch(err => {
              if (!err.response) {
                this.error("Unable to login, please check your connectioin");
              } else {
                this.error(err.response.body.errors);
              }
              console.log("errrrr", err.response.body.errors);
            });
        });
      }
    });
  };

  //   this.props.form.validateFields((err, values) => {
  //     if (err) {
  //       this.error(ResponseCodes.MSG_VALIDATION_ERROR);
  //     } else {
  //       let payload = values;
  //       new Promise((resolve, reject) => {
  //         superagent
  //           .post(LModel.API_BASE_URL + "auth/sign_in")
  //           .send({ email: payload.email, password: payload.password })
  //           .set("Accept", "application/json")
  //           .then(res => {
  //             if (res.status == 200) {
  //               console.log("response from sign in", res);
  //             } else {
  //               this.props.history.push("/");
  //               console.log("here");
  //             }
  //           }).catch(err => {
  //         // if (!err.response) {
  //         //   this.error("Unable to login, please check your connectioin");
  //         // } else {
  //         //   if (errors.response.body.error) {
  //         //     if (err.response.body.error.message == "login failed") {
  //         //       this.error(
  //         //         "The email or password you entered is incorrect.Please try again"
  //         //       );
  //         //     } else this.error(err.response.body.error.message);
  //         //   }
  //         // }
  //         console.log("errrrr", err);
  //       });
  //       console.log("values", payload);
  //       });
  // };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup style={{ marginTop: "20%" }} id="loginCG">
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <div className="text-center">
                      <img
                        className="FrontLogo"
                        src="/Logo_main-100.jpg"
                        alt="bits logo"
                        width="200px"
                        style={{ paddingBottom: "20px" }}
                      />
                    </div>
                    <div>
                      <FormItem label="Email">
                        {getFieldDecorator("email", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter your email address"
                            },
                            {
                              type: "email",
                              message: "Please follow the correct email format"
                            }
                          ]
                        })(<Input placeholder="Email" />)}
                      </FormItem>
                    </div>
                    <div>
                      <FormItem label="Password">
                        {getFieldDecorator("password", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter your password"
                            }
                          ]
                        })(<Input placeholder="Password" />)}
                      </FormItem>
                    </div>
                    <Row>
                      <Col xs="6">
                        <FormItem>
                          <Button color="success" className="px-4">
                            Login
                          </Button>
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card
                className="sign-up text-white  py-5 d-md-down-none"
                style={{
                  width: "44%",
                  backgroundColor: "#7dc243",
                  opacity: "1"
                }}
              >
                <CardBody className="text-center">
                  <div>
                    <p
                      style={{
                        color: "#fff",
                        fontSize: "20px",
                        fontFamily: " Sans"
                      }}
                    >
                      BITS College School of Systems and Technology From
                      collecting to connecting ….
                    </p>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </div>
    );
  }
}
Login = Form.create()(Login);
export default Login;
