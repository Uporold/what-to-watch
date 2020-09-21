import React from "react";
import moment from "moment";
import { getSlicedReviews } from "../../utilities/util";
import { projectPropTypes } from "../../utilities/project-prop-types";

const MoviePageReviews = ({ movie }) => {
  const { reviews } = movie;
  const slicedReviews = getSlicedReviews(reviews);
  return (
    <div className="movie-card__reviews movie-card__row">
      {slicedReviews.map((slicedReview, index) => {
        return (
          <div key={`revcol-${index}`} className="movie-card__reviews-col">
            {slicedReview.map((review) => (
              <div key={review.id} className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{review.comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{review.user.name}</cite>
                    <time
                      className="review__date"
                      dateTime={moment(review.date).format(`YYYY-MM-DD`)}
                    >
                      {moment(review.date).format(`MMMM D, YYYY`)}
                    </time>
                  </footer>
                </blockquote>

                <div className="review__rating">{review.rating}</div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

MoviePageReviews.propTypes = {
  movie: projectPropTypes.REVIEWS,
};

export default MoviePageReviews;
