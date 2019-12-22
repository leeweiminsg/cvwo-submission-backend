import React, { Component } from "react";
import { Button, Header, Modal, Icon } from "semantic-ui-react";

import CategoriesList from "./CategoriesList";

class EditCategoryModal extends Component {
  render() {
    return (
      <Modal
        basic
        closeIcon
        trigger={
          <Button icon color="olive" floated="left">
            <Icon name="setting" />
          </Button>
        }
      >
        <Header icon="edit" content="Edit Categories" />
        <Modal.Content>
          <CategoriesList
            tags={this.props.tags}
            handleCategoriesCreate={this.props.handleCategoriesCreate}
            handleCategoriesDelete={this.props.handleCategoriesDelete}
          ></CategoriesList>
        </Modal.Content>
      </Modal>
    );
  }
}

export default EditCategoryModal;
