import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getCurrentMovie } from "../../redux/data/selectors";
import { projectPropTypes } from "../../utilities/project-prop-types";
import Header from "../header/header";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";

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
    console.log(movie);
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

            <div className="add-review__text" style={{ background: `rgba(255, 255, 255, 0.4)` }}>
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

const mapStateToProps = (state, { match: { params } }) => ({
  movie: getCurrentMovie(params.id)(state),
});

export { AddReview };

export default connect(mapStateToProps)(AddReview);
