import React, { Component } from "react";
import { Button, Header, Modal } from "semantic-ui-react";

import EditTaskForm from "./EditTaskForm";

class EditTaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        basic
        closeIcon
        trigger={
          <Button inverted color="green" icon="edit outline" float="right" />
        }
      >
        <Header icon="edit" content="Edit Task" float="left" />
        <Modal.Content>
          <EditTaskForm
            task={this.props.task}
            tags={this.props.tags}
            handleTasksUpdate={this.props.handleTasksUpdate}
          ></EditTaskForm>
        </Modal.Content>
      </Modal>
    );
  }
}

export default EditTaskModal;
