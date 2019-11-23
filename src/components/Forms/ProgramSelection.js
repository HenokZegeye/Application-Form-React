import React, { Component } from "react";
import { Form, Select, Row, Col, Button } from "antd";

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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
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
            <Form layout="vertical" onSubmit={this.handleSubmit}>
              <FormItem label="Select Program">
                {getFieldDecorator("programType", {
                  rules: [
                    { required: true, message: "Please select program type" }
                  ]
                })(
                  <div>
                    <Select
                      defaultValue={programData[0]}
                      style={{ width: 300 }}
                      onChange={this.handleProgramChange}
                    >
                      {programData.map(program => (
                        <Option key={program}>{program}</Option>
                      ))}
                    </Select>
                  </div>
                )}
              </FormItem>
              <FormItem label="Select Field Of Study">
                {getFieldDecorator("fieldOfStudy", {
                  rules: [
                    { required: true, message: "Please select field of study" }
                  ]
                })(
                  <div>
                    <Select
                      style={{ width: 300 }}
                      value={this.state.secondField}
                      onChange={this.onSecondFieldChange}
                    >
                      {fieldOfStudies.map(fieldOfStudy => (
                        <Option key={fieldOfStudy}>{fieldOfStudy}</Option>
                      ))}
                    </Select>
                  </div>
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
                  <div>
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
                    ,
                  </div>
                )}
              </FormItem>
              <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit">
                  Continue
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
ProgramSelection = Form.create()(ProgramSelection);
export default ProgramSelection;
