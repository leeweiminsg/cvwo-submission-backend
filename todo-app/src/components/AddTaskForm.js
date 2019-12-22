import React, { Component } from "react";
import { Button, Form, Icon, Message } from "semantic-ui-react";
import axios from "axios";

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: "",
      taskDescription: "",
      taskTags: 1,
      tags: this.props.tags,
      formTagOptions: [],
      formSubmitted: false
    };
  }

  handleChange = (_e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    axios
      .post("/api/tasks/", {
        title: this.state.taskTitle,
        description: this.state.taskDescription,
        tag_ids: [this.state.taskTags],
        is_deleted: false
      })
      .then(response => {
        this.props.handleTasksCreate(response.data);
        this.setState({
          taskTitle: "",
          taskDescription: "",
          taskTags: 0,
          formSubmitted: true
        });
      })
      .catch(error => console.log(error));
  };

  handleRepeatedInput = e => {
    this.setState({
      formSubmitted: false
    });
  };

  createFormTagOptions() {
    let formTagOptions = this.state.tags
      .map(tag => ({
        key: tag.id,
        text: tag.title,
        value: tag.id
      }))
      .reverse();
    this.setState({ formTagOptions: formTagOptions });
  }

  componentDidMount() {
    this.createFormTagOptions();
  }

  render() {
    const { taskTitle, taskDescription, taskTags } = this.state;
    return (
      <Form
        inverted
        onSubmit={this.handleSubmit}
        onClick={this.handleRepeatedInput}
        success={this.state.formSubmitted}
      >
        <Form.Input
          required
          name="taskTitle"
          label="Title"
          placeholder="I want to..."
          onChange={this.handleChange}
          value={taskTitle}
        />
        <Form.Input
          name="taskDescription"
          label="Notes"
          placeholder="Insert your notes here"
          onChange={this.handleChange}
          value={taskDescription}
        />
        <Form.Select
          required
          search
          name="taskTags"
          options={this.state.formTagOptions}
          label="Category"
          placeholder="Category"
          onChange={this.handleChange}
          value={taskTags}
        />
        <Message
          success
          header="Task Added"
          content="You've successfully added a task!"
        />
        <Button inverted color="green" type="submit">
          <Icon name="checkmark" /> Add
        </Button>
      </Form>
    );
  }
}

export default AddTaskForm;
