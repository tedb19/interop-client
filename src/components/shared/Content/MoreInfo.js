import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Divider, Header, List } from 'semantic-ui-react'
import { ListItem } from '../../shared/LabelList/ListItem'

export const MoreInfo = (props) => {
    const ListItems = (data) => {
        return data.map(dataItem => {
            const link = <Link to={dataItem.editLink}>{dataItem.editText}</Link>
            return <ListItem
                        key={dataItem.name}
                        color={dataItem.color}
                        name={dataItem.name}
                        description={dataItem.description}
                        editLink={link}/>})
    }
    return (
        <Container>
            <Header as='h3'>{props.heading}</Header>
            <Divider/>
            <List divided selection>
                {ListItems(props.data)}
            </List>
            <Link to={props.addLinkUrl}>{props.addLinkText}</Link>
        </Container>
    )
}