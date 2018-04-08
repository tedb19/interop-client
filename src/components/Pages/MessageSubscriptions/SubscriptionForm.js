import React from "react";
import { Form, Segment, Button, Divider } from "semantic-ui-react";
export const SubscriptionForm = props => {
  const options = [
    { key: "pr", text: "Patient Registration", value: "ADT^A04" },
    { key: "pu", text: "Patient Update", value: "ADT^A08" },
    { key: "po", text: "Pharmacy Order", value: "RDE^R01" },
    { key: "as", text: "Appointment Scheduling", value: "SUI^001" }
  ];

  const entities = [
    { key: "adt", text: "ADT", value: "ADT" },
    { key: "iqcare", text: "IQCARE", value: "IQCARE" },
    { key: "kenyaemr", text: "KENYAEMR", value: "KENYAEMR" },
    { key: "t4a", text: "T4A", value: "T4A" }
  ];

  return (
    <Form size="tiny">
      <Form.Group widths="equal">
        <Segment className="segment-submission-form">
          <Form.Select
            label="Message Type"
            options={options}
            placeholder="Message Types"
          />
          <Divider />
          <Form.Select
            label="Entities"
            options={entities}
            placeholder="Entities"
            multiple
          />
          <Divider />
          <Button.Group>
            <Button>Cancel</Button>
            <Button.Or />
            <Button positive>Save</Button>
          </Button.Group>
        </Segment>
      </Form.Group>

      <Divider hidden />
    </Form>
  );
};
