import React from "react";
import { Label, Icon } from "semantic-ui-react";

export const Subscriber = props => {
  return (
    <Label
      circular
      color={props.color}
      className="entity-circular-data"
      onRemove={props.onRemove}
    >
      {props.subscriber}
      {props.isClosable ? (
        <Icon
          name="close"
          color="black"
          onClick={() =>
            props.handleSubscriberClick(props.subscriber, props.messageType)
          }
          rotated="counterclockwise"
        />
      ) : null}
    </Label>
  );
};

export const colors = [
  "green",
  "yellow",
  "orange",
  "teal",
  "violet",
  "pink",
  "purple"
];
