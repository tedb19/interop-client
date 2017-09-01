import React from 'react'
import { Container, Divider, Header, Segment, Label } from 'semantic-ui-react'
import { SingleItem } from './SingleItem'
import { config } from '../../../utils/config.util'

export const MoreInfo = (props) => {

    const ListItems = () => props.data.map((dataItem, idx) => {
        return <SingleItem
                    key={Math.random()}
                    color={config.colors[idx]}
                    name={dataItem.name}
                    description={dataItem.description.substring(0, 100)}
                    toLink={dataItem.editLink}/>
    })

    return (
        <Container>
            <Header as='h3' className="stats-header">{props.heading}</Header>
            <Divider/>
            <Segment inverted>
                <Label className="stats-sub-header-left">{props.leftSubheading}</Label>
                <Label className="stats-sub-header-right">possible actions</Label>
                <Divider className="stats-divider"/>
                 {ListItems()}
            </Segment>
        </Container>
    )
}