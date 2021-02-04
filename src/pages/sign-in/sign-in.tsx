import React, { useRef } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useLogin } from "../../redux/user/hooks/useLogin";

const SignIn: React.FC = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = useLogin();

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    onSubmit({
      email: (emailRef.current as HTMLInputElement).value,
      password: (passwordRef.current as HTMLInputElement).value,
    });
  };

  return (
    <div className="user-page">
      <Header isLoginPage />

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                ref={emailRef}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                ref={passwordRef}
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default SignIn;
