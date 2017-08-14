import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Header, Grid, Segment, Label, Divider } from 'semantic-ui-react'
import { MainContent } from '../../shared/Content/MainContent'
import { Subscriber } from './Subscriber'
import { messageSubscribersData } from '../../../utils/data.utils'

export class MessageSubscription extends Component {

    render() {
        const SubscribersLabels = messageSubscribersData()
            .map(subscriber => 
                <Subscriber
                    key={Math.random()}
                    messageType={subscriber.messageType.replace(/_/g, '  ')}
                    subscribers={subscriber.subscribers}/>
            )
        return  (
            <div>
                <Header as='h2' className="sub-header-text">Message Subscription</Header>
                <MainContent>
                     <Grid columns={1}>
                        <Grid.Column width={13} className="grid-subscriptions">
                            <Header as='h3' className="stats-header">Message types and their subscriptions</Header>
                            <Divider/>
                            <Segment inverted className="segment-subscriptions">
                                <Label className="stats-sub-header-left">Message types</Label>
                                <Label className="stats-sub-header-right">Entities subscribed to the msg type</Label>
                                <Divider className="stats-divider"/>
                                {SubscribersLabels}
                            </Segment>
                            <Link to="/" className="link-new-subscriptions">Add Subscription</Link>
                        </Grid.Column>
                    </Grid>
                </MainContent>
            </div>
        )
    }
}