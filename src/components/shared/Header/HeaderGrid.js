import React, { Component } from "react";

import { Grid } from "semantic-ui-react";
import { HeaderSection } from "./HeaderSection";
import { getFacility } from "../../../utils/data.utils";

export class HeaderGrid extends Component {
  state = {
    facility: ""
  };

  componentDidMount() {
    getFacility()
      .then(facility => this.setState({ facility }))
      .catch(error => console.log("Error fetching facility:", error));
  }

  render() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <HeaderSection facility={this.props.facility} />
        </Grid.Column>
      </Grid.Row>
    );
  }
}
