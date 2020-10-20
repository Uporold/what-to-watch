import React, { PureComponent } from "react";
import { Router, Route, Switch } from "react-router-dom";
import MoviePage from "../movie-page/movie-page";
import Main from "../main/main";
import VideoPlayer from "../video-player/video-player";
import history from "../../history";

class App extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/films/:id" component={MoviePage} />
          <Route exact path="/player/:id" component={VideoPlayer} />
        </Switch>
      </Router>
    );
  }
}

export default App;
