import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useErrorMessage } from "../../redux/data/hooks/selectors";

const ErrorPage: React.FC = (): JSX.Element => {
  const errorMessage = useErrorMessage();
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

export default ErrorPage;
