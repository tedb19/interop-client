import React from 'react'
import { List, Label } from 'semantic-ui-react'

export const ListItem = (props) => {
    return (
        <List.Item className="list-item">
            <Label color={props.color} horizontal className="list-item-label">{props.name}</Label>
            <span className="list-item-span">{props.description}</span>
            <span className="list-item-link">{props.editLink}</span>
        </List.Item>
    )
}