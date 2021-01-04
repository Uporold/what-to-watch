import React, { useState, useEffect, useMemo } from "react";
import MovieNav from "../movie-nav/movie-nav";
import { getSlicedReviews, movieNavs, usePrevious } from "../../utilities/util";
import MoviePageOverview from "../movie-page-overview/movie-page-overview";
import MoviePageDetails from "../movie-page-details/movie-page-details";
import MoviePageReviews from "../movie-page-reviews/movie-page-reviews";
import { projectPropTypes } from "../../utilities/project-prop-types";
import { useLoadMovieReviews } from "../../redux/data/hooks/useLoadMovieReviews";
import { useMovieReviews } from "../../redux/data/hooks/selectors";

const MoviePageInfo = ({ movie }) => {
  const [activeNavBar, setActiveNavBar] = useState(`overview`);
  const previousMovieId = usePrevious(movie.id);
  const movieReviews = useMovieReviews();

  const loadMovieReviews = useLoadMovieReviews();

  const slicedReviews = useMemo(() => getSlicedReviews(movieReviews), [
    movieReviews.length,
  ]);

  useEffect(() => {
    if (previousMovieId && previousMovieId !== movie.id) {
      setActiveNavBar(`overview`);
    }
    loadMovieReviews(movie.id);
  }, [loadMovieReviews, movie.id, previousMovieId]);

  const renderActiveMovieNavInfo = (navBar) => {
    switch (navBar) {
      case `overview`:
        return <MoviePageOverview movie={movie} />;

      case `details`:
        return <MoviePageDetails movie={movie} />;

      case `reviews`:
        return <MoviePageReviews movie={movie} slicedReviews={slicedReviews} />;

      default:
        return <MoviePageOverview movie={movie} />;
    }
  };

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <div className="movie-card__poster movie-card__poster--big">
          <img
            src={movie.posterImage}
            alt={movie.name}
            width="218"
            height="327"
          />
        </div>

        <div className="movie-card__desc">
          <MovieNav
            tabs={movieNavs}
            currentNav={activeNavBar}
            onNavClick={setActiveNavBar}
          />
          {renderActiveMovieNavInfo(activeNavBar)}
        </div>
      </div>
    </div>
  );
};

MoviePageInfo.propTypes = {
  movie: projectPropTypes.MOVIE.isRequired,
};

export default MoviePageInfo;
