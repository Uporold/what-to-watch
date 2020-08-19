import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";

const fakeMoviesList = [`Batman`, `Lord Of The Rings`, `Star Wars`, `Deadpool`];

ReactDOM.render(
  // eslint-disable-next-line react/prop-types
  <App movies={fakeMoviesList} />,
  document.getElementById("root")
);
