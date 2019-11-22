import React, { Component } from "react";
import Logo from "./Logo";

export class ApplicationForm extends Component {
  render() {
    return (
      <div>
        <Logo />
        <h1>
          To Learn More About What We Offer Visit Our <a href="#">Website</a>
        </h1>
        <h2>Steps to Apply to BITS College</h2>
      </div>
    );
  }
}

export default ApplicationForm;
