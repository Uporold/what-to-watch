import React from "react";
import PropTypes from "prop-types";

const MovieNav = ({ tabs, currentNav, onNavClickHandler }) => {
  const renderNavItem = () => {
    return (
      <>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`movie-nav__item ${
              tab === currentNav ? `movie-nav__item--active` : ``
            }`}
          >
            <a
              href="#"
              className="movie-nav__link"
              onClick={(evt) => {
                evt.preventDefault();
                onNavClickHandler(tab);
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.replace(`-`, ` `).slice(1)}
            </a>
          </li>
        ))}
      </>
    );
  };
  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">{renderNavItem()}</ul>
    </nav>
  );
};

MovieNav.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentNav: PropTypes.string.isRequired,
  onNavClickHandler: PropTypes.func.isRequired,
};

export default MovieNav;
