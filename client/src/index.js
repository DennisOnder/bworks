import React from "react";
import ReactDOM from "react-dom";
import "./Base.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("board"));

serviceWorker.unregister();
