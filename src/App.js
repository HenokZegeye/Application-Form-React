import React from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import ApplicationForm from "./components/Forms/ApplicationForm";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route path="/application-form" component={ApplicationForm} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
