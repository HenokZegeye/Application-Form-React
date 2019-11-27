import React, { Component } from "react";
import { Steps, Button, message, Form } from "antd";
import ProgramSelection from "./ProgramSelection";
import ContactInfo from "./ContactInfo";

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
  render() {
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
        {steps.map(({ title, content }, i) => (
          <div
            key={title}
            className={i === this.state.current ? "foo fade-in" : "foo"}
          >
            {content}
          </div>
        ))}
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
  }
}

const MainForm = Form.create({})(Main);
export default MainForm;
