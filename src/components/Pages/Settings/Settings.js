import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import { MainContent } from "../../shared/Content/MainContent";

export class Settings extends Component {
  render() {
    return (
      <div>
        <Header as="h2" className="sub-header-text">
          Settings
        </Header>
        <MainContent />
      </div>
    );
  }
}
