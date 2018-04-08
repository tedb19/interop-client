import React from "react";
import PropTypes from "prop-types";

import { Label, Container } from "semantic-ui-react";

export const RibbonSection = props => {
  return (
    <div>
      <Label as="a" color={props.color} ribbon>
        {props.heading}
      </Label>
      <Container className="ribbon-container">{props.children}</Container>
    </div>
  );
};

RibbonSection.propTypes = {
  children: PropTypes.any.isRequired,
  heading: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};
