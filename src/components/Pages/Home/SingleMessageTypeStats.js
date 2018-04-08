import React from "react";
import { Label, Divider } from "semantic-ui-react";
import titleCase from "title-case";

export const SingleMessageTypeStats = props => {
  const name = titleCase(
    props.messageType
      .toLowerCase()
      .replace(/_|messagetype/g, " ")
      .trim()
  );

  return (
    <div className="yours-custom-class">
      <Label circular color="green" empty key={Math.random()} /> {name}
      <Label
        circular
        color={props.color}
        className="stats-circular-data"
        key={Math.random()}
      >
        {props.value}
      </Label>
      <Divider className="single-message-type-stats-divider" />
    </div>
  );
};
