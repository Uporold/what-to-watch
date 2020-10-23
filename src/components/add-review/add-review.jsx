import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getCurrentMovie } from "../../redux/data/selectors";
import { MoviePage } from "../movie-page/movie-page";
import { projectPropTypes } from "../../utilities/project-prop-types";

const RATING_STARS = [1, 2, 3, 4, 5];

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      stars: 5,
      review: ``,
    };
  }

  render() {
    const { movie } = this.props;
    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={movie.backgroundImage} alt={movie.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="movie-page.html" className="breadcrumbs__link">
                    The Grand Budapest Hotel
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

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

          <div className="movie-card__poster movie-card__poster--small">
            <img
              src={movie.posterImage}
              alt={movie.name}
              width="218"
              height="327"
            />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form">
            <div className="rating">
              <div className="rating__stars">
                {RATING_STARS.map((elem) => {
                  return (
                    <React.Fragment key={elem}>
                      <input
                        className="rating__input"
                        id={`star-${elem}`}
                        type="radio"
                        name="rating"
                        value={elem}
                      />
                      <label className="rating__label" htmlFor={`star-${elem}`}>
                        Rating {elem}
                      </label>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="add-review__text">
              <textarea
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"
              />
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit">
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

AddReview.propTypes = {
  movie: projectPropTypes.MOVIE.isRequired,
};

export { AddReview };

const mapStateToProps = (state, { match: { params } }) => ({
  movie: getCurrentMovie(params.id)(state),
});

export default connect(mapStateToProps)(MoviePage);
