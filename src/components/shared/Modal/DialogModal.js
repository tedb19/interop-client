import React from "react";
import { Modal, Button, Icon, Grid } from "semantic-ui-react";

export const DialogModal = props => {
  const size = props.size || "tiny";
  const icon = props.icon || "question circle";
  const actions = props.yesNo ? (
    <Button.Group>
      <Button
        key="No"
        icon="cancel"
        content="No"
        labelPosition="left"
        onClick={() => props.isClicked("No")}
      />
      <Button.Or />
      <Button
        key="Yes"
        positive
        icon="checkmark"
        labelPosition="right"
        content="Yes"
        onClick={() => props.isClicked("Yes")}
      />
    </Button.Group>
  ) : (
    <Button
      key="Ok"
      icon="cancel"
      color="red"
      content="Ok"
      labelPosition="left"
      onClick={() => props.isClicked("Ok")}
    />
  );

  return (
    <Modal
      closeIcon="close"
      size={size}
      open={props.open}
      onClose={props.close}
    >
      <Modal.Header className="modal-header">{props.header}</Modal.Header>
      <Modal.Content className="modal-content">
        <Grid columns={1}>
          <Grid.Column width={4}>
            <Icon name={icon} size="massive" color="orange" />
          </Grid.Column>
          <Grid.Column width={12} className="modal-content-question">
            {props.content}
          </Grid.Column>
        </Grid>
      </Modal.Content>
      <Modal.Actions className="modal-footer">{actions}</Modal.Actions>
    </Modal>
  );
};
