import React, { Component } from "react";
import { Menu, Icon } from "antd";

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
  onClickLogout = () => {
    ClientSession.removeAuth(err => {
      if (!err) {
        this.setState({ redirectToLogin: true });
      }
    });
  };
  render() {
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
              <span style={{ fontSize: "14pt" }}>User</span>
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
