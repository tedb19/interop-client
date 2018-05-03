import React from "react";
import { Divider, Icon, Label } from "semantic-ui-react";

export const SingleSetting = props => {
  return (
    <div className="singleitem">
      <Icon name="setting" color={props.color} size="large" />
      <span className="segment-description">{props.description}</span>
      <Label className="setting-value">
        {props.value ? (
          props.value
        ) : (
          <span className="setting-value-missing">Not Provided!</span>
        )}
      </Label>
      <Divider className="single-item-divider" />
    </div>
  );
};
