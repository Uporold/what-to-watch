import React from "react";

interface Props {
  tabs: Array<string>;
  currentNav: string;
  onNavClick: React.Dispatch<React.SetStateAction<string>>;
}

const MovieNav: React.FC<Props> = ({
  tabs,
  currentNav,
  onNavClick,
}): JSX.Element => {
  const onNavClickHandler = (tab: string) => (evt: React.MouseEvent) => {
    evt.preventDefault();
    onNavClick(tab);
  };

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
              onClick={onNavClickHandler(tab)}
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

export default MovieNav;
