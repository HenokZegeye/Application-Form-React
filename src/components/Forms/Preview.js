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
    console.log("contact info from preview", applicationData);

    return (
      <div>
        <Row type={"flex"}>
          <Col span={24}>
            <Row>
              <h4 className="pt-4">Form Preview</h4>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Preview;
