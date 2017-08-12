import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { SideMenu } from '../Menu/SideMenu'
import { MessaegTypesMenu } from '../../MessageTypes/MessageTypesMenu'
import { InfoSection } from '../Content/InfoSection'

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
            <span><a href="">Add new message type</a></span>
        </Grid.Column>
        <Grid.Column width={8} className="content-area">
            <InfoSection>
                Coming soon!!
            </InfoSection>
        </Grid.Column>
        <Grid.Column width={2}></Grid.Column>
    </Grid.Row>
)

