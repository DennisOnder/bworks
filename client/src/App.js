import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";

function App() {
  return (
    <Router>
      <Route strict exact path="/" component={Landing} />
    </Router>
  );
}

export default App;
