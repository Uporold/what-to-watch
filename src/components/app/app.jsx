import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MoviePage from "../movie-page/movie-page";
import Main from "../main/main";
import VideoPlayer from "../video-player/video-player";
import history from "../../history";
import { getLoadingStatus } from "../../redux/data/selectors";
import LoaderSpinner from "../loader-spinner/loader-spinner";
import SignIn from "../sign-in/sign-in";
import AddReview from "../add-review/add-review";
import {
  getAuthorizationStatus,
  getAuthorizationLoadingStatus,
} from "../../redux/user/selectors";
import MyList from "../my-list/my-list";
import PrivateRoute from "../private-route/private-route";
import ErrorPage from "../error-page/error-page";

const App = ({
  isDataLoading,
  authorizationStatus,
  isAuthorizationLoading,
}) => {
  return (
    <>
      {!isDataLoading && !isAuthorizationLoading ? (
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/films/:id" component={MoviePage} />
            <Route exact path="/player/:id" component={VideoPlayer} />
            <Route
              exact
              path="/login"
              render={() => {
                return !authorizationStatus ? <SignIn /> : <Redirect to="/" />;
              }}
            />

            <PrivateRoute
              exact
              path="/films/:id/review"
              render={(routeProps) => <AddReview routeProps={routeProps} />}
            />
            <PrivateRoute exact path="/favorites" render={() => <MyList />} />
            <Route exact path="/error" component={ErrorPage} />
          </Switch>
        </Router>
      ) : (
        <LoaderSpinner />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isDataLoading: getLoadingStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
  isAuthorizationLoading: getAuthorizationLoadingStatus(state),
});

App.propTypes = {
  isDataLoading: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.bool.isRequired,
  isAuthorizationLoading: PropTypes.bool.isRequired,
};

export { App };
export default connect(mapStateToProps)(App);
