import React, { Component } from "react";
import { Form, Select, Row, Col, Input } from "antd";
import LModel from "../../services/api";
const FormItem = Form.Item;
const { Option, OptGroup } = Select;
// const programData = ["Undergraduate", "Graduate"];
// const fieldOfStudyData = {
//   Undergraduate: ["IT and Systems", "Software Engineering"],
//   Graduate: ["IT Management", "System Engineering"]
// };
export class ProgramSelection extends Component {
  state = {
    program_type: [],
    field_of_study: [],
    programData: [],
    fieldOfStudyData: [],
    fieldOfStudies: [],
    secondField: [],
    selected_program_type_id: "",
    selected_field_of_study_id: ""
  };

  componentDidMount() {
    if (!this.props.applicationData.select_program) {
      LModel.findAll("field_of_studies").then(response => {
        let fieldOfStudyObj = {};
        let undergrad = [];
        let grad = [];
        let test_arr = response.data;
        this.setState({ field_of_study: test_arr });
        for (let i = 0; i < test_arr.length; i++) {
          if (
            test_arr[i]["program_type"]["program_type_name"] === "Undergraduate"
          ) {
            undergrad.push(test_arr[i]["field_of_study"]);
          } else if (
            test_arr[i]["program_type"]["program_type_name"] === "Graduate"
          ) {
            grad.push(test_arr[i]["field_of_study"]);
          }
        }
        fieldOfStudyObj.Undergraduate = undergrad;
        fieldOfStudyObj.Graduate = grad;
        this.setState({ fieldOfStudyData: fieldOfStudyObj });
      });
      LModel.findAll("program_types").then(response => {
        console.log("response from program selection findall", response);
        let arr_program = [];
        let programData = response.data;
        this.setState({ program_type: programData });
        for (let i = 0; i < programData.length; i++) {
          const program_type = programData[i]["program_type_name"];
          arr_program.push(program_type);
        }
        this.setState({ programData: arr_program });
        this.setState({
          fieldOfStudies: this.state.fieldOfStudyData[arr_program[0]]
        });
        this.setState({
          secondField: this.state.fieldOfStudyData[arr_program[0][0]]
        });
      });
    } else {
      console.log(
        "applicationdata from program selection",
        this.props.applicationData
      );
      console.log("field ooooooooooof", this.state.fieldOfStudies);
      let component = this;
      component.props.form.setFieldsValue(
        this.props.applicationData.select_program
      );
    }
  }
  componentDidUpdate() {
    console.log("applicaiton data", this.props);
  }

  handleProgramChange = value => {
    this.setState({
      fieldOfStudies: this.state.fieldOfStudyData[value],
      secondField: this.state.fieldOfStudyData[value][0]
    });
    console.log("from handle program change", value);
    console.log("program type frrrrrrrrrrr", this.state.program_type);
    for (let i = 0; i < this.state.program_type.length; i++) {
      const element = this.state.program_type[i];
      if (value === element["program_type_name"]) {
        this.setState({ selected_program_type_id: element["id"] }, () => {
          console.log("iiiiiiddddd", this.state.selected_program_type_id);
        });
      }
    }
  };

  onSecondFieldChange = value => {
    this.setState({
      secondField: value
    });
    for (let i = 0; i < this.state.field_of_study.length; i++) {
      const element = this.state.field_of_study[i];
      if (value === element["field_of_study"]) {
        this.setState({ selected_field_of_study_id: element["id"] }, () => {
          console.log("iiiiiidddddfff", this.state.selected_field_of_study_id);
        });
      }
    }
  };

  render() {
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
                  {this.state.programData.map(program => (
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
                  {this.state.fieldOfStudies.map(fieldOfStudy => (
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
