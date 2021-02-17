import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import Header from "../../components/header/header";
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import {
  useCurrentMovie,
  useReviewSendingStatus,
  useSendingErrorStatus,
} from "../../redux/data/hooks/selectors";
import { useSendReview } from "../../redux/data/hooks/useSendReview";
import { useSetSendingErrorStatus } from "../../redux/data/hooks/useSetSendingErrorStatus";

const RATING_STARS = [1, 2, 3, 4, 5];

const errorMessageStyle = {
  display: `flex`,
  justifyContent: `center`,
  color: `red`,
};

interface MatchParams {
  id: string;
}

interface Props {
  routeProps: RouteComponentProps<MatchParams>;
}

const AddReview: React.FC<Props> = ({ routeProps }): JSX.Element => {
  const [comment, setComment] = useState<string>(``);
  const [stars, setStars] = useState<number>(5);
  const sendReview = useSendReview();
  const isReviewSending = useReviewSendingStatus();
  const isSendingError = useSendingErrorStatus();
  const setSendingErrorStatus = useSetSendingErrorStatus();
  const movieId = Number(routeProps.match.params.id);
  const movie = useCurrentMovie(movieId);

  const onCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const onRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStars(+event.target.value);
  };

  const onTextInputFocus = () => {
    setSendingErrorStatus(false);
  };

  const onSubmitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const review = {
      comment,
      rating: stars,
    };
    sendReview(movie.id, review);
  };

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
          onSubmit={onSubmitFormHandler}
        >
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
                      onChange={onRatingChange}
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
              onChange={onCommentChange}
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
          An unknown error occurred while sending the message. Try again later.
        </p>
      )}
    </section>
  );
};

export default AddReview;
