import React from 'react'
import { Label, Divider } from 'semantic-ui-react'

export const SingleSystemOnline = (props) => {
    const name = props.system.replace(/_|STATUS/g, ' ').trim()
    
    return (
        <div>
            <Label circular color={props.color} empty className="system-status-label" />  {name}
            <Divider/>
        </div>
    )
}
