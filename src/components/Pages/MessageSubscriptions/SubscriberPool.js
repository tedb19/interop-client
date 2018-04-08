import React from "react";
import { Container } from "semantic-ui-react";
import { Subscriber } from "./Subscriber";
import { Draggable } from "react-drag-and-drop";

export const SubscriberPool = props => {
  const subscribers = props.entities.map((entity, idx) => (
    <Draggable type="subscribers" data={entity.name} key={Math.random()}>
      <Subscriber
        key={Math.random()}
        color={entity.color}
        subscriber={entity.name}
        isClosable={false}
      />
    </Draggable>
  ));
  return (
    <Container fluid className="subscriber-pool-conatiner">
      {subscribers}
    </Container>
  );
};
