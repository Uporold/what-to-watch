import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./components/app/app";
import reducer from "./redux/reducer";
import { createAPI } from "./api";
import { Operation as DataOperation } from "./redux/data/data";
import { Operation as UserOperation, ActionCreator } from "./redux/user/user";
import history from "./history";

const Error = {
  UNAUTHORIZED: 401,
};

const onUnauthorized = (err) => {
  if (err.response && err.response.status === Error.UNAUTHORIZED) {
    store.dispatch(ActionCreator.setAuthorizationStatus(false));
    if (err.response.config.method === `post`) {
      history.push(`/login`);
    }
  }
};

const api = createAPI(onUnauthorized);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.loadMovies());
store.dispatch(DataOperation.loadPromoMovie());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
