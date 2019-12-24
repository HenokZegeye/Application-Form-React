import React, { Component } from "react";
import { Divider, Col, Row, Upload } from "antd";
import ClientSession from "../../services/client-session";
import LModel from "../../services/api";
import Nav from "../Navbar/Navbar";
const DescriptionItem = ({ title, content }) => {
  return (
    <div>
      <div
        style={{
          fontSize: 14,
          lineHeight: "22px",
          marginBottom: 7,
          color: "rgba(0,0,0,0.65)"
        }}
      >
        <p
          style={{
            marginRight: 8,
            display: "inline-block",
            color: "rgba(0,0,0,0.85)",
            fontWeight: "bold"
          }}
        >
          {title}:
        </p>
        {content}
      </div>
    </div>
  );
};
export class ApplicationDetail extends Component {
  state = {
    applicationData: {},
    attacheDocs: {},
    contact_information: {},
    program: {},
    program_type: "",
    field_of_study: "",
    transcriptInfo: [],
    g12NationalExamInfo: [],
    baDegreeInfo: [],
    motivationLetterInfo: []
  };
  componentDidMount() {
    ClientSession.getLoggedInUser(userId => {
      if (userId) {
        let enroll_filter = `user_id=${userId}`;
        LModel.findAll("enrollment_applications", enroll_filter)
          .then(response => {
            let applicationData = response.data[0];

            this.setState({ applicationData }, () => {
              this.setState({ contact_information: applicationData.applicant });
              this.setState({ program: applicationData.program }, () => {
                this.setState({
                  program_type: this.state.program.program_type
                    .program_type_name
                });
                this.setState({
                  field_of_study: this.state.program.field_of_study
                    .field_of_study
                });
              });
            });
            console.log(
              "applicatoin data of applicant from state",
              this.state.applicationData.applicant.first_name
            );
            let enrollment_applications_id = response.data[0].id;
            let uploaded_filter = `enrollment_application_id=${enrollment_applications_id}`;
            LModel.findAll("uploadeds", uploaded_filter).then(response => {
              this.setState({ attacheDocs: response.data });
              console.log("attached docs  from state", this.state.attacheDocs);
              const documents = this.state.attacheDocs;
              for (let i = 0; i < documents.length; i++) {
                const doc = documents[i];
                console.log("doooooc", doc);
                const list = [];
                if (doc.doc_type === "BAdegree") {
                  list.push({
                    uid: doc.uid,
                    name: doc.original_name,
                    status: "done",
                    url: doc.url,
                    document_id: doc.id
                  });
                  this.setState({ baDegreeInfo: list });
                } else if (doc.doc_type === "G12Exam") {
                  list.push({
                    uid: doc.uid,
                    name: doc.original_name,
                    status: "done",
                    url: doc.url,
                    document_id: doc.id
                  });
                  this.setState({ g12NationalExamInfo: list });
                } else if (doc.doc_type === "Transcript") {
                  list.push({
                    uid: doc.uid,
                    name: doc.original_name,
                    status: "done",
                    url: doc.url,
                    document_id: doc.id
                  });
                  this.setState({ transcriptInfo: list });
                } else if (doc.doc_type === "MotivationLetter") {
                  list.push({
                    uid: doc.uid,
                    name: doc.original_name,
                    status: "done",
                    url: doc.url,
                    document_id: doc.id
                  });
                  this.setState({ motivationLetterInfo: list });
                }
              }
            });
          })
          .catch(err => {
            console.log("Err ==> ", err);
          });
      }
    });
  }
  DocumentPreview = type => {
    switch (type) {
      case "baDegree":
        return (
          <div>
            <Upload
              showUploadList={{
                showRemoveIcon: false,
                showPreviewIcon: true
              }}
              name="file"
              fileList={this.state.baDegreeInfo}
            />
          </div>
        );
      case "transcript":
        return (
          <div>
            <Upload
              showUploadList={{
                showRemoveIcon: false,
                showPreviewIcon: true
              }}
              name="file"
              fileList={this.state.transcriptInfo}
            />
          </div>
        );
      case "g12Exam":
        return (
          <div>
            <Upload
              showUploadList={{
                showRemoveIcon: false,
                showPreviewIcon: true
              }}
              name="file"
              fileList={this.state.g12NationalExamInfo}
            />
          </div>
        );
      case "motivationLetter":
        return (
          <div>
            <Upload
              showUploadList={{
                showRemoveIcon: false,
                showPreviewIcon: true
              }}
              name="file"
              fileList={this.state.motivationLetterInfo}
            />
          </div>
        );
      default:
        break;
    }
  };
  render() {
    console.log("application data from render", this.state.applicationData);
    const contact_information = this.state.contact_information;
    const fullName =
      contact_information.first_name +
      " " +
      contact_information.middle_name +
      " " +
      contact_information.last_name;
    const program = this.state.program;
    const program_type = this.state.program_type;
    const field_of_study = this.state.field_of_study;
    return (
      <div>
        <Nav />
        <div className="container">
          <Row type={"flex"}>
            <Col span={12}>
              <Row>
                <h4 className="pt-4">Your Application Form</h4>
              </Row>
              <div
                style={{
                  border: "1px solid #e8e8e8",
                  padding: "5px 20px",
                  marginBottom: "20px"
                }}
              >
                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  Contact Information
                </p>
                <Row>
                  <Col span={12}>
                    <DescriptionItem title="Full Name" content={fullName} />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <DescriptionItem
                      title="Email"
                      content={contact_information.email}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <DescriptionItem
                      title="Phone Number"
                      content={contact_information.phone_number}
                    />
                  </Col>
                </Row>
                <Divider />
                <p
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    textAlign: "center"
                  }}
                >
                  Program Preference
                </p>
                <Row>
                  <Col span={12}>
                    <DescriptionItem
                      title="Program Type"
                      content={program_type}
                    />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem
                      title="Field Of Study"
                      content={field_of_study}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <DescriptionItem
                      title="Mode Of Attendance"
                      content={program.mode_of_attendance}
                    />
                  </Col>
                </Row>
                <Divider />

                <p
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  Document Uploaded
                </p>
                <Row>
                  <Col span={12}>
                    {program_type === "Undergraduate" && (
                      <DescriptionItem
                        title="Transcript"
                        content={this.DocumentPreview("transcript")}
                      />
                    )}
                    {program_type === "Graduate" && (
                      <DescriptionItem
                        title="Bachelor Degree"
                        content={this.DocumentPreview("baDegree")}
                      />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    {program_type === "Undergraduate" && (
                      <DescriptionItem
                        title="Grade 12 Exam Result"
                        content={this.DocumentPreview("g12Exam")}
                      />
                    )}
                    {program_type === "Graduate" && (
                      <DescriptionItem
                        title="Motivation Letter"
                        content={this.DocumentPreview("motivationLetter")}
                      />
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ApplicationDetail;
