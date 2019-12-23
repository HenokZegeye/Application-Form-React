import React, { Component } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {
    current: "mail",
    visible: false
  };
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <nav className="menuBar">
        <div className="logo">
          <Link to="/">
            <img
              width="100px"
              height="50px"
              src="/Logo_main-100.jpg"
              alt="main_logo"
            />
          </Link>
        </div>
        <div className="menuCon">
          {/* <div className="leftMenu">
            <LeftMenu />
          </div> */}
          <div className="rightMenu">
            <RightMenu />
          </div>
          <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
            <span className="barsBtn" />
          </Button>
          <Drawer
            title="BITS"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <LeftMenu />
            <RightMenu />
          </Drawer>
        </div>
      </nav>
    );
  }
}

export default Navbar;
