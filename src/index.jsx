import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import { movies } from "./mock/movies";

ReactDOM.render(
  // eslint-disable-next-line react/prop-types
  <App movies={movies} />,
  document.getElementById("root")
);
