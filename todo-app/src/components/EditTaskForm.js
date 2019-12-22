import React, { Component } from "react";
import { Button, Form, Icon, Message } from "semantic-ui-react";
import axios from "axios";

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: this.props.task.title,
      taskDescription: this.props.task.description,
      taskTags:
        this.props.task.tags.length === 0 ? 1 : this.props.task.tags[0].id,
      tags: this.props.tags,
      formTagOptions: [],
      formSubmitted: false
    };
  }

  handleChange = (_e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    axios
      .put(`/api/tasks/${this.props.task.id}`, {
        title: this.state.taskTitle,
        description: this.state.taskDescription,
        tag_ids: [this.state.taskTags],
        is_deleted: false
      })
      .then(response => {
        this.props.handleTasksUpdate(response.data);
        this.setState({
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
    let formTagOptions = this.state.tags.map(tag => ({
      key: tag.id,
      text: tag.title,
      value: tag.id
    }));
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
          header="Task Edited"
          content="You've successfully edited the task!"
        />
        <Button inverted color="green" type="submit">
          <Icon name="refresh" /> Edit
        </Button>
      </Form>
    );
  }
}

export default AddTaskForm;
