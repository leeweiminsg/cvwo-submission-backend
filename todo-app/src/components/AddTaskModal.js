import React, { Component } from "react";
import { Button, Header, Modal, Icon } from "semantic-ui-react";

import AddTaskForm from "./AddTaskForm";

class AddTaskModal extends Component {
  render() {
    return (
      <Modal
        basic
        closeIcon
        trigger={
          <Button icon labelPosition="left" color="green" floated="left">
            <Icon name="plus" />
            New
          </Button>
        }
      >
        <Header icon="sticky note" content="Add New Task" />
        <Modal.Content>
          <AddTaskForm
            tags={this.props.tags}
            handleTasksCreate={this.props.handleTasksCreate}
          ></AddTaskForm>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddTaskModal;
