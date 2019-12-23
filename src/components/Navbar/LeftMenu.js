import React, { Component } from "react";
import { Menu, Icon, message } from "antd";
import { Redirect, NavLink } from "react-router-dom";
import LModel from "../../services/api";
import moment from "moment";
import ClientSession from "../../services/client-session";
const SubMenu = Menu.SubMenu;

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myApplications: [],
      enterApplicationDetail: false,
      applicationDetailUrl: null
    };
  }

  success = msg => {
    message.success(msg);
  };

  error = msg => {
    message.error(msg);
  };

  createNewUgApplication = event => {
    event.preventDefault();
    console.log("UG");
    let data = {
      applicationType: "Undergraduate",
      status: "InProgress"
    };

    LModel.create("EnrollmentApplications", data)
      .then(response => {
        let enrollmentApplicationId = response.data.data.id;
        this.setState({
          applicationDetailUrl: `/ug-application/${enrollmentApplicationId}`
        });
        this.setState({ enterApplicationDetail: true });
      })
      .catch(err => {
        this.error(err.response.data.error.message);
      });
  };

  createNewPgApplication = event => {
    event.preventDefault();
    let data = {
      applicationType: "Postgraduate",
      status: "InProgress"
    };

    LModel.create("EnrollmentApplications", data)
      .then(response => {
        let enrollmentApplicationId = response.data.data.id;
        this.setState({
          applicationDetailUrl: `/pg-application/${enrollmentApplicationId}`
        });
        this.setState({ enterApplicationDetail: true });
      })
      .catch(err => {
        this.error(err.response.data.error.message);
      });
  };
  componentDidMount() {
    ClientSession.getLoggedInUser(userId => {
      if (userId) {
        LModel.findRelated("Applicants", "enrollmentApplications", userId, null)
          .then(response => {
            const chagned = response.data.data.map(item => {
              item.startDate = new moment(item.startDate).format("MMM Do YYYY");
              item.key = item.id;
              return item;
            });
            this.setState({ myApplications: chagned });
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
    return (
      <Menu mode="horizontal">
        <SubMenu
          title={
            <span>
              <Icon type="form" />
              <span style={{ fontSize: "14pt" }}>Application</span>
            </span>
          }
        >
          <Menu.Item key="requirements" className="req">
            <NavLink
              to="/requirements"
              style={{ fontSize: "12pt" }}
              activeClassName="activeLink"
            >
              Requirements
            </NavLink>
          </Menu.Item>
          <SubMenu
            title={<span style={{ fontSize: "12pt" }}>New Application</span>}
          >
            <Menu.Item key="undergraduate">
              <NavLink
                to="/undergrduate_application"
                activeClassName="activeLink"
                onClick={this.createNewUgApplication}
                className="req"
              >
                Undergraduate
              </NavLink>
            </Menu.Item>
            <Menu.Item key="graduate">
              <NavLink
                to="/grduate_application"
                activeClassName="activeLink"
                onClick={this.createNewPgApplication}
                className="req"
              >
                Graduate
              </NavLink>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    );
  }
}

export default LeftMenu;
