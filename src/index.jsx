import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/app/app";
import reducer from "./redux/reducer";
import { movies } from "./mock/movies";

const store = createStore(reducer);

ReactDOM.render(
  // eslint-disable-next-line react/prop-types
  <Provider store={store}>
    <App movies={movies} />
  </Provider>,
  document.getElementById("root")
);
