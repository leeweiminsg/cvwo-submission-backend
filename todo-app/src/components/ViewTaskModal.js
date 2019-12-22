import React, { Component } from "react";
import { Header, Modal, List, Label, Divider } from "semantic-ui-react";

class ViewTaskModal extends Component {
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
          <List.Content floated="left">
            <Label
              color={
                this.props.colourCategoryMap[
                  this.props.task.tags.length === 0
                    ? "Empty"
                    : this.props.task.tags[0]["title"]
                ]
              }
              horizontal
            >
              {this.props.task.tags.length === 0
                ? "None"
                : this.props.task.tags[0]["title"]}
            </Label>
            {this.props.task.title}
          </List.Content>
        }
      >
        <Header icon="edit" content={this.props.task.title} float="left" />
        <Modal.Content>{this.props.task.description}</Modal.Content>
        <Divider />
        <Modal.Content>
          Category:{" "}
          {this.props.task.tags.length === 0
            ? "None"
            : this.props.task.tags[0]["title"]}
        </Modal.Content>
      </Modal>
    );
  }
}

export default ViewTaskModal;
