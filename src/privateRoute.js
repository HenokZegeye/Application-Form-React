import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import ClientSession from "./services/client-session.js";

class PrivateRouteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      checked: ""
    };
  }

  componentWillMount() {
    console.log("in mount");
    ClientSession.isLoggedIn(isLoggedIn => {
      console.log(isLoggedIn, "from mount", this.state);
      this.setState(
        {
          isLoggedIn: isLoggedIn,
          checked: "yes"
        },
        () => {
          return "do nothing";
        }
      );
    });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    if (!this.state.checked) {
      return false;
    }
    if (this.state.isLoggedIn) {
      return <Route {...rest} component={Component} />;
    } else {
      return (
        <Redirect
          to={{ pathname: "/login", state: { from: this.props.location } }}
        />
      );
    }
  }
}

export default PrivateRouteComponent;
