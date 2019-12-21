import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Logo from "./Logo";

export class Welcome extends Component {
  render() {
    return (
      <div className="header">
        <div className="text-center">
          <Logo />
          <h1>Welcome to BITS College's Online Application Service!</h1>
          <h2>
            To learn more about what we offer visit our{" "}
            <a href="http://bitscollege.edu.et/" target="_blank">
              Website
            </a>
          </h2>
          <h2>
            If You Want To Continue Please Click
            <span>
              <Link to="/application-form">
                <Button type="link" style={{ fontSize: "25px" }}>
                  Proceed
                </Button>
              </Link>
            </span>
          </h2>
        </div>
      </div>
    );
  }
}

export default Welcome;
