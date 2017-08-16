import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Label } from 'semantic-ui-react'

export const SingleItem = (props) => {
    return (
        <div>
            <Label color={props.color} key={Math.random()}>{props.name}</Label> 
            <span className="segment-description">{props.description}</span>
            <Link to={props.toLink} className="link-unsubscribe">unsubscribe</Link>
            <Divider/>
        </div>
    )
}