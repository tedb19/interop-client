import React, { Component } from "react";
import { Label, Divider } from "semantic-ui-react";
import { Subscriber } from "./Subscriber";
import { Droppable } from "react-drag-and-drop";

export class MessageTypeSubscriber extends Component {
  render() {
    const subscriberLabel = this.props.subscribers.map((subscriber, idx) => (
      <Subscriber
        key={Math.random()}
        color={subscriber.color}
        subscriber={subscriber.name}
        messageType={this.props.messageType}
        isClosable={true}
        handleSubscriberClick={this.props.handleSubscriberClick}
      />
    ));

    return (
      <div>
        <Droppable
          types={["subscribers"]}
          onDrop={this.props.onDrop}
          className="droppable"
        >
          <Label circular color="green" empty key={Math.random()} />{" "}
          {this.props.messageType}
          {subscriberLabel}
        </Droppable>
        <Divider className="droppable-divider" />
      </div>
    );
  }
}
