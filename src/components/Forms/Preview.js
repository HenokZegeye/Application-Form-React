import React, { Component } from "react";
import { Divider, Col, Row, Button, Form, Upload, Modal } from "antd";
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
              {/*<Row>
                <Col span={12}>
                  <DescriptionItem
                    title="Birthday"
                    content={new moment(
                      personalInformations.dateOfBirth
                    ).format("MMM Do YYYY")}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="Nationality"
                    content={personalInformations.nationality}
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
                Contact Information
              </p>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="Country"
                    content={contactInformations.country}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="Address"
                    content={contactInformations.address}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="City"
                    content={contactInformations.city}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="Region"
                    content={contactInformations.region}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="P.O.Box"
                    content={contactInformations.pobox}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="Email"
                    content={contactInformations.email}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="Primary Phone number"
                    content={contactInformations.primaryPhone}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="Additional Phone number"
                    content={contactInformations.secondaryPhone}
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
                Educational Information
              </p>
              <Row>
                <Col span={12}>
                  <DescriptionItem
                    title="Highschool Name"
                    content={educationalDetails.highSchoolName}
                  />
                </Col>
                <Col span={12}>
                  <DescriptionItem
                    title="Desired Field of Study"
                    content={educationalDetails.fieldOfSpecialization}
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
                  <DescriptionItem
                    title="Photo"
                    content={this.DocumentPreview("photo")}
                  />
                </Col>
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
