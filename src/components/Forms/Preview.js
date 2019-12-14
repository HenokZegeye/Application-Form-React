import React, { Component } from "react";
import { Divider, Col, Row, Upload, Modal } from "antd";
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
    applicationData: this.props.applicationData
  };
  componentDidMount() {
    console.log("applicatin data", this.state.applicationData);
  }
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
              {/*
              <p
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                Document Uploaded
              </p>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="Transcript"
                    content={this.DocumentPreview("transcript")}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="Motivation Letter"
                    content={this.DocumentPreview("motivation-letter")}
                  />
                </Col>
              </Row> */}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Preview;
