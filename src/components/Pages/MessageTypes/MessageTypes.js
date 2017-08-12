import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import titleCase from 'title-case'

import { Header, Grid } from 'semantic-ui-react'
import { MessageTypesMenu } from './MessageTypesMenu'
import { Detail } from '../../shared/Content/Detail'
import { TableRow } from '../../shared/Table/TableRow'

import { DefaultMessageTypeForMenu, messageTypesSecondaryMenuData, getMessageTypeObj } from '../../../utils/data.utils'

class MessageTypes extends Component {

    state = {
        ActiveMessageTypeMenuItem: DefaultMessageTypeForMenu().name,
        MessageTypeMenuData: messageTypesSecondaryMenuData()
    }

    handleMessageTypeMenuItemClick = (e, { name }) => this.setState({ ActiveMessageTypeMenuItem: name} )

    render() {
        const data = getMessageTypeObj(this.state.ActiveMessageTypeMenuItem)

        const TableRows = []
        for(var item in data){
            if(item !== 'id') TableRows.push(<TableRow key={item} name={titleCase(item)} value={data[item] ? data[item] : 'Not specified'}/>)
        }
        
        const updateLink = <Link to='/update-message-type'>Update message type details</Link>
        return (
                <Grid columns={12}>
                    <Grid.Column width={2}>
                        <Header as='h2' className="sub-header-text">Message Types</Header>
                        <MessageTypesMenu
                            handleMessageTypeMenuItemClick={this.handleMessageTypeMenuItemClick}
                            activeItem={this.state.ActiveMessageTypeMenuItem}
                            messageTypes={this.state.MessageTypeMenuData}
                            />
                        <br/>
                        <span><Link to="/new-message-type">Add new message type</Link></span>
                    </Grid.Column>
                    <Grid.Column width={10} className="content-area">
                        <Detail
                            heading="Message Type Overview"
                            tableRows={TableRows}
                            updateLink={updateLink}
                            moreInfo="Coming soon..."
                            />
                    </Grid.Column>
                </Grid>
        )
    }
}

export default MessageTypes