import React, { Component } from "react";
import {
  Form,
  Button,
  Input,
  Divider,
  Card,
  Message,
  Icon
} from "semantic-ui-react";
import { HeaderGrid } from "../../shared/Header/HeaderGrid";
import { Link } from "react-router-dom";
import { authenticate } from "../../../utils/data.utils";

export class Login extends Component {
  state = {
    username: "",
    password: "",
    ShowNewMessage: false
  };

  handleSubmit = async evt => {
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    const userId = await authenticate(user);
    if (!parseInt(userId, 10)) {
      this.setState({ ShowNewMessage: true });
    }
    localStorage.setItem("userId", userId);
    this.props.updateUserId();
  };

  handleInputChange = evt => {
    const name = evt.target.name;

    this.setState({
      [name]: evt.target.value
    });
  };

  handleMessages = () => {
    const msgDetails = {
      header: "Wrong Login Details:",
      content: `🙁 Ooh snap! Wrong username or password`
    };
    if (this.state.ShowNewMessage) {
      setTimeout(() => this.setState({ ShowNewMessage: false }), 3500);
      return (
        <Message
          header={msgDetails.header}
          content={msgDetails.content}
          icon={<Icon name="warning circle" className="login-message-icon" />}
          color="red"
          onDismiss={() => this.setState({ ShowNewMessage: false })}
          info={true}
          size="tiny"
        />
      );
    } else {
      return null;
    }
  };

  render() {
    const messages = this.handleMessages();
    return (
      <Card>
        <Form className="login-form">
          {messages}
          <HeaderGrid />
          <Divider />
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              required
              label="Username"
              placeholder="username"
              icon="user"
              iconPosition="left"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              required
              type="password"
              label="Password"
              placeholder="password"
              icon="lock"
              iconPosition="left"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Button positive fluid color="blue" onClick={this.handleSubmit}>
            Sign In
          </Button>
          <br />
          <Link to="#" className="login-forgot-password">
            Forgot password
          </Link>
        </Form>
      </Card>
    );
  }
}
