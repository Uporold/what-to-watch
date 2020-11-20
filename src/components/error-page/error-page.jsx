import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NameSpace from "../../redux/name-space";
import Header from "../header/header";
import Footer from "../footer/footer";

const ErrorPage = ({ errorMessage }) => {
  return (
    <>
      <div className="user-page">
        <Header isErrorPage />

        <div className="sign-in user-page__content">
          <h1 className="page-title">Error!</h1>
          <p>{errorMessage}</p>
        </div>

        <Footer />
      </div>
    </>
  );
};

ErrorPage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  errorMessage: state[NameSpace.DATA].errorMessage,
});

export { ErrorPage };

export default connect(mapStateToProps, null)(ErrorPage);
