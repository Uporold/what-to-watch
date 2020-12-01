import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MoviePageInfo from "./movie-page-info";
import { movies } from "../../mock/movies";

configure({ adapter: new Adapter() });

describe(`MoviePageInfo tests`, () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<MoviePageInfo movie={movies[0]} />);
  });

  it(`MoviePageInfo on nav component click`, () => {
    wrapper.instance().onNavClick(`details`);
    expect(wrapper.state().activeNavBar).toEqual(`details`);
  });

  it(`Should MoviePageInfo reset state when go to new movie page`, () => {
    wrapper.setProps({ movie: movies[1] });
    expect(wrapper.state().activeNavBar).toEqual(`overview`);
  });
});
