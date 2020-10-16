import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { getSlicedReviews } from "../../utilities/util";
import { projectPropTypes } from "../../utilities/project-prop-types";
import NameSpace from "../../redux/name-space";
import { Operation } from "../../redux/data/data";

class MoviePageReviews extends PureComponent {
  componentDidMount() {
    const { movie, loadMovieReviews } = this.props;
    loadMovieReviews(movie.id);
  }

  // componentDidUpdate(prevProps) {
  //   const { movie, loadMovieReviews } = this.props;
  //   if (prevProps.movie.id !== movie.id) {
  //     loadMovieReviews(movie.id);
  //   }
  // }

  render() {
    const { movieReviews } = this.props;
    const slicedReviews = getSlicedReviews(movieReviews);
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
  }
}

MoviePageReviews.propTypes = {
  movie: projectPropTypes.MOVIE.isRequired,
  movieReviews: PropTypes.arrayOf(projectPropTypes.REVIEW.isRequired),
  loadMovieReviews: PropTypes.func.isRequired,
};

MoviePageReviews.defaultProps = {
  movieReviews: [],
};

const mapStateToProps = (state) => ({
  movieReviews: state[NameSpace.DATA].movieReviews,
});

const mapDispatchToProps = (dispatch) => ({
  loadMovieReviews(id) {
    dispatch(Operation.loadMovieReviews(id));
  },
});

export { MoviePageReviews };
export default connect(mapStateToProps, mapDispatchToProps)(MoviePageReviews);
