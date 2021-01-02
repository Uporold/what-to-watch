// import React, { PureComponent, createRef } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import Header from "../../components/header/header";
// import Footer from "../../components/footer/footer";
// import { Operation } from "../../redux/user/user";
//
// class SignIn extends PureComponent {
//   constructor(props) {
//     super(props);
//
//     this.emailRef = createRef();
//     this.passwordRef = createRef();
//   }
//
//   handleSubmit = (evt) => {
//     const { onSubmit } = this.props;
//
//     evt.preventDefault();
//
//     onSubmit({
//       email: this.emailRef.current.value,
//       password: this.passwordRef.current.value,
//     });
//   };
//
//   render() {
//     return (
//       <div className="user-page">
//         <Header isLoginPage />
//
//         <div className="sign-in user-page__content">
//           <form
//             action="#"
//             className="sign-in__form"
//             onSubmit={this.handleSubmit}
//           >
//             <div className="sign-in__fields">
//               <div className="sign-in__field">
//                 <input
//                   className="sign-in__input"
//                   type="email"
//                   placeholder="Email address"
//                   name="user-email"
//                   id="user-email"
//                   ref={this.emailRef}
//                 />
//                 <label
//                   className="sign-in__label visually-hidden"
//                   htmlFor="user-email"
//                 >
//                   Email address
//                 </label>
//               </div>
//               <div className="sign-in__field">
//                 <input
//                   className="sign-in__input"
//                   type="password"
//                   placeholder="Password"
//                   name="user-password"
//                   id="user-password"
//                   ref={this.passwordRef}
//                 />
//                 <label
//                   className="sign-in__label visually-hidden"
//                   htmlFor="user-password"
//                 >
//                   Password
//                 </label>
//               </div>
//             </div>
//             <div className="sign-in__submit">
//               <button className="sign-in__btn" type="submit">
//                 Sign in
//               </button>
//             </div>
//           </form>
//         </div>
//
//         <Footer />
//       </div>
//     );
//   }
// }
//
// SignIn.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
//
// export { SignIn };
//
// const mapDispatchToProps = (dispatch) => ({
//   onSubmit(authData) {
//     dispatch(Operation.login(authData));
//   },
// });
//
// export default connect(null, mapDispatchToProps)(SignIn);

import React, { useRef } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { useLogin } from "../../redux/user/hooks/useLogin";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = useLogin();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value,
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
