import React, { memo } from "react";
import { Link } from "react-router-dom";
import {
  useAuthorizationStatus,
  useUser,
} from "../../redux/user/hooks/selectors";

interface Props {
  isFavoritesPage?: boolean;
  isLoginPage?: boolean;
  isErrorPage?: boolean;
  children?: React.ReactNode;
}

const defaultProps: Props = {
  isFavoritesPage: false,
  isLoginPage: false,
  isErrorPage: false,
  children: null,
};

const Header: React.FC<Props> = memo(
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
  },
);

Header.defaultProps = defaultProps;

export default Header;
