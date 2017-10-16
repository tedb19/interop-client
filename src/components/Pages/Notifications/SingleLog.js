import React from 'react'
import { Divider, Icon } from 'semantic-ui-react'

export const SingleLog = (props) => {
    return (
        <div className="singleitem">
            <Icon name={props.name} color={props.color} className="singlelog-color-label"/> 
            <span className="segment-description">{props.detail}</span>
            <span className="segment-log-date">{props.date}</span>
            <Divider className="single-item-divider"/>
        </div>
    )
}