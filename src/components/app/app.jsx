import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "../main/main";
import MoviePage from "../movie-page/movie-page";

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
    this.movieTitleClickHandler = this.movieTitleClickHandler.bind(this);
  }

  movieTitleClickHandler(movie) {
    this.setState({
      currentPage: `film`,
      currentMovie: movie,
    });
  }

  renderApp(currentPage, currentMovie) {
    //const { currentPage, currentMovie } = this.state;

    if (currentPage === `main`) {
      return (
        <Main
          movies={this.props.movies}
          onSmallCardMovieClick={this.movieTitleClickHandler}
        />
      );
    }

    if (currentPage === `film`) {
      return <MoviePage movie={currentMovie} />;
    }

    return null;
  }

  render() {
    const { currentPage, currentMovie } = this.state;
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {this.renderApp(currentPage, currentMovie)}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage movie={currentMovie} />;
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      posterImage: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      scoresCount: PropTypes.number.isRequired,
      director: PropTypes.string.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      runtime: PropTypes.number.isRequired,
      genre: PropTypes.string.isRequired,
      released: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      isFavorite: PropTypes.bool.isRequired,
      videoLink: PropTypes.string.isRequired,
      previewVideoLink: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default App;
