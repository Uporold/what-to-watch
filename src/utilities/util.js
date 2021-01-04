import { useEffect, useRef } from "react";

export const getRatingLevel = (rating) => {
  let test = null;
  if (rating >= 0 && rating < 3) {
    test = `Bad`;
  }
  if (rating >= 3 && rating < 5) {
    test = `Normal`;
  }
  if (rating >= 5 && rating < 8) {
    test = `Good`;
  }
  if (rating >= 8 && rating < 10) {
    test = `Very good`;
  }
  if (rating === 10) {
    test = `Awesome`;
  }
  return test;
};

export const getSlicedReviews = (reviews) => {
  if (reviews.length !== 0) {
    const sliceBorderIndex = Math.ceil(reviews.length / 2);
    const firstColumn = reviews.slice(0, sliceBorderIndex);
    const secondColumn = reviews.slice(sliceBorderIndex, reviews.length);
    return [firstColumn, secondColumn];
  }
  return [];
};

export const movieNavs = [`overview`, `details`, `reviews`];

export const getMoviesGenres = (movies) => {
  const genres = new Set(
    movies
      .map((movie) => movie.genre)
      .sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      })
  );
  return [`All genres`, ...genres];
};

export const getMoviesByGenre = (movies, genre) => {
  if (genre === `All genres`) {
    return movies;
  }
  return movies.filter((movie) => movie.genre === genre);
};

export const extend = (state, newStateValue) => {
  return { ...state, ...newStateValue };
};

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
