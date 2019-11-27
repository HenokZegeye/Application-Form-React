import React, { Component } from "react";
import { Form, Select, Row, Col, Input } from "antd";
const FormItem = Form.Item;
const { Option, OptGroup } = Select;
const programData = ["Undergraduate", "Graduate"];
const fieldOfStudyData = {
  Undergraduate: ["IT and Systems", "Software Engineering"],
  Graduate: ["IT Management", "System Engineering"]
};
export class ProgramSelection extends Component {
  state = {
    fieldOfStudies: fieldOfStudyData[programData[0]],
    secondField: fieldOfStudyData[programData[0]][0]
  };

  handleProgramChange = value => {
    this.setState({
      fieldOfStudies: fieldOfStudyData[value],
      secondField: fieldOfStudyData[value][0]
    });
  };

  onSecondFieldChange = value => {
    this.setState({
      secondField: value
    });
  };

  render() {
    const { fieldOfStudies } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h4 className="pt-4">Select the program you wish to Apply to</h4>
        <Row type="flex">
          <Col span={24}>
            <FormItem label="Select Program">
              {getFieldDecorator("programType", {
                rules: [
                  { required: true, message: "Please select program type" }
                ]
              })(
                <Select
                  style={{ width: 300 }}
                  onChange={this.handleProgramChange}
                >
                  {programData.map(program => (
                    <Option key={program}>{program}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem label="Select Field Of Study">
              {getFieldDecorator("fieldOfStudy", {
                rules: [
                  { required: true, message: "Please select field of study" }
                ]
              })(
                <Select
                  style={{ width: 300 }}
                  onChange={this.onSecondFieldChange}
                >
                  {fieldOfStudies.map(fieldOfStudy => (
                    <Option key={fieldOfStudy}>{fieldOfStudy}</Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem label="Select Mode Of Attendance">
              {getFieldDecorator("modeOfAttendance", {
                rules: [
                  {
                    required: true,
                    message: "Please select mode of attendance"
                  }
                ]
              })(
                <Select
                  style={{ width: 300 }}
                  placeholder="Please select mode of attendance"
                >
                  <Option value="Regular">Regular</Option>
                  <OptGroup label="Partime">
                    <Option value="Weekend">Weekend</Option>
                    <Option value="Evening">Evening</Option>
                  </OptGroup>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProgramSelection;
