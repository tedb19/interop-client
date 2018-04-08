import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

export const CircularLoader = () => (
  <Dimmer active className="dimmer-circular-loader">
    <Loader size="small">Loading...</Loader>
  </Dimmer>
);
