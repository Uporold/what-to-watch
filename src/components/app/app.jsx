import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MoviePage from "../movie-page/movie-page";
import { projectPropTypes } from "../../utilities/project-prop-types";
import Main from "../main/main";
/* function App({ movies }) {
  const [currentPage, setPage] = React.useState(`main`);
  const [currentMovie, setMovie] = React.useState(movies[0]);
  const movieTitleClickHandler = (movie) => {
    setPage(`film`);
    setMovie(movie);
  };

  const render = () => {
    if (currentPage === `main`) {
      return (
        <Main movies={movies} onSmallCardMovieClick={movieTitleClickHandler} />
      );
    }

    if (currentPage === `film`) {
      return <MoviePage movie={currentMovie} />;
    }

    return null;
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {render()}
        </Route>
        <Route exact path="/dev-film">
          <MoviePage movie={currentMovie} />;
        </Route>
      </Switch>
    </Router>
  );
} */

class App extends PureComponent {
  render() {
    const { movies } = this.props;
    const getMovieById = (id) => {
      return movies.find((movie) => movie.id === parseInt(id, 10));
    };
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/">
              <Main movies={movies} />
            </Route>
            <Route
              path="/films/:id"
              render={({ match }) => {
                const { id } = match.params;
                const movie = getMovieById(id);
                return <MoviePage movie={movie} movies={movies} />;
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

export default App;
