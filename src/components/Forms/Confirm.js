import React, { Component } from "react";
import { Card } from "antd";

export class Confirm extends Component {
  render() {
    return (
      <div>
        <h2>Your Application Has Been Submitted</h2>
        <h3 className="pl-3">Thank You For Applying To Our College! </h3>
        <Card style={{ width: 500 }}>
          <div style={{ fontSize: "20px", textAlign: "center" }}>
            You Will Be Receiving an Email From any Second Now. It Will Include
            Your Credentials For BITS's College's Portal.Through Which You Can
            Edit, Track The Progress of and Receive Messages Pertainning to Your
            Application.
          </div>
        </Card>
      </div>
    );
  }
}

export default Confirm;
