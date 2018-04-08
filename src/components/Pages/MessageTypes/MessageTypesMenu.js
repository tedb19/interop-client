import React from "react";
import PropTypes from "prop-types";

import { SecondaryMenu } from "../../shared/Menu/SecondaryMenu";

export const MessageTypesMenu = props => {
  return (
    <SecondaryMenu
      handleItemClick={props.handleMessageTypeMenuItemClick}
      activeItem={props.activeItem}
      data={props.messageTypes}
      mainMenu="Message-Type"
    />
  );
};

MessageTypesMenu.propTypes = {
  handleMessageTypeMenuItemClick: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
  messageTypes: PropTypes.array.isRequired
};
