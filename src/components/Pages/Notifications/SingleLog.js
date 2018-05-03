import React from "react";
import { Divider, Icon } from "semantic-ui-react";
import { InfoModal } from "../../shared/Modal/InfoModal";

export const SingleLog = props => {
  return (
    <div className="singleitem">
      <Icon
        name={props.name}
        color={props.color}
        size="huge"
        className="singlelog-color-label"
      />
      <span className="segment-description">
        {props.detail}
        {props.json ? (
          <InfoModal
            trigger={
              <Icon
                name="comments outline"
                color="teal"
                className="singlelog-icon-link"
                circular
                link
                inverted
              />
            }
            size="large"
            header="The Message"
            content={props.content}
            footer={<p className="info-modal-footer">Message Version: 1.0</p>}
          />
        ) : null}
      </span>
      <span className="segment-log-date">{props.date}</span>
      <Divider className="single-item-divider" />
    </div>
  );
};
