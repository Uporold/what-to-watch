import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "../header/header";
import Footer from "../footer/footer";
import MoviesList from "../movies-list/movies-list";
import {
  getFavoriteMovies,
  getFavoritesLoadingStatus,
} from "../../redux/data/selectors";
import LoaderSpinner from "../loader-spinner/loader-spinner";
import { Operation } from "../../redux/data/data";
import { projectPropTypes } from "../../utilities/project-prop-types";

class MyList extends PureComponent {
  componentDidMount() {
    const { loadFavoriteMovies } = this.props;
    loadFavoriteMovies();
  }

  render() {
    const { favoriteMovies, isFavoritesLoading } = this.props;
    return (
      <>
        {!isFavoritesLoading ? (
          <div className="user-page">
            <Header />

            <section className="catalog">
              <h2 className="catalog__title visually-hidden">Catalog</h2>

              <MoviesList movies={favoriteMovies} />
            </section>

            <Footer />
          </div>
        ) : (
          <LoaderSpinner />
        )}
      </>
    );
  }
}

MyList.propTypes = {
  favoriteMovies: PropTypes.arrayOf(projectPropTypes.MOVIE.isRequired)
    .isRequired,
  isFavoritesLoading: PropTypes.bool.isRequired,
  loadFavoriteMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favoriteMovies: getFavoriteMovies(state),
  isFavoritesLoading: getFavoritesLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteMovies() {
    dispatch(Operation.loadFavoriteMovies());
  },
});

export { MyList };

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
