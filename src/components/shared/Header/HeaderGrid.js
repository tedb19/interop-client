import React from "react";

import { Grid } from "semantic-ui-react";
import { HeaderSection } from "./HeaderSection";

export const HeaderGrid = () => (
  <Grid.Row>
    <Grid.Column width={16}>
      <HeaderSection />
    </Grid.Column>
  </Grid.Row>
);
