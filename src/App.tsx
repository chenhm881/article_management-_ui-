import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import router from './router/index';
import Publish from "./views/Publish";

function App() {
  return (
      <Router>
          <Switch>
              <Redirect exact path="/" to="/articles" />
              <Redirect exact path="/index" to="/articles" />
              <Route exact={true} path={"/publish/:id"} component= {Publish}></Route>
              {renderRoutes(router)}
          </Switch>
      </Router>
  );
}

export default App;
