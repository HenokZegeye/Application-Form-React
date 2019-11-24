import React, { Component } from "react";
import Logo from "../Logo";
import { Steps, Col, Row } from "antd";
import ProgramSelection from "./ProgramSelection";
import DocumentsUpload from "./DocumentsUpload";
import ContactInfo from "./ContactInfo";
import Confirm from "./Confirm";
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
      <Col>
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
  selectComponent = current => {
    switch (current) {
      case 0:
        return <ProgramSelection />;
      case 1:
        return <DocumentsUpload />;
      case 2:
        return <ContactInfo />;
      case 4:
        return <Confirm />;
      default:
        break;
    }
  };

  render() {
    const { current } = this.state;
    console.log("current", this.state.current);
    return (
      <div>
        <div className="text-center">
          <Logo />
          <h3>
            To Learn More About What We Offer Visit Our
            <a href="http://bitscollege.edu.et/" target="_blank">
              Website
            </a>
          </h3>
        </div>
        <Row>
          <div className="container">
            <h2>Steps to Apply to BITS College</h2>
            <Col span={7}>
              <div>{this.renderSteps(current)}</div>
            </Col>
            <Col span={12} offset={5}>
              <div>{this.selectComponent(current)}</div>
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

export default ApplicationForm;
