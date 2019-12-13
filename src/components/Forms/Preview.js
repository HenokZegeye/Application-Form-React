import React, { Component } from "react";
import { Divider, Col, Row, Button, Form, Upload, Modal } from "antd";
import LModel from "../../services/api";
import moment from "moment";
const FormItem = Form.Item;

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
  state = {};

  render() {
    return (
      <div>
        <Row type={"flex"}>
          <Col span={24}>
            <Row>
              <h4 className="pt-4">Form Preview</h4>
            </Row>
            <p
              style={{
                color: "black",
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              Program Selection
            </p>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Program Type"
                  content={this.state.program_selected.programType}
                />
              </Col>
            </Row>
            <Row>
              {/* <Col span={12}>
                <DescriptionItem
                  title="Mother's Full Name"
                  content={this.state.contact_info.motherName}
                />
              </Col> */}
              {/* <Col span={12}>
                <DescriptionItem
                  title="Sex"
                  content={this.state.contact_info.sex}
                />
              </Col> */}
            </Row>
            {/* <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Birthday"
                  content={new moment(
                    this.state.contact_info.dateOfBirth
                  ).format("MMM Do YYYY")}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Nationality"
                  content={this.state.contact_info.nationality}
                />
              </Col>
            </Row> */}
            <Divider />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Preview;
