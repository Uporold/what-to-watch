import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SignIn } from "./sign-in";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`SignIn tests`, () => {
  let handleOnSubmit;
  let wrapper;

  beforeEach(() => {
    handleOnSubmit = jest.fn();

    wrapper = shallow(<SignIn onSubmit={handleOnSubmit} />);
  });
  it(`Login submit form test`, () => {
    const evt = {
      preventDefault: jest.fn(),
    };
    const instance = wrapper.instance();
    instance.emailRef = {
      current: {
        value: "test@test.ru",
      },
    };
    instance.passwordRef = {
      current: {
        value: "test",
      },
    };

    const loginForm = wrapper.find(`form.sign-in__form`);
    loginForm.simulate(`submit`, evt);
    expect(handleOnSubmit).toHaveBeenCalledTimes(1);
    expect(handleOnSubmit).toHaveBeenCalledWith({
      email: "test@test.ru",
      password: "test",
    });
  });
});
