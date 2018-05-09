import React from "react"
import { Link } from "react-router-dom"
import { Divider, Label } from "semantic-ui-react"

export const SingleItem = props => {
  return (
    <div className="singleitem">
      <Label
        color={props.color}
        key={Math.random()}
        className="singleitem-color-label"
      >
        {props.name}
      </Label>
      <span className="segment-description">{props.description}</span>
      <Link to="/Message-Subscription" className="link-unsubscribe">
        unsubscribe
      </Link>
      <Divider className="single-item-divider" />
    </div>
  )
}
