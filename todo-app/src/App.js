import React from "react";
import { Container, Header, Divider } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import TasksContainer from "./components/TasksContainer";

function App() {
  return (
    <React.Fragment>
      <br></br>
      <Container fluid text textAlign="center" className="AppContainer">
        <Header as="h1">All Tasks</Header>
        <br></br>
        <TasksContainer />
      </Container>
    </React.Fragment>
  );
}

export default App;
