import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main";

const movieTitleClickHandler = (evt) => {
  evt.preventDefault();
};

function App({ movies }) {
  return <Main movies={movies} onMovieTitleClick={movieTitleClickHandler} />;
}

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default App;
