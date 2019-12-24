import React from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import ApplicationForm from "./components/Forms/ApplicationForm";
import PrivateRouteComponent from "./privateRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Preview from "./components/Forms/Preview";
import ApplicationDetail from "./components/Forms/ApplicationDetail";

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
        <PrivateRouteComponent
          exact
          path="/ug-application/:enrollmentApplicationId"
          name="UG Application"
          component={ApplicationDetail}
        />
        <PrivateRouteComponent
          exact
          path="/pg-application/:enrollmentApplicationId"
          name="PG Application"
          component={ApplicationDetail}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
