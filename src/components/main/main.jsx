import React from "react";
import Footer from "../footer/footer";
import MoviePromoCard from "../movie-promo-card/movie-promo-card";
import Catalog from "../catalog/catalog";

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
