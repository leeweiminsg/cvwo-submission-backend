import React from "react";
import PropTypes from "prop-types";
class ToDosContainer extends React.Component {
  render() {
    return (
      <div>
        <div className="inputContainer">
          <input
            className="taskInput"
            type="text"
            placeholder="Add a task"
            maxLength="50"
          />
        </div>
        <div className="listWrapper">
          <ul className="taskList"></ul>
        </div>
      </div>
    );
  }
}

export default ToDosContainer;
