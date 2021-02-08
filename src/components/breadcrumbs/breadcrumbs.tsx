import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../utilities/types";

interface Props {
  movie: Movie;
}

const Breadcrumbs: React.FC<Props> = ({ movie }): JSX.Element => {
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

export default Breadcrumbs;
