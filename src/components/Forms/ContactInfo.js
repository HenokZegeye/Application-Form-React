import React, { Component } from "react";
import { Form, Row, Col, Button, Input, message } from "antd";
import ResponseCodes from "../../utils/ResponseCodes";
import LModel from "../../services/api";
const FormItem = Form.Item;
export class ContactInfo extends Component {
  success = msg => {
    message.success(msg);
  };
  error = msg => {
    message.error(msg);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        this.error(ResponseCodes.MSG_VALIDATION_ERROR);
      } else {
        let applicant = {};
        let payload = values;

        applicant = applicant.payload;
        console.log("payloadd", payload);
        LModel.create("applicants", payload).then(response => {
          console.log("response from create", response);
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <h4 className="pt-4">Please Fill in the following Fields</h4>
        <Row type="flex">
          <Col span={24}>
            <Form layout="vertical" onSubmit={this.handleSubmit}>
              <FormItem label="Your Name">
                {getFieldDecorator("applicant[first_name]", {
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
                {getFieldDecorator("applicant[middle_name]", {
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
                {getFieldDecorator("applicant[last_name]", {
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
                    {getFieldDecorator("applicant[email]", {
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
                    {getFieldDecorator("applicant[phone_number]", {
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
              <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                  Continue
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
ContactInfo = Form.create()(ContactInfo);
export default ContactInfo;
