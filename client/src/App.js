import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store()}>
      <Router>
        <Route strict exact path="/" component={Landing} />
      </Router>
    </Provider>
  );
}

export default App;
