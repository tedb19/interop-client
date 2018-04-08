import React from "react";
import { Segment, Grid } from "semantic-ui-react";

export const MainContent = props => {
  return (
    <Grid columns={1} className="main-content">
      <Grid.Column width={13}>
        <Segment raised className="content-segment">
          {props.children}
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
