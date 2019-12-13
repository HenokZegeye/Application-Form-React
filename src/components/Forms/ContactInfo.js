import React, { Component } from "react";
import { Form, Row, Col, Button, Input, message } from "antd";
import ResponseCodes from "../../utils/ResponseCodes";
import LModel from "../../services/api";
const FormItem = Form.Item;
export class ContactInfo extends Component {
  componentDidMount() {
    if (this.props.applicationData.contact_info) {
      console.log("contact info", this.props.applicationData);
      let component = this;
      component.props.form.setFieldsValue(
        this.props.applicationData.contact_info
      );
    }
  }
  componentDidUpdate() {
    console.log("applicaiton data", this.props);
  }
  success = msg => {
    message.success(msg);
  };
  error = msg => {
    message.error(msg);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h4 className="pt-4">Please Fill in the following Fields</h4>
        <Row type="flex">
          <Col span={24}>
            <FormItem label="Your Name">
              {getFieldDecorator("first_name", {
                rules: [
                  {
                    required: true,
                    message: "Please enter your name"
                  },
                  {
                    type: "string",
                    pattern: /[a-zA-Z\s]$/,
                    message: "Please enter only alphabet character"
                  }
                ]
              })(<Input placeholder="Your Name" />)}
            </FormItem>
            <FormItem label="Father Name">
              {getFieldDecorator("middle_name", {
                rules: [
                  {
                    required: true,
                    message: "Please enter father name"
                  },
                  {
                    type: "string",
                    pattern: /[a-zA-Z\s]$/,
                    message: "Please enter only alphabet character"
                  }
                ]
              })(<Input placeholder="Father Name" />)}
            </FormItem>
            <FormItem label="Grandfather Name">
              {getFieldDecorator("last_name", {
                rules: [
                  {
                    required: true,
                    message: "Please enter grand father name"
                  },
                  {
                    type: "string",
                    pattern: /[a-zA-Z\s]$/,
                    message: "Please enter only alphabet character"
                  }
                ]
              })(<Input placeholder="Grandfather Name" />)}
            </FormItem>
            <Row gutter={4}>
              <Col span={12}>
                <FormItem label="Email address" labelAlign="left">
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter your email address"
                      },
                      {
                        type: "email",
                        message: "Please follow the correct phone format"
                      }
                    ]
                  })(<Input placeholder="Email Address" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Phone Number" labelAlign="left">
                  {getFieldDecorator("phone_number", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter your phone number"
                      },
                      {
                        type: "string",
                        pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                        message: "Please follow the correct phone format"
                      }
                    ]
                  })(<Input placeholder="Phone Number" />)}
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ContactInfo;
