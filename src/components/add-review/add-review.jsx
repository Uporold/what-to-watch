import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCurrentMovie,
  getSendingErrorStatus,
  getReviewSendingStatus,
} from "../../redux/data/selectors";
import { projectPropTypes } from "../../utilities/project-prop-types";
import Header from "../header/header";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import { ActionCreator, Operation } from "../../redux/data/data";

const RATING_STARS = [1, 2, 3, 4, 5];

const errorMessageStyle = {
  display: `flex`,
  justifyContent: `center`,
  color: `red`,
};

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      comment: ``,
      stars: 0,
    };
  }

  onRatingChange = (event) => {
    this.setState({ stars: event.target.value });
  };

  onCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  onSubmitFormHandler = (event) => {
    const { movie, onFormSubmit } = this.props;
    const { comment, stars } = this.state;
    event.preventDefault();
    const review = {
      comment,
      rating: stars,
    };
    onFormSubmit(movie.id, review);
  };

  render() {
    const {
      movie,
      isSendingError,
      onTextInputFocus,
      isReviewSending,
    } = this.props;
    const { comment, stars } = this.state;
    return (
      <section
        className="movie-card movie-card--full"
        style={{ background: movie.backgroundColor }}
      >
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={movie.backgroundImage} alt={movie.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header>
            <Breadcrumbs movie={movie} />
          </Header>

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
          <form
            action="#"
            className="add-review__form"
            onSubmit={this.onSubmitFormHandler}
          >
            <div className="rating">
              <div className="rating__stars" onChange={this.onRatingChange}>
                {RATING_STARS.map((elem) => {
                  return (
                    <React.Fragment key={elem}>
                      <input
                        className="rating__input"
                        id={`star-${elem}`}
                        type="radio"
                        name="rating"
                        value={elem}
                        disabled={isReviewSending}
                      />
                      <label className="rating__label" htmlFor={`star-${elem}`}>
                        Rating {elem}
                      </label>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div
              className="add-review__text"
              style={{ background: `rgba(255, 255, 255, 0.4)` }}
            >
              <textarea
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"
                onChange={this.onCommentChange}
                onFocus={onTextInputFocus}
              />
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  type="submit"
                  disabled={isReviewSending || comment.length < 50 || stars < 1}
                >
                  {isReviewSending ? `Sending...` : `Post`}
                </button>
              </div>
            </div>
          </form>
        </div>
        {isSendingError && (
          <p style={errorMessageStyle}>
            An unknown error occurred while sending the message. Try again
            later.
          </p>
        )}
      </section>
    );
  }
}

AddReview.propTypes = {
  movie: projectPropTypes.MOVIE.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onTextInputFocus: PropTypes.func.isRequired,
  isSendingError: PropTypes.bool.isRequired,
  isReviewSending: PropTypes.bool.isRequired,
};

const mapStateToProps = (
  state,
  {
    routeProps: {
      match: { params },
    },
  }
) => ({
  movie: getCurrentMovie(params.id)(state),
  isSendingError: getSendingErrorStatus(state),
  isReviewSending: getReviewSendingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(movieId, review) {
    dispatch(Operation.sendReview(movieId, review));
  },
  onTextInputFocus() {
    dispatch(ActionCreator.setSendingErrorStatus(false));
  },
});

export { AddReview };

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
