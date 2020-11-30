import MockAdapter from "axios-mock-adapter";
import { reducer, ActionCreator, ActionType, Operation } from "./data";
import { movies } from "../../mock/movies";
import { reviews } from "../../mock/reviews";
import { createAPI } from "../../api";

const pureMovies = [
  {
    name: "Gangs of new york",
    [`poster_image`]: "https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg",
    [`preview_image`]: "https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg",
    [`background_image`]: "https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg",
    [`background_color`]: "#A6B7AC",
    description:
      "In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.",
    rating: 8.8,
    [`scores_count`]: 370881,
    director: "Martin Scorsese",
    starring: ["Leonardo DiCaprio", "Cameron Diaz", "Daniel Day-Lewis"],
    [`run_time`]: 167,
    genre: "Crime",
    released: 2002,
    id: 1,
    [`is_favorite`]: false,
    [`video_link`]: "http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4",
    [`preview_video_link`]: "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
  },
];

const CUT_LENGTH = 4;

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    movies: [],
    promoMovie: {},
    favoriteMovies: [],
    movieReviews: [],
    showedMoviesCount: CUT_LENGTH,
    isDataLoading: true,
    isFavoritesLoading: true,
    isSendingError: false,
    isReviewSending: false,
    errorMessage: ``,
  });
});

it(`Reducer should update movies by load movies`, () => {
  expect(
    reducer(
      {
        movies: [],
      },
      {
        type: ActionType.LOAD_MOVIES,
        payload: movies,
      }
    )
  ).toEqual({
    movies,
  });
});

it(`Reducer should update favorite movies by load favorite movies`, () => {
  expect(
    reducer(
      {
        favoriteMovies: [],
      },
      {
        type: ActionType.LOAD_FAVORITE_MOVIES,
        payload: movies,
      }
    )
  ).toEqual({
    favoriteMovies: movies,
  });
});

it(`Reducer should update favorite movies by load promo movie`, () => {
  expect(
    reducer(
      {
        promoMovie: {},
      },
      {
        type: ActionType.LOAD_PROMO_MOVIE,
        payload: movies[0],
      }
    )
  ).toEqual({
    promoMovie: movies[0],
  });
});

it(`Reducer should update movie reviews by load movie reviews`, () => {
  expect(
    reducer(
      {
        movieReviews: [],
      },
      {
        type: ActionType.LOAD_MOVIE_REVIEWS,
        payload: reviews,
      }
    )
  ).toEqual({
    movieReviews: reviews,
  });
});

it(`Reducer should update showed movies count by show more movies`, () => {
  expect(
    reducer(
      {
        showedMoviesCount: 4,
      },
      {
        type: ActionType.SHOW_MORE_MOVIES,
        payload: 4,
      }
    )
  ).toEqual({
    showedMoviesCount: 8,
  });
});

it(`Reducer should finish movies loading correctly`, () => {
  expect(
    reducer(
      {
        isDataLoading: true,
      },
      {
        type: ActionType.FINISH_LOADING,
        payload: false,
      }
    )
  ).toEqual({
    isDataLoading: false,
  });
});

it(`Reducer should finish favorite movies loading correctly`, () => {
  expect(
    reducer(
      {
        isFavoritesLoading: true,
      },
      {
        type: ActionType.FINISH_FAVORITES_LOADING,
        payload: false,
      }
    )
  ).toEqual({
    isFavoritesLoading: false,
  });
});

it(`Reducer should update favorite movies`, () => {
  expect(
    reducer(
      {
        movies,
        promoMovie: [],
      },
      {
        type: ActionType.UPDATE_FAVORITE_STATUS,
        payload: movies[0],
      }
    )
  ).toEqual({
    movies,
    promoMovie: [],
  });
});

it(`Reducer should send error status correctly`, () => {
  expect(
    reducer(
      {
        isSendingError: false,
      },
      {
        type: ActionType.SET_SENDING_ERROR_STATUS,
        payload: true,
      }
    )
  ).toEqual({
    isSendingError: true,
  });
});

it(`Reducer should send review sending status correctly`, () => {
  expect(
    reducer(
      {
        isReviewSending: false,
      },
      {
        type: ActionType.SET_REVIEW_SENDING_STATUS,
        payload: true,
      }
    )
  ).toEqual({
    isReviewSending: true,
  });
});

