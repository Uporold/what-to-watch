import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "../main/main";
import MoviePage from "../movie-page/movie-page";
import { projectPropTypes } from "../../utilities/project-prop-types";

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
  constructor(props) {
    super(props);

    this.state = {
      currentPage: `main`,
      currentMovie: this.props.movies[0],
    };
    // this.movieTitleClickHandler = this.movieTitleClickHandler.bind(this);
  }

  movieCardClickHandler = (movie) => {
    this.setState({
      currentPage: `film`,
      currentMovie: movie,
    });
  };

  renderApp(currentPage, currentMovie, movies) {
    // const { currentPage, currentMovie } = this.state;

    if (currentPage === `main`) {
      return (
        <Main
          movies={movies}
          onSmallCardMovieClick={this.movieCardClickHandler}
        />
      );
    }

    if (currentPage === `film`) {
      return (
        <MoviePage
          movie={currentMovie}
          movies={movies}
          onSmallCardMovieClick={this.movieCardClickHandler}
        />
      );
    }

    return null;
  }

  render() {
    const { currentPage, currentMovie } = this.state;
    const { movies } = this.props;
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/">
              {this.renderApp(currentPage, currentMovie, movies)}
            </Route>
            <Route exact path={`/films/${currentMovie.id}`}>
              <MoviePage
                movie={currentMovie}
                movies={movies}
                onSmallCardMovieClick={this.movieCardClickHandler}
              />
            </Route>
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
