import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAuthorizationStatus, getUser } from "../../redux/user/selectors";

const Header = ({
  authorizationStatus,
  user,
  children,
  isFavoritesPage,
  isLoginPage,
}) => {
  return (
    <header
      className={`page-header ${
        isFavoritesPage || isLoginPage ? `user-page__head` : `movie-card__head`
      }`}
    >
      <div className="logo">
        <Link to="/" className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {isFavoritesPage || isLoginPage ? (
        <h1 className="page-title user-page__title">
          {isFavoritesPage && `My list`} {isLoginPage && `Sign in`}
        </h1>
      ) : (
        ``
      )}

      {children && children}

      <div className="user-block">
        {authorizationStatus ? (
          <Link Link to="/favorites">
            <div className="user-block__avatar">
              <img src={user.avatar} alt={user.email} width="63" height="63" />
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
};

Header.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  authorizationStatus: PropTypes.bool.isRequired,
  children: PropTypes.element,
  isFavoritesPage: PropTypes.bool,
  isLoginPage: PropTypes.bool,
};

Header.defaultProps = {
  isFavoritesPage: false,
  isLoginPage: false,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUser(state),
});

export { Header };

export default connect(mapStateToProps)(Header);
