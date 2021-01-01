import React, { useEffect } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import MoviesList from "../../components/movies-list/movies-list";
import LoaderSpinner from "../../components/loader-spinner/loader-spinner";
import { useLoadFavoriteMovies } from "../../redux/data/hooks/useLoadFavoriteMovies";
import {
  useFavoriteMovies,
  useFavoritesLoadingStatus,
} from "../../redux/data/hooks/selectors";

const MyList = () => {
  const loadFavoriteMovies = useLoadFavoriteMovies();
  const isFavoritesLoading = useFavoritesLoadingStatus();
  const favoriteMovies = useFavoriteMovies();

  useEffect(() => {
    loadFavoriteMovies();
  }, [loadFavoriteMovies]);

  return (
    <>
      {!isFavoritesLoading ? (
        <div className="user-page">
          <Header isFavoritesPage />

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
};

export default MyList;
