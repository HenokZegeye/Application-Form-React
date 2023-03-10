import React, { Component } from "react";
import { Divider, Col, Row, Upload, Modal } from "antd";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
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
export class Preview extends Component {
  state = {
    applicationData: this.props.applicationData,
    transcriptInfo: [],
    g12NationalExamInfo: [],
    baDegreeInfo: [],
    motivationLetterInfo: []
  };
  componentDidMount() {
    console.log("applicatin data", this.state.applicationData);
    const documents = this.state.applicationData.attached_documents;

    for (var key in documents) {
      if (key === "baDegree") {
        const list = [];
        list.push({
          uid: documents[key][0].uid,
          name: documents[key][0].name,
          status: "done",
          url: documents[key][0].url,
          document_id: documents[key][0].document_id
        });
        this.setState({ baDegreeInfo: list });
      } else if (key === "g12Exam") {
        const list = [];
        list.push({
          uid: documents[key][0].uid,
          name: documents[key][0].name,
          status: "done",
          url: documents[key][0].url,
          document_id: documents[key][0].document_id
        });
        this.setState({ g12NationalExamInfo: list });
      } else if (key === "transcript") {
        const list = [];
        list.push({
          uid: documents[key][0].uid,
          name: documents[key][0].name,
          status: "done",
          url: documents[key][0].url,
          document_id: documents[key][0].document_id
        });
        this.setState({ transcriptInfo: list });
      } else if (key === "motivationLetter") {
        const list = [];
        list.push({
          uid: documents[key][0].uid,
          name: documents[key][0].name,
          status: "done",
          url: documents[key][0].url,
          document_id: documents[key][0].document_id
        });
        this.setState({ motivationLetterInfo: list });
      }
    }
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
    const applicationData = this.props.applicationData;
    console.log("contact info from preview", applicationData.contact_info);

    const contact_inforamation = applicationData.contact_info;
    const select_program = applicationData.select_program;
    const fullName =
      contact_inforamation.first_name +
      " " +
      contact_inforamation.middle_name +
      " " +
      contact_inforamation.last_name;
    return (
      <div>
        <Row type={"flex"}>
          <Col span={24}>
            <Row>
              <h4 className="pt-4">Form Preview</h4>
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
                    content={contact_inforamation.email}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="Phone Number"
                    content={contact_inforamation.phone_number}
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
                    content={select_program.programType}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="Field Of Study"
                    content={select_program.fieldOfStudy}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="Mode Of Attendance"
                    content={select_program.modeOfAttendance}
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
                  {select_program.programType === "Undergraduate" && (
                    <DescriptionItem
                      title="Transcript"
                      content={this.DocumentPreview("transcript")}
                    />
                  )}
                  {select_program.programType === "Graduate" && (
                    <DescriptionItem
                      title="Bachelor Degree"
                      content={this.DocumentPreview("baDegree")}
                    />
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  {select_program.programType === "Undergraduate" && (
                    <DescriptionItem
                      title="Grade 12 Exam Result"
                      content={this.DocumentPreview("g12Exam")}
                    />
                  )}
                  {select_program.programType === "Graduate" && (
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
    );
  }
}

export default Preview;
