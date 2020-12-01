import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";
import { AddReview } from "./add-review";
import { movies } from "../../mock/movies";

configure({ adapter: new Adapter() });

describe(`AddReview tests`, () => {
  let handleFormSubmit;
  let handleTextInputFocus;
  let wrapper;
  beforeEach(() => {
    handleFormSubmit = jest.fn();
    handleTextInputFocus = jest.fn();
    wrapper = shallow(
      <AddReview
        isReviewSending={false}
        isSendingError={false}
        onFormSubmit={handleFormSubmit}
        onTextInputFocus={handleTextInputFocus}
        movie={movies[0]}
      />
    );
  });

  it(`Should rating state change`, () => {
    wrapper.find(".rating__stars").simulate(`change`, { target: { value: 3 } });
    expect(wrapper.state().stars).toEqual(3);
  });

  it(`Should comment state change`, () => {
    wrapper
      .find(".add-review__textarea")
      .simulate(`change`, { target: { value: `Test text` } });
    expect(wrapper.state().comment).toEqual(`Test text`);
  });

  it(`Should textarea focus call function`, () => {
    wrapper.find(".add-review__textarea").simulate(`focus`);
    expect(handleTextInputFocus).toHaveBeenCalledTimes(1);
  });

  it(`Should submit function call when send button pressed`, () => {
    wrapper.find(`form.add-review__form`).simulate(`submit`, {
      preventDefault: jest.fn(),
      target: { reset: jest.fn() },
    });
    expect(handleFormSubmit).toHaveBeenCalledTimes(1);
  });
});
