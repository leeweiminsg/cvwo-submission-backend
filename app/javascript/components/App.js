import React from "react";
import PropTypes from "prop-types";

import { BrowserRouter, Route, Link } from "react-router-dom";

import TodosContainer from "./components/TodosContainer";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/todos">
            <div className="container">
              <div className="header">
                <h1>Todo List</h1>
              </div>
              <TodosContainer />
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
