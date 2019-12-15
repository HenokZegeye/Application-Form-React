import React, { Component } from "react";
import { Steps, Button, message, Form, Col, Row } from "antd";
import LModel from "../../services/api";
import Logo from "../Logo";
import ProgramSelection from "./ProgramSelection";
import ContactInfo from "./ContactInfo";
import DocumentsUpload from "./DocumentsUpload";
import Preview from "./Preview";
const { Step } = Steps;

const steps = [
  "Select Program",
  "Upload Document",
  "Add Contact Information",
  "Preview Application",
  "Confirm"
];

const fields = {
  Select_Program: ["programType", "fieldOfStudy", "modeOfAttendance"],
  Upload_Document: ["highschool_transcript", "grade12_National_Exam_Result"],
  Contact_Info: [
    "first_name",
    "middle_name",
    "last_name",
    "email",
    "phone_number"
  ]
};

export class Main extends Component {
  state = {
    current: 0,
    enrollmentApplicationId: null,
    applicationData: {},
    select_program: {},
    attached_documents: {},
    transcript_file: {},
    g12_exam_file: {},
    contact_info: {},
    loaded: false
  };

  onUpdate = attached_documents => {
    console.log("attacheedddd docs from application form", attached_documents);
    this.setState({ attached_documents });
    console.log(
      "attached docs state from application form...",
      this.state.attached_documents
    );
  };

  next() {
    if (this.state.current == 0) {
      this.props.form.validateFieldsAndScroll(
        fields["Select_Program"],
        (err, values) => {
          if (!err) {
            const current = this.state.current + 1;
            const select_program = this.props.form.getFieldsValue(
              fields.Select_Program
            );
            let applicationData = this.state.applicationData;

            this.setState({ select_program }, () => {
              applicationData.select_program = this.state.select_program;
              this.setState({ applicationData });
              this.setState({ current });
            });
          }
        }
      );
    } else if (this.state.current == 1) {
      this.props.form.validateFieldsAndScroll(
        fields["Upload_Document"],
        (err, values) => {
          if (!err) {
            const current = this.state.current + 1;
            let attached_documents = this.state.attached_documents;

            let applicationData = this.state.applicationData;

            applicationData.attached_documents = attached_documents;

            this.setState({ current });
            this.setState({ applicationData });
          }
        }
      );
    } else if (this.state.current == 2) {
      this.props.form.validateFieldsAndScroll(
        fields["Contact_Info"],
        (err, values) => {
          if (!err) {
            const current = this.state.current + 1;
            const contact_info = this.props.form.getFieldsValue(
              fields.Contact_Info
            );
            let applicationData = this.state.applicationData;
            this.setState({ contact_info }, () => {
              applicationData.contact_info = this.state.contact_info;
              this.setState({ applicationData }, () => {
                this.setState({ current });
                console.log("application data from contact", this.state);
              });
            });
          }
        }
      );
    }
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  form_submit = () => {
    console.log(
      "application form from form submit",
      this.state.applicationData
    );
    const applicationData = this.state.applicationData;
    const contact_info = applicationData.contact_info;
    const select_program = applicationData.select_program;
    console.log("contact info form submit", contact_info);
    console.log("select program form submit", select_program);

    // LModel.create("program_types")

    LModel.create("applicants", contact_info).then(response => {
      console.log("response from applicant created", response);
    });

    LModel.create("programs", select_program).then(response => {
      console.log("response from program creation", response);
    });
  };

  onChange = current => {
    console.log("onChange:", current);
    this.setState({ current });
  };

  renderSteps = current => {
    return (
      <Col>
        <Steps
          // onChange={this.onChange}
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
          {this.state.current < steps.length - 2 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {this.state.current === steps.length - 2 && (
            <Button
              type="primary"
              // onClick={() => message.success("Processing complete!")}
              onClick={() => this.form_submit()}
            >
              Final Submission
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

  renderComponents = current => {
    switch (current) {
      case 0:
        return (
          <div>
            <ProgramSelection
              applicationData={this.state.applicationData}
              form={this.props.form}
            />
          </div>
        );
      case 1:
        return (
          <div>
            <DocumentsUpload
              onUpdate={this.onUpdate}
              applicationData={this.state.applicationData}
              form={this.props.form}
              enrollmentApplicationId={this.state.enrollmentApplicationId}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <ContactInfo
              applicationData={this.state.applicationData}
              form={this.props.form}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <Preview
              applicationData={this.state.applicationData}
              form={this.props.form}
            />
          </div>
        );

      default:
        break;
    }
  };

  render() {
    const { current } = this.state;

    // let steps = [
    //   {
    //     title: "ProgramSelection",
    //     content: (
    //       <ProgramSelection
    //         applicationData={this.state.applicationData}
    //         form={this.props.form}
    //       />
    //     )
    //   },
    //   {
    //     title: "DocumentsUpload",
    //     content: (
    //       <DocumentsUpload
    //         applicationData={this.state.applicationData}
    //         form={this.props.form}
    //         enrollmentApplicationId={this.state.enrollmentApplicationId}
    //       />
    //     )
    //   },
    //   {
    //     title: "ContactInfo",
    //     content: (
    //       <ContactInfo
    //         applicationData={this.state.applicationData}
    //         form={this.props.form}
    //         enrollmentApplicationId={this.state.enrollmentApplicationId}
    //       />
    //     )
    //   },
    //   {
    //     title: "Preview",
    //     content: (
    //       <Preview
    //         applicationData={this.state.applicationData}
    //         form={this.props.form}
    //         enrollmentApplicationId={this.state.enrollmentApplicationId}
    //       />
    //     )
    //   }
    // ];

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
              {/* <div>
                {steps.map(({ title, content }, i) => (
                  <div
                    key={title}
                    className={i === this.state.current ? "foo fade-in" : "foo"}
                  >
                    {content}
                  </div>
                ))}
              </div> */}
              <div>{this.renderComponents(current)}</div>
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
