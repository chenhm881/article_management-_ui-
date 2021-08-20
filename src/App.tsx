import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import router from './router/index';

function App() {
  return (
      <Router>
          {renderRoutes(router)}
      </Router>
  );
}

export default App;
