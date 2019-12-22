import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardGroup, Col, Row } from "reactstrap";
import { Form, Input, message } from "antd";
import LModel from "../services/api";
const FormItem = Form.Item;
export class Login extends Component {
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
