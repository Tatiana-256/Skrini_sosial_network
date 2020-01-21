import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalApp from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GlobalApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
