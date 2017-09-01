import React from 'react'
import { Divider, Label } from 'semantic-ui-react'

export const SingleLog = (props) => {
    return (
        <div className="singleitem">
            <Label icon={props.icon} color={props.color} content={props.level} key={Math.random()} className="singlelog-color-label"/> 
            <span className="segment-description">{props.detail}</span>
            <span className="segment-log-date">{props.date}</span>
            <Divider className="single-item-divider"/>
        </div>
    )
}