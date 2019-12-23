import React, { Component } from "react";
import Nav from "./Navbar/Navbar";
import ClientSession from "../services/client-session";
import { Table, Row, Col } from "antd";
import LModel from "../services/api";
export class Home extends Component {
  state = {
    myApplications: [],
    enterApplicationDetail: false,
    applicationDetailUrl: null
  };
  componentDidMount() {
    ClientSession.getLoggedInUser(userId => {
      console.log("userrrrr id", userId);
      if (userId) {
        LModel.find("applicants", userId).then(response => {
          console.log("applcant", response);
        });
        // LModel.findRelated("Applicants", "enrollmentApplications", userId, null)
        //   .then(response => {
        //     console.log("EnroApp ==> ", response);
        //     const chagned = response.data.data.map(item => {
        //       item.startDate = new moment(item.startDate).format("MMM Do YYYY");
        //       item.key = item.id;
        //       return item;
        //     });
        //     this.setState({ myApplications: chagned });
        //   })
        //   .catch(err => {
        //     console.log("Err ==> ", err);
        //   });
        console.log("userrrrr id", userId);
      }
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <Row>
          <Col style={{ marginTop: "20px" }}>
            <h3 id="myApp">My Applications</h3>
            <Table
              //   onRow={(record, rowIndex) => {
              //     return {
              //       onClick: event => this.onRowClicked(record) // click row
              //     };
              //   }}
              style={{ marginTop: "1%" }}
              //   columns={columns}
              //   dataSource={this.state.myApplications}
              size="middle"
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
