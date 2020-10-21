import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MoviePage from "../movie-page/movie-page";
import Main from "../main/main";
import VideoPlayer from "../video-player/video-player";
import history from "../../history";
import { getLoadingStatus } from "../../redux/data/selectors";
import LoaderSpinner from "../loader-spinner/loader-spinner";

const App = ({ isDataLoading }) => {
  return (
    <>
      {!isDataLoading ? (
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/films/:id" component={MoviePage} />
            <Route exact path="/player/:id" component={VideoPlayer} />
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
});

App.propTypes = {
  isDataLoading: PropTypes.bool.isRequired,
};

export { App };
export default connect(mapStateToProps)(App);
