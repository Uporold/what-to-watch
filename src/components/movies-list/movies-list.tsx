import React from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import { Movie } from "../../utilities/types";

interface Props {
  movies: Array<Movie>;
}

const MoviesList: React.FC<Props> = ({ movies }): JSX.Element => {
  return (
    <div className="catalog__movies-list">
      {movies.map((movie) => (
        <SmallMovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
