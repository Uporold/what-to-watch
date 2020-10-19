import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import MoviePage from "../movie-page/movie-page";
import { projectPropTypes } from "../../utilities/project-prop-types";
import Main from "../main/main";
import VideoPlayer from "../video-player/video-player";
import NameSpace from "../../redux/name-space";
import history from "../../history";

class App extends PureComponent {
  render() {
    const { movies } = this.props;
    const getMovieById = (id) => {
      return movies.find((movie) => movie.id === parseInt(id, 10));
    };
    return (
      <>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route
              exact
              path="/films/:id"
              render={({ match }) => {
                const { id } = match.params;
                const movie = getMovieById(id);
                return <MoviePage movie={movie} movies={movies} />;
              }}
            />
            <Route
              exact
              path="/player/:id"
              render={({ match }) => {
                const { id } = match.params;
                const movie = getMovieById(id);
                return <VideoPlayer movie={movie} />;
              }}
            />
          </Switch>
        </Router>
      </>
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(projectPropTypes.MOVIE.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  movies: state[NameSpace.DATA].movies,
});

export { App };
export default connect(mapStateToProps)(App);
