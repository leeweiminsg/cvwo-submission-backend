import React, { Component } from "react";
import { Button, Header, Modal, Icon } from "semantic-ui-react";

import CategoryForm from "./CategoryForm.js";

class AddCategoryModal extends Component {
  render() {
    return (
      <Modal
        basic
        closeIcon
        trigger={
          <Button inverted animated color="green">
            <Button.Content visible>Add Category</Button.Content>
            <Button.Content hidden>
              <Icon name="plus" />
            </Button.Content>
          </Button>
        }
      >
        <Header icon="sticky note" content="Add New Category" />
        <Modal.Content>
          <CategoryForm
            tags={this.props.tags}
            handleCategoriesListStateChange={
              this.props.handleCategoriesListStateChange
            }
            handleCategoriesCreate={this.props.handleCategoriesCreate}
          ></CategoryForm>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddCategoryModal;
