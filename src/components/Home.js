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
    applicationDetailUrl: null
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
    ClientSession.getLoggedInUser(userId => {
      if (userId) {
        console.log("loggged in user idddddd", userId);
        let filter = `user_id=${userId}`;
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
            this.setState({ myApplications: item });
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
    return (
      <div>
        <Nav />
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
