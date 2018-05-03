import React from "react";
import { Popup, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const AppLinks = props => (
  <span className="app-links">
    <Link to="#">
      <Popup
        trigger={
          <Icon
            name="help circle"
            color="orange"
            link
            className={
              props.hasSideMenu ? "shutdown-link-icon" : "help-link-icon"
            }
          />
        }
        inverted
        content="Help"
        size="tiny"
        position="top center"
      />
    </Link>
    <Link to="#" onClick={() => localStorage.removeItem("userId")}>
      <Popup
        trigger={
          <Icon
            name="shutdown"
            color="orange"
            link
            className={
              props.hasSideMenu ? "shutdown-link-icon" : "help-link-icon"
            }
          />
        }
        content="Logout"
        inverted
        size="tiny"
        position="top center"
      />
    </Link>
  </span>
);
