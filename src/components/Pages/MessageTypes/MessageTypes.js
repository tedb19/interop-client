import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import titleCase from 'title-case'

import { Header, Grid } from 'semantic-ui-react'
import { MessageTypesMenu } from './MessageTypesMenu'
import { MoreInfo } from '../../shared/Content/MoreInfo'
import { Detail } from '../../shared/Content/Detail'
import { TableRow } from '../../shared/Table/TableRow'
import { StatusLabel } from '../../shared/Misc/StatusLabel'

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
            if(item === 'id') continue
            if(item === 'status') {
                const status = data[item] === 'ACTIVE' ? StatusLabel('green', data[item]) : StatusLabel('red', data[item])
                TableRows.push(<TableRow key={item} name={titleCase(item)} value={data[item] ? status : 'Not specified'}/>)
            } else {
                TableRows.push(<TableRow key={item} name={titleCase(item)} value={data[item] ? data[item] : 'Not specified'}/>)
            }
        }
        
        const updateLink = <Link to='/update-message-type'>Update message type details</Link>
        const unsubscribeLink = (name) => `/Message-Types/${this.state.ActiveMessageTypeMenuItem}/Subscription/${name}/Unsubscribe`

        const entities = [
            {name: 'ADT', description: 'Dispensing application', color: 'purple', editLink: unsubscribeLink('ADT'), editText: 'Unsubscribe'},
            {name: 'IQCARE', description: 'The EMR application', color: 'purple', editLink: unsubscribeLink('IQCARE'), editText: 'Unsubscribe'},
            {name: 'T4A', description: 'The scheduling system', color: 'purple', editLink: unsubscribeLink('T4A'), editText: 'Unsubscribe'}
        ]
        const addLinkUrl = `/Message-Types/${this.state.ActiveMessageTypeMenuItem.replace(/ /g,'-')}/Add-Subscription`
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
                            updateLink={updateLink}>
                            <MoreInfo
                                heading="Entities Subscribed To This Message Type:"
                                data={entities}
                                addLinkUrl={addLinkUrl}
                                addLinkText='Add subscription'/>
                        </Detail>
                    </Grid.Column>
                </Grid>
        )
    }
}

export default MessageTypes