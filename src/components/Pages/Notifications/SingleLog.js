import React from "react";
import { Divider, Icon, Container } from "semantic-ui-react";
import ReactJson from "react-json-view";
import { InfoModal } from "../../shared/Modal/InfoModal";

const jsonContent = json => {
  let modalContent = "";

  try {
    modalContent = (
      <ReactJson
        src={JSON.parse(JSON.stringify(json))}
        theme="monokai"
        name="message"
        iconStyle="triangle"
        enableClipboard={true}
        style={{ padding: "25px", fontFamily: "sans-serif" }}
        displayDataTypes={false}
      />
    );
  } catch (err) {
    modalContent = <Container>Message sample has not been uploaded</Container>;
  }
  return modalContent;
};

export const SingleLog = props => {
  return (
    <div className="singleitem">
      <Icon
        name={props.name}
        color={props.color}
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
            content={jsonContent(props.json)}
            footer={<p className="info-modal-footer">Message Version: 1.0</p>}
          />
        ) : null}
      </span>
      <span className="segment-log-date">{props.date}</span>
      <Divider className="single-item-divider" />
    </div>
  );
};
