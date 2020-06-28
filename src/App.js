import React from "react";
import Homepage from "./Main/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Homepage} />{" "}
        <Route path="/" exact component={Homepage} />{" "}
        <Route path="/" exact component={Homepage} />{" "}
        <Route path="/" exact component={Homepage} />{" "}
      </Switch>{" "}
    </Router>
  );
}

export default App;
