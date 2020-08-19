import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main";

function App({ movies }) {
  return <Main movies={movies} />;
}

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default App;
