import React from "react";
import { Grid, Segment } from "semantic-ui-react";

import { RibbonSection } from "./RibbonSection";
import { InfoSection } from "./InfoSection";

export const Detail = props => {
  return (
    <InfoSection>
      <Grid columns={1}>
        <Grid.Column className="content-segment-column">
          <Segment raised className="content-segment">
            <RibbonSection heading={props.heading} color="orange">
              {props.messages}
              {props.data}
              <p>{props.updateLink}</p>
            </RibbonSection>
            {props.additionalDetails}
            <RibbonSection heading={props.moreInfoHeading} color="orange">
              {props.children}
            </RibbonSection>
          </Segment>
        </Grid.Column>
      </Grid>
    </InfoSection>
  );
};
