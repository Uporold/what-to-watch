import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import MoviePage from "../../pages/movie-page/movie-page";
import Main from "../../pages/main/main";
import VideoPlayer from "../../pages/video-player/video-player";
import history from "../../history";
import LoaderSpinner from "../loader-spinner/loader-spinner";
import SignIn from "../../pages/sign-in/sign-in";
import AddReview from "../../pages/add-review/add-review";
import MyList from "../../pages/my-list/my-list";
import PrivateRoute from "../private-route/private-route";
import ErrorPage from "../../pages/error-page/error-page";
import {
  useAuthorizationLoadingStatus,
  useAuthorizationStatus,
} from "../../redux/user/hooks/selectors";
import { useDataLoadingStatus } from "../../redux/data/hooks/selectors";

const App = () => {
  const authorizationStatus = useAuthorizationStatus();
  const isAuthorizationLoading = useAuthorizationLoadingStatus();
  const isDataLoading = useDataLoadingStatus();
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

export default App;
