import React from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import ApplicationForm from "./components/Forms/ApplicationForm";
import PrivateRouteComponent from "./privateRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route path="/application-form" component={ApplicationForm} exact />
        <Route path="/login" component={Login} exact />
        {/* <Route path="/home" component={Home} exact /> */}
        <PrivateRouteComponent
          exact
          path="/home"
          name="Home"
          component={Home}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
