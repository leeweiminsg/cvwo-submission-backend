import React, { Component } from "react";
import { Button, Form, Icon, Message } from "semantic-ui-react";
import axios from "axios";

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryTitle: "",
      tags: this.props.tags,
      formSubmitted: false
    };
  }

  handleChange = (_e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    axios
      .post("/api/tags/", {
        title: this.state.categoryTitle,
        is_deleted: false
      })
      .then(response => {
        this.props.handleCategoriesListStateChange(response.data);
        this.props.handleCategoriesCreate(response.data);
        this.setState({
          categoryTitle: "",
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

  render() {
    const { categoryTitle } = this.state;
    return (
      <Form
        inverted
        onSubmit={this.handleSubmit}
        onClick={this.handleRepeatedInput}
        success={this.state.formSubmitted}
      >
        <Form.Input
          required
          name="categoryTitle"
          label="Label"
          placeholder="Enter category name"
          onChange={this.handleChange}
          value={categoryTitle}
        />
        <Message
          success
          header="Category Added"
          content="You've successfully added a category!"
        />
        <Button inverted color="green" type="submit">
          <Icon name="checkmark" /> Add
        </Button>
      </Form>
    );
  }
}

export default CategoryForm;
