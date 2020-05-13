import React from "react";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import ReactDOM from "react-dom";
import GlobalApp from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.render(<GlobalApp />, document.getElementById("root"));

// ReactDOM.render(<newClass />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();