import React, { Component } from "react";
import Logo from "./Logo";
import { Steps, Col } from "antd";
const { Step } = Steps;

const steps = [
  "Select Program",
  "Upload Document",
  "Add Contact Information",
  "Preview Application",
  "Confirm"
];
export class ApplicationForm extends Component {
  state = {
    current: 0
  };
  onChange = current => {
    console.log("onChange:", current);
    this.setState({ current });
  };

  renderSteps = current => {
    return (
      <Col md="3">
        <Steps
          onChange={this.onChange}
          direction="vertical"
          current={current}
          className="mt-5"
        >
          {steps.map(item => (
            <Step style={{ height: "100px" }} key={item} title={item} />
          ))}
        </Steps>
      </Col>
    );
  };

  render() {
    const { current } = this.state;
    return (
      <div>
        <div className="text-center">
          <Logo />
          <h3>
            To Learn More About What We Offer Visit Our <a href="#">Website</a>
          </h3>
        </div>
        <div className="container">
          <h2>Steps to Apply to BITS College</h2>
          <div>{this.renderSteps(current)}</div>
        </div>
      </div>
    );
  }
}

export default ApplicationForm;
