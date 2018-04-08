import React from "react";
import { Message } from "semantic-ui-react";

export const InfoMessage = props => {
  return (
    <Message
      header={props.header}
      content={props.content}
      icon="info circle"
      color="teal"
      onDismiss={props.onDismiss}
      info={true}
      size="small"
    />
  );
};
