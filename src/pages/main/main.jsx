import React from "react";
import Footer from "../../components/footer/footer";
import MoviePromoCard from "../../components/movie-promo-card/movie-promo-card";
import Catalog from "../../components/catalog/catalog";

export const Main = () => {
  return (
    <>
      <MoviePromoCard />
      <div className="page-content">
        <Catalog />
        <Footer />
      </div>
    </>
  );
};

export default Main;
