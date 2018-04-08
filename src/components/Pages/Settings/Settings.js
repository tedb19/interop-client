import React, { Component } from "react";
import { Header, Segment, Label, Divider } from "semantic-ui-react";
import { MainContent } from "../../shared/Content/MainContent";

export class Settings extends Component {
  render() {
    return (
      <div>
        <Header as="h2" className="sub-header-text">
          Settings
        </Header>
        <MainContent>
          <Segment inverted className="segment-subscriptions">
            <Label className="stats-sub-header-left">Description</Label>
            <Label className="stats-sub-header-right">Value</Label>
            <Divider className="stats-divider" />
          </Segment>
        </MainContent>
      </div>
    );
  }
}
