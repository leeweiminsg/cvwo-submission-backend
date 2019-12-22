import React, { Component } from "react";
import { Button, List, Icon } from "semantic-ui-react";
import axios from "axios";
import update from "immutability-helper";

import AddCategoryModal from "./AddCategoryModal";

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags
    };
  }

  handleCategoriesListStateChange = value => {
    let tags = update(this.state.tags, {
      $splice: [[0, 0, value]]
    });
    this.setState({ tags });
  };

  deleteTag = id => {
    axios
      .delete(`/api/tags/${id}`)
      .then(response => {
        const tagsIndex = this.state.tags.findIndex(x => x.id === id);
        const tags = update(this.state.tags, {
          $splice: [[tagsIndex, 1]]
        });
        this.setState({
          tags: tags
        });
        this.props.handleCategoriesDelete(tags);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <List divided verticalAlign="middle" size="big">
        <List.Item>
          <List.Content floated="right">
            <Button
              inverted
              color="red"
              type="submit"
              icon="delete"
              onClick={e =>
                this.deleteTag(
                  this.state.tags[
                    this.state.tags.findIndex(tag => tag.title === "School")
                  ].id
                )
              }
            />
          </List.Content>
          <List.Content>
            <Icon name="home" />
            Home
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="right">
            <Button
              inverted
              color="red"
              type="submit"
              icon="delete"
              onClick={e =>
                this.deleteTag(
                  this.state.tags[
                    this.state.tags.findIndex(tag => tag.title === "School")
                  ].id
                )
              }
            />
          </List.Content>
          <List.Content>
            <Icon name="book" />
            School
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="right">
            <Button
              inverted
              color="red"
              type="submit"
              icon="delete"
              onClick={e =>
                this.deleteTag(
                  this.state.tags[
                    this.state.tags.findIndex(tag => tag.title === "School")
                  ].id
                )
              }
            />
          </List.Content>
          <List.Content>
            <Icon name="lightbulb" />
            Work
          </List.Content>
        </List.Item>
        {this.state.tags.slice(0, -4).map(tag => {
          return (
            <List.Item>
              <List.Content floated="right">
                <Button
                  inverted
                  color="red"
                  type="submit"
                  icon="delete"
                  onClick={e => this.deleteTag(tag.id)}
                />
              </List.Content>
              <List.Content>{tag.title}</List.Content>
            </List.Item>
          );
        })}
        <List.Item>
          <List.Content>
            <AddCategoryModal
              handleCategoriesListStateChange={
                this.handleCategoriesListStateChange
              }
              handleCategoriesCreate={this.props.handleCategoriesCreate}
            ></AddCategoryModal>
          </List.Content>
        </List.Item>
      </List>
    );
  }
}

export default CategoriesList;
