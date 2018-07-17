import React from "react";
import { render } from "react-dom";
import App from "./components/App";
var services = [
    { name: 'Web Development', price: 300 },
    { name: 'Design', price: 400 },
    { name: 'Integration', price: 250 },
    { name: 'Training', price: 220 }
  ];

render(<App items={ services } />, document.getElementById("root"));
