import React from "react";
import { Modal, Form, Input, Button, Message } from "semantic-ui-react";

export const NewSettingsForm = props => {
  const size = props.size || "tiny";
  const actions = [
    { key: "no", content: "Close", color: "red", triggerClose: true }
  ];

  return (
    <Modal
      closeIcon="close"
      size={size}
      trigger={props.trigger}
      actions={actions}
      className="info-modal"
      open={props.newSettingsModalOpen}
      onClose={props.handleClose}
    >
      <Modal.Header className="modal-header">New Settings Update:</Modal.Header>
      <Modal.Content className="modal-content">
        {props.errorMessage ? (
          <Message
            header="Incomplete form submission"
            content="Please provide the required fields!"
            icon="exclamation circle"
            color="red"
            onDismiss={props.onDismiss}
            info={true}
            size="small"
          />
        ) : null}

        <Form className="modal-form">
          <Form.Group widths="equal">
            <Form.Select
              required
              label="Setting's Description"
              options={props.options}
              placeholder="description..."
              name="description"
              value={props.description}
              onChange={props.handleDescriptionChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              required
              label="Setting's Value"
              placeholder="Setting's value..."
              icon="setting"
              iconPosition="left"
              name="value"
              value={props.value}
              onChange={props.handleValueChange}
            />
          </Form.Group>
          <Button.Group>
            <Button negative onClick={props.handleClose}>
              Cancel
            </Button>
            <Button.Or />
            <Button positive onClick={props.handleSubmit}>
              Save
            </Button>
          </Button.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions className="modal-footer">
        <span className="modal-footer-span">New Settings Update</span>
      </Modal.Actions>
    </Modal>
  );
};
