import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  useAuthorizationStatus,
  useUser,
} from "../../redux/user/hooks/selectors";

const Header = memo(
  ({ children, isFavoritesPage, isLoginPage, isErrorPage }) => {
    const authorizationStatus = useAuthorizationStatus();
    const user = useUser();
    return (
      <header
        className={`page-header ${
          isFavoritesPage || isLoginPage || isErrorPage
            ? `user-page__head`
            : `movie-card__head`
        }`}
      >
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        {isFavoritesPage || isLoginPage || isErrorPage ? (
          <h1 className="page-title user-page__title">
            {isFavoritesPage && `My list`} {isLoginPage && `Sign in`}
            {isErrorPage && "Error Page"}
          </h1>
        ) : (
          ``
        )}

        {children && children}

        <div className="user-block">
          {authorizationStatus ? (
            <Link to="/favorites">
              <div className="user-block__avatar">
                <img
                  src={user.avatar}
                  alt={user.email}
                  width="63"
                  height="63"
                />
              </div>
            </Link>
          ) : (
            !isLoginPage && (
              <Link to="/login" className="user-block__link">
                Sign in
              </Link>
            )
          )}
        </div>
      </header>
    );
  }
);

Header.propTypes = {
  children: PropTypes.element,
  isFavoritesPage: PropTypes.bool,
  isLoginPage: PropTypes.bool,
  isErrorPage: PropTypes.bool,
};

Header.defaultProps = {
  isFavoritesPage: false,
  isLoginPage: false,
  isErrorPage: false,
  children: null,
};

export default Header;
