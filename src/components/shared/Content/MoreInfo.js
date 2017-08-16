import React from 'react'
import { Container, Divider, Header, Segment, Label } from 'semantic-ui-react'
import { SingleItem } from './SingleItem'

export const MoreInfo = (props) => {
     const colors = ["green", "yellow", "teal"]

    const ListItems = (data) => {
        return data.map((dataItem, idx) => {
            return <SingleItem
                        key={Math.random()}
                        color={colors[idx]}
                        name={dataItem.name}
                        description={dataItem.description.substring(0, 100)}
                        toLink={dataItem.editLink}/>
        })
    }

    return (
        <Container>
            <Header as='h3' className="stats-header">{props.heading}</Header>
            <Divider/>
            <Segment inverted className="segment-subscriptions">
                <Label className="stats-sub-header-left">Entities</Label>
                <Label className="stats-sub-header-right">possible actions</Label>
                <Divider className="stats-divider"/>
                 {ListItems(props.data)}
            </Segment>
        </Container>
    )
}