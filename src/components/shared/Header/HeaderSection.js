import React from "react";
import logo from "./logo.svg";
import { Container, Header } from "semantic-ui-react";

export const HeaderSection = ({ facility }) => (
  <Container className="header-section">
    <Header as="h1" className="header-text">
      <img src={logo} className="App-logo" alt="logo" />
      Interoperability Layer{" "}
      {facility ? (
        <span className="facility-name">({facility}) </span>
      ) : (
        <span className="facility-name"> </span>
      )}
    </Header>
  </Container>
);
