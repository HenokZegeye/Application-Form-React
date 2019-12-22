import React from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import ApplicationForm from "./components/Forms/ApplicationForm";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route path="/application-form" component={ApplicationForm} exact />
        <Route path="/login" component={Login} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
