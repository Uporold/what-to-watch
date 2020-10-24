import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { projectPropTypes } from "../../utilities/project-prop-types";

const Breadcrumbs = ({ movie }) => {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/films/${movie.id}`} className="breadcrumbs__link">
            {movie.name}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  movie: projectPropTypes.MOVIE.isRequired,
};

export default Breadcrumbs;
