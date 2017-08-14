import React from 'react'
import { Label, Divider} from 'semantic-ui-react'

export const Subscriber = (props) => {
    const colors = ["green", "yellow", "orange", "teal", "violet", "pink", "purple"]
    const subscriberLabel = props.subscribers.map((subscriber, idx) => 
        <Label circular color={colors[idx]} className="entity-circular-data" key={Math.random()}>{subscriber}</Label>
    )

    return (
        <div>
            <Label circular color="green" empty key={Math.random()} />  {props.messageType} 
            {subscriberLabel}
            <Divider/>
        </div>
    )
}