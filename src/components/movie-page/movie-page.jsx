import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MovieNav from "../movie-nav/movie-nav";
import MoviePageOverview from "../movie-page-overview/movie-page-overview";
import MoviePageDetails from "../movie-page-details/movie-page-details";
import MoviePageReviews from "../movie-page-reviews/movie-page-reviews";
import MoviesList from "../movies-list/movies-list";
import { movieNavs } from "../../utilities/util";
import { projectPropTypes } from "../../utilities/project-prop-types";

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeNavBar: `overview`,
    };

    this.onNavClickHandler = this.onNavClickHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    this.setDefaultState(prevProps);
  }

  onNavClickHandler(navBar) {
    this.setState({
      activeNavBar: navBar,
    });
  }

  setDefaultState(prevProps) {
    const { movie } = this.props;
    if (movie !== prevProps.movie) {
      this.setState({ activeNavBar: `overview` });
    }
  }

  getRelatedVideos(movie, movies) {
    return movies
      .filter((item) => item.genre === movie.genre && item.id !== movie.id)
      .slice(0, 4);
  }

  renderActiveMovieNavInfo(activeNavBar) {
    const { movie } = this.props;
    switch (activeNavBar) {
      case `overview`:
        return <MoviePageOverview movie={movie} />;

      case `details`:
        return <MoviePageDetails movie={movie} />;

      case `reviews`:
        return <MoviePageReviews movie={movie} />;

      default:
        return <MoviePageOverview movie={movie} />;
    }
  }

  render() {
    const {
      backgroundImage,
      name,
      genre,
      released,
      posterImage,
      backgroundColor,
    } = this.props.movie;

    const { movies, movie } = this.props;
    const { activeNavBar } = this.state;
    return (
      <>
        <section
          className="movie-card movie-card--full"
          style={{ background: backgroundColor }}
        >
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={backgroundImage} alt={name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <a href="main.html" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>

              <div className="user-block">
                <div className="user-block__avatar">
                  <img
                    src="img/avatar.jpg"
                    alt="User avatar"
                    width="63"
                    height="63"
                  />
                </div>
              </div>
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{released}</span>
                </p>

                <div className="movie-card__buttons">
                  <button
                    className="btn btn--play movie-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s" />
                    </svg>
                    <span>Play</span>
                  </button>
                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add" />
                    </svg>
                    <span>My list</span>
                  </button>
                  <a href="add-review.html" className="btn movie-card__button">
                    Add review
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={posterImage} alt={name} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <MovieNav
                  tabs={movieNavs}
                  currentNav={activeNavBar}
                  onNavClickHandler={this.onNavClickHandler}
                />
                {this.renderActiveMovieNavInfo(activeNavBar)}
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <MoviesList movies={this.getRelatedVideos(movie, movies)} />
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

MoviePage.propTypes = {
  movies: PropTypes.arrayOf(projectPropTypes.MOVIE.isRequired).isRequired,
  movie: projectPropTypes.MOVIE.isRequired,
};

export default MoviePage;
