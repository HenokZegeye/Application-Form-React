import React, { Component } from "react";
import { Menu, Icon } from "antd";
import LModel from "../../services/api";
import ClientSession from "../../services/client-session";
import { Redirect } from "react-router-dom";
import { Avatar } from "antd";
const SubMenu = Menu.SubMenu;

class RightMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false
    };
  }
  componentDidMount() {
    // console.log(
    //   "currrrrrrrrrrrrrrrrrent user from right navbar",
    //   this.props.current_applicant
    // );
  }
  onClickLogout = () => {
    ClientSession.removeAuth(err => {
      if (!err) {
        this.setState({ redirectToLogin: true });
      }
    });
  };
  render() {
    const current_applicant = this.props.current_applicant;
    if (this.state.redirectToLogin) {
      return <Redirect to={"/login"} />;
    }
    return (
      <Menu mode="horizontal">
        <Menu.Item
          style={{ fontSize: "14pt" }}
          className="req"
          key="notification"
        >
          <a>
            <Icon type="bell" />
            Notification
          </a>
        </Menu.Item>
        <SubMenu
          title={
            <span>
              <Icon type="user" />
              <span style={{ fontSize: "14pt" }}>{current_applicant}</span>
            </span>
          }
        >
          <Menu.Item
            className="req"
            key="setting:1"
            onClick={this.onClickLogout}
          >
            Logout
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default RightMenu;
