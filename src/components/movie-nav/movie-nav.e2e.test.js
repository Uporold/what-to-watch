import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieNav from "./movie-nav";
import { movieNavs } from "../../utilities/util";

configure({ adapter: new Adapter() });

describe(`MovieNav tests`, () => {
  let wrapper;
  const onNavClick = jest.fn();
  beforeAll(() => {
    wrapper = shallow(
      <MovieNav
        currentNav="overview"
        onNavClick={onNavClick}
        tabs={movieNavs}
      />
    );
  });

  it(`MovieNav passed right argument on click`, () => {
    const movieNavTabs = wrapper.find(`.movie-nav__link`);

    movieNavTabs.forEach((movieNavTab, i) => {
      movieNavTab.simulate(`click`, {
        preventDefault: jest.fn(),
      });
      expect(onNavClick).toHaveBeenCalledWith(movieNavs[i]);
    });

    expect(onNavClick).toBeCalledTimes(movieNavTabs.length);
  });
});
