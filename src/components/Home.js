import React, { Component } from "react";
import Nav from "./Navbar/Navbar";
import ClientSession from "../services/client-session";
import moment from "moment";
import { Table, Row, Col } from "antd";
import { Redirect } from "react-router-dom";
import LModel from "../services/api";
const columns = [
  {
    title: "Application",
    dataIndex: "applicationType"
  },
  {
    title: "Start Date",
    dataIndex: "startDate"
  },
  {
    title: "Status",
    dataIndex: "status"
  }
];
export class Home extends Component {
  state = {
    myApplications: [],
    enterApplicationDetail: false,
    applicationDetailUrl: null,
    current_applicant: ""
  };
  onRowClicked = record => {
    let application = record;
    let applicationId = application.detail.id;
    if (application.applicationType == "Undergraduate") {
      this.setState({
        applicationDetailUrl: `/ug-application/${applicationId}`
      });
      this.setState({ enterApplicationDetail: true });
    } else {
      this.setState({
        applicationDetailUrl: `pg-application/${applicationId}`
      });
      this.setState({ enterApplicationDetail: true });
    }
  };
  componentDidMount() {
    ClientSession.getLoggedInUser(user => {
      if (user.id) {
        console.log("loggged in user idddddd", user);
        let filter = `user_id=${user.id}`;
        LModel.findAll("enrollment_applications", filter)
          .then(response => {
            console.log(response.data[0]);
            console.log("response arrrat", Object.entries(response));
            let item = [];
            item.push({
              detail: response.data[0],
              startDate: new moment(response.data[0].created_at).format(
                "MMM Do YYYY"
              ),
              key: response.data[0].id,
              applicationType:
                response.data[0].program.program_type.program_type_name,
              status: response.data[0].status
            });
            console.log("iteemmm", item);
            this.setState({ myApplications: item }, () => {
              const current_applicant = this.state.myApplications[0].detail
                .applicant;
              const current_applicant_full_name =
                current_applicant.first_name +
                " " +
                current_applicant.middle_name;
              this.setState(
                { current_applicant: current_applicant_full_name },
                () => {
                  console.log(
                    "current applicant from state",
                    this.state.current_applicant
                  );
                }
              );
            });
          })
          .catch(err => {
            console.log("Err ==> ", err);
          });
      }
    });
  }

  render() {
    if (this.state.enterApplicationDetail) {
      return <Redirect to={this.state.applicationDetailUrl} />;
    }
    console.log("from render myapplication", this.state.myApplications);
    console.log("from render current applicant", this.state.current_applicant);
    return (
      <div>
        {this.state.current_applicant && (
          <Nav current_applicant={this.state.current_applicant} />
        )}
        <Row>
          <Col style={{ marginTop: "20px" }}>
            <h3 id="myApp">My Application</h3>
            <div className="container">
              <Table
                onRow={(record, rowIndex) => {
                  return {
                    onClick: event => this.onRowClicked(record) // click row
                  };
                }}
                style={{ marginTop: "1%" }}
                columns={columns}
                dataSource={this.state.myApplications}
                size="middle"
                pagination={false}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
