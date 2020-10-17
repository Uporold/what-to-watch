import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./components/app/app";
import reducer from "./redux/reducer";
import { createAPI } from "./api";
import { Operation as DataOperation } from "./redux/data/data";

const api = createAPI();

const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(DataOperation.loadMovies());
store.dispatch(DataOperation.loadPromoMovie());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
