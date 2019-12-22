import _ from "lodash";
import React, { Component } from "react";
import { List, Button, Search, Grid } from "semantic-ui-react";
import axios from "axios";
import update from "immutability-helper";

import AddTaskModal from "./AddTaskModal";
import EditCategoryModal from "./EditCategoryModal";
import EditTaskModal from "./EditTaskModal";
import ViewTaskModal from "./ViewTaskModal";

const colourCategoryMap = {
  Empty: "grey",
  None: "teal",
  Home: "green",
  School: "blue",
  Work: "purple"
};

class TasksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      tags: [],
      isLoading: false,
      results: [],
      value: ""
    };
  }

  getTasks() {
    axios
      .get("/api/tasks")
      .then(response => {
        this.processTasks(response.data);
      })
      .catch(error => console.log(error));
  }

  getTags() {
    axios
      .get("/api/tags")
      .then(response => {
        this.setState({ tags: response.data });
      })
      .catch(error => console.log(error));
  }

  processTasks = tasks => {
    let processed_tasks = tasks.map(task => {
      task.task.tags = task.tags;

      task.task.tags = task.task.tags.map(tag_id =>
        this.state.tags.find(tag => tag.id === tag_id)
      );

      delete task.tags;

      task.task.categories = task.task.tags[0].title;

      return task.task;
    });
    this.setState({ tasks: processed_tasks });
  };

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  resultRenderer = task => {
    return (
      <ViewTaskModal
        task={task}
        colourCategoryMap={colourCategoryMap}
      ></ViewTaskModal>
    );
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1)
        return this.setState({
          isLoading: false,
          results: [],
          value: ""
        });

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(this.state.tasks, isMatch)
      });
    }, 300);
  };

  handleTasksCreate = task => {
    task.task["tags"] = task.tags;
    delete task.tags;
    let newTask = task.task;

    let tasks = update(this.state.tasks, {
      $splice: [[0, 0, newTask]]
    });
    this.setState({ tasks });
  };

  handleTasksUpdate = task => {
    task.task["tags"] = task.tags;
    delete task.tags;
    let newTask = task.task;

    const taskIndex = this.state.tasks.findIndex(x => x.id === newTask.id);

    let tasksCopy = this.state.tasks.slice();
    tasksCopy[taskIndex] = newTask;

    this.setState({
      tasks: tasksCopy
    });
  };

  handleCategoriesCreate = value => {
    let tags = update(this.state.tags, {
      $splice: [[0, 0, value]]
    });
    this.setState({ tags });
  };

  handleCategoriesDelete = value => {
    this.setState({ tags: value });
  };

  componentDidMount() {
    this.getTags();
    this.getTasks();
  }

  deleteTask = id => {
    axios
      .delete(`/api/tasks/${id}`)
      .then(response => {
        const tasksIndex = this.state.tasks.findIndex(x => x.id === id);
        const tasks = update(this.state.tasks, {
          $splice: [[tasksIndex, 1]]
        });
        this.setState({
          tasks: tasks
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <React.Fragment>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column floated="left">
              <AddTaskModal
                tags={this.state.tags}
                handleTasksCreate={this.handleTasksCreate}
              ></AddTaskModal>
              <EditCategoryModal
                tags={this.state.tags}
                handleCategoriesCreate={this.handleCategoriesCreate}
                handleCategoriesDelete={this.handleCategoriesDelete}
              ></EditCategoryModal>
            </Grid.Column>
            <Grid.Column floated="right">
              <Search
                floated="right"
                aligned="right"
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                results={results}
                value={value}
                resultRenderer={this.resultRenderer}
                {...this.props}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <List divided selection animated verticalAlign="middle" relaxed="very">
          {this.state.tasks.map(task => {
            return (
              <List.Item>
                <ViewTaskModal
                  task={task}
                  colourCategoryMap={colourCategoryMap}
                ></ViewTaskModal>
                <List.Content floated="right">
                  <EditTaskModal
                    task={task}
                    tags={this.state.tags}
                    handleTasksUpdate={this.handleTasksUpdate}
                  ></EditTaskModal>
                  <Button
                    inverted
                    color="red"
                    icon="close"
                    float="right"
                    onClick={e => this.deleteTask(task.id)}
                  />
                </List.Content>
              </List.Item>
            );
          })}
        </List>

        <br />
      </React.Fragment>
    );
  }
}

export default TasksContainer;