it(`Reducer should load error message`, () => {
  expect(
    reducer(
      {
        errorMessage: ``,
      },
      {
        type: ActionType.SET_ERROR_MESSAGE,
        payload: `Testing error message`,
      }
    )
  ).toEqual({
    errorMessage: `Testing error message`,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for load movies returns correct action`, () => {
    expect(ActionCreator.loadMovies(movies)).toEqual({
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    });
  });

  it(`Action creator for load favorite movies returns correct action`, () => {
    expect(ActionCreator.loadFavoriteMovies(movies)).toEqual({
      type: ActionType.LOAD_FAVORITE_MOVIES,
      payload: movies,
    });
  });

  it(`Action creator for load movie reviews returns correct action`, () => {
    expect(ActionCreator.loadMovieReviews(reviews)).toEqual({
      type: ActionType.LOAD_MOVIE_REVIEWS,
      payload: reviews,
    });
  });

  it(`Action creator for load promo movie returns correct action`, () => {
    expect(ActionCreator.loadPromoMovie(movies[0])).toEqual({
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: movies[0],
    });
  });

  it(`Action creator for show more movies returns correct action`, () => {
    expect(ActionCreator.showMoreMovies()).toEqual({
      type: ActionType.SHOW_MORE_MOVIES,
      payload: CUT_LENGTH,
    });
  });

  it(`Action creator for finish loading returns correct action`, () => {
    expect(ActionCreator.finishLoading()).toEqual({
      type: ActionType.FINISH_LOADING,
      payload: false,
    });
  });

  it(`Action creator for finish favorites loading returns correct action`, () => {
    expect(ActionCreator.finishFavoritesLoading()).toEqual({
      type: ActionType.FINISH_FAVORITES_LOADING,
      payload: false,
    });
  });

  it(`Action creator for update favorite status returns correct action`, () => {
    expect(ActionCreator.updateFavoriteStatus(movies[0])).toEqual({
      type: ActionType.UPDATE_FAVORITE_STATUS,
      payload: movies[0],
    });
  });

  it(`Action creator for set sending status returns correct action`, () => {
    expect(ActionCreator.setSendingErrorStatus(`Test error`)).toEqual({
      type: ActionType.SET_SENDING_ERROR_STATUS,
      payload: `Test error`,
    });
  });

  it(`Action creator for set review sending status returns correct action`, () => {
    expect(ActionCreator.setReviewSendingStatus(`Test error`)).toEqual({
      type: ActionType.SET_REVIEW_SENDING_STATUS,
      payload: `Test error`,
    });
  });

  it(`Action creator for set error message returns correct action`, () => {
    expect(ActionCreator.setErrorMessage(`Test error`)).toEqual({
      type: ActionType.SET_ERROR_MESSAGE,
      payload: `Test error`,
    });
  });
});

describe(`Operations work correctly`, () => {
  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    apiMock.onGet(`/films`).reply(200, pureMovies);
    return moviesLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_MOVIES,
        payload: [movies[0]],
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.FINISH_LOADING,
        payload: false,
      });
    });
  });

  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoMovieLoader = Operation.loadPromoMovie();

    apiMock.onGet(`/films/promo`).reply(200, ...pureMovies);
    return promoMovieLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_PROMO_MOVIE,
        payload: movies[0],
      });
    });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteMoviesLoader = Operation.loadFavoriteMovies();

    apiMock.onGet(`/favorite`).reply(200, pureMovies);
    return favoriteMoviesLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_FAVORITE_MOVIES,
        payload: [movies[0]],
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.FINISH_FAVORITES_LOADING,
        payload: false,
      });
    });
  });

  it(`Should make a correct API call to /comments/0`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieReviews = Operation.loadMovieReviews(0);

    apiMock.onGet(`/comments/0`).reply(200, reviews);
    return movieReviews(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_MOVIE_REVIEWS,
        payload: reviews,
      });
    });
  });

  it(`Operation should check POST to /comments/0`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReview = { comment: `Test comment`, email: `test@test.ru` };
    const sendReview = Operation.sendReview(0, fakeReview);

    apiMock.onPost(`/comments/0`).reply(200, [{ fake: true }]);

    return sendReview(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_REVIEW_SENDING_STATUS,
        payload: true,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.SET_SENDING_ERROR_STATUS,
        payload: false,
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.SET_REVIEW_SENDING_STATUS,
        payload: false,
      });
    });
  });

  it(`Operation should check POST to /favorite/0/1`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const changeFavorite = Operation.changeMovieFavoriteStatus(0, true);

    apiMock.onPost(`/favorite/0/1`).reply(200, pureMovies[0]);

    return changeFavorite(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.UPDATE_FAVORITE_STATUS,
        payload: movies[0],
      });
    });
  });
});
