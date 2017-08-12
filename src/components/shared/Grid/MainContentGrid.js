import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { SideMenu } from '../Menu/SideMenu'
import { MessaegTypesMenu } from '../../MessageTypes/MessageTypesMenu'
import { MessageTypeDetail } from '../../MessageTypes/MessageTypeDetail'
import { Link } from 'react-router-dom'
const messageType = { id: 1, name: 'ADT^A04', verboseName: 'PADIENT_REGISTRATION',  description: 'The patient registration message. The patient registration message. The patient registration message. The patient registration message. The patient registration message. The patient registration message. The patient registration message.'}
export const MainContentGrid = (props) => (
    <Grid.Row>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={2} className="main-menu">
            <SideMenu
                handleItemClick={props.handleMainMenuItemClick}
                activeItem={props.ActiveMenuItem}/>
        </Grid.Column>
        <Grid.Column width={2}>
            <Header as='h2' className="sub-header-text">Message Type</Header>
            <MessaegTypesMenu
                handleSecondaryMenuItemClick={props.handleSecondaryMenuItemClick}
                activeItem={props.ActiveSecondaryMenuItem}
                messageTypes={props.SecondaryMenuData}/>
            <br/>
            <span><Link to="/new-message-type">Add new message type</Link></span>
        </Grid.Column>
        <Grid.Column width={8} className="content-area">
            <MessageTypeDetail
                messageType={messageType}/>
        </Grid.Column>
        <Grid.Column width={2}></Grid.Column>
    </Grid.Row>
)

