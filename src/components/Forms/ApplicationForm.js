import React, { Component } from "react";
import { Steps, Button, message, Form, Col, Row } from "antd";
import Logo from "../Logo";
import ProgramSelection from "./ProgramSelection";
import ContactInfo from "./ContactInfo";
const { Step } = Steps;

const steps = [
  "Select Program",
  "Upload Document",
  "Add Contact Information",
  "Preview Application",
  "Confirm"
];

export class Main extends Component {
  state = {
    current: 0
  };
  next() {
    if (this.state.current == 0) {
      this.props.form.validateFieldsAndScroll(
        ["programType", "fieldOfStudy", "modeOfAttendance", "test"],
        (err, values) => {
          if (!err) {
            const current = this.state.current + 1;
            this.setState({ current });
          }
        }
      );
    }
  }
  prev() {
    const current = this.state.current - 1;
    // console.log(current)
    this.setState({ current });
  }

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

  renderSelectedComponent = current => {
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

  renderStepActions = () => {
    return (
      <div>
        <div className="steps-action">
          {this.state.current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {this.state.current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {this.state.current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  };

  render() {
    const { current } = this.state;
    let steps = [
      {
        title: "ProgramSelection",
        content: <ProgramSelection form={this.props.form} />
      },
      {
        title: "ContactInfo",
        content: <ContactInfo form={this.props.form} />
      }
    ];

    return (
      <div>
        <div className="text-center">
          <Logo />
          <h3>
            To Learn More About What We Offer Visit Our{" "}
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
              <div>
                {steps.map(({ title, content }, i) => (
                  <div
                    key={title}
                    className={i === this.state.current ? "foo fade-in" : "foo"}
                  >
                    {content}
                  </div>
                ))}
              </div>
              {this.renderStepActions()}
            </Col>
          </div>
        </Row>
      </div>
    );
  }
}

const MainForm = Form.create({})(Main);
export default MainForm;
