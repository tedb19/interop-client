import React, {Component} from 'react'
import { Header, Grid, Segment, Label, Divider } from 'semantic-ui-react'
import { MainContent } from '../../shared/Content/MainContent'
import { MessageTypeSubscriber } from './MessageTypeSubscribers'
import { addSubscription, removeSubscription, getContextData, entitiesSubscribedTo } from '../../../utils/data.utils'
import { SubscriberPool } from './SubscriberPool'
import { DialogModal } from '../../shared/Modal/DialogModal'
import { InfoMessage } from '../../shared/Modal/InfoMessage'

export class MessageSubscription extends Component {

    state = {
        subscriptions: null,
        currentMessageType: '',
        currentEntity: '',
        newSubscriptionDialogOpen: false,
        newSubscriptionMessageOpen: false,
        unsubscribeDialogOpen: false,
        unsubscribeMessageOpen: false,
        duplicateSubscriptionDialogOpen: false,
        entities: null
    }

    componentWillMount() {
        this.setState({ entities: getContextData('entities'), subscriptions: getContextData('subscribers') })
    }

    newSubscriptionDialogOnClose = () => this.setState({ newSubscriptionDialogOpen: false })
    duplicateSubscriptionDialogOnClose = () => this.setState({ duplicateSubscriptionDialogOpen: false})
    unsubscribeDialogOnClose = () => this.setState({ unsubscribeDialogOpen: false })

    handleSubscriberClick = (subscriber, messageType) => {
        
        this.setState({ 
            currentEntity: subscriber, 
            currentMessageType: messageType,
            unsubscribeDialogOpen: true
        })
    }
    
    handleDialogButtonClicked = (key) => {
        if(key === 'Yes' && this.state.newSubscriptionDialogOpen){
            addSubscription(this.state.currentMessageType, this.state.currentEntity)
                .then( subscriptions => {
                    this.setState({subscriptions: getContextData('subscribers'), newSubscriptionMessageOpen: true })
                })
        } else if(key === 'Yes' && this.state.unsubscribeDialogOpen){
            removeSubscription(this.state.currentMessageType.replace(/ /g, '_'), this.state.currentEntity)
                .then(subscriptions => {
                    this.setState({
                        subscriptions: getContextData('subscribers'),
                        unsubscribeMessageOpen: true
                   })
                })
        }
        this.setState({ newSubscriptionDialogOpen: false, unsubscribeDialogOpen: false })
        this.handleInfoOnDismiss() 
    }

    handleduplicateSubscriptionDialogButtonClicked = (key) => {
        if(key === 'Ok') {
            this.setState({ duplicateSubscriptionDialogOpen: false})
        }
    }

    handleInfoOnDismiss = () => {    
        setTimeout(() => {
            this.setState({ newSubscriptionMessageOpen: false, unsubscribeMessageOpen: false })
        }, 4000)
    }

    render() {
        const SubscribersLabels = this.state.subscriptions
            .map(subscriber => 
                <MessageTypeSubscriber
                    key={subscriber.messageType.replace(/_/g, '')}
                    messageType={subscriber.messageType.replace(/_/g, ' ')}
                    subscribers={subscriber.subscribers}
                    handleSubscriberClick={this.handleSubscriberClick}
                    onDrop={(data) => {
                        const entities = entitiesSubscribedTo(subscriber.messageType)
                        const entity = entities.find(entity => entity.name === data.subscribers)
                        entity ?
                            this.setState({
                                 currentMessageType: subscriber.messageType, 
                                 currentEntity: data.subscribers, 
                                 duplicateSubscriptionDialogOpen: true
                            }) :
                            this.setState({
                                 currentMessageType: subscriber.messageType, 
                                 currentEntity: data.subscribers,
                                 newSubscriptionDialogOpen: true 
                            })
                    }}/>
            )

        const subscriptionMessages = {
            dialogConfirmationMsg: <p>Subscribe <strong>{this.state.currentEntity}</strong> to the <strong>{this.state.currentMessageType.replace(/_/g, ' ')}</strong> message type?</p>,
            messageContent: `${this.state.currentEntity} has been successfully subscribed to the ${this.state.currentMessageType} message type.`,
            messageHeader: 'Message Type Subscription',
            dialogHeader: 'Subscribe to message type:'
        }

        const duplicateSubscriptionMessages = {
            dialogConfirmationMsg: <p><strong>{this.state.currentEntity}</strong> is already subscribed to the <strong>{this.state.currentMessageType.replace(/_/g, ' ')}</strong> message type!</p>,
            dialogHeader: 'Duplicate Subscription:'
        }

        const unsubscriptionMessages = {
            dialogConfirmationMsg: <p>Unsubscribe <strong>{this.state.currentEntity}</strong> from the <strong>{this.state.currentMessageType.replace(/_/g, ' ')}</strong> message type?</p>,
            messageContent: `${this.state.currentEntity} has been successfully unsubscribed from the ${this.state.currentMessageType} message type.`,
            messageHeader: 'Unsubscribe from message type',
            dialogHeader: 'Unsubscribe from message type:'
        }

        return  (
            <div>
                <Header as='h2' className="sub-header-text">Message Subscription</Header>
                <MainContent>
                     <Grid columns={1}>
                        <Grid.Column width={16}>
                            <Header as='h3' className="stats-header">Message types and their subscriptions</Header>
                            <Divider/>
                                {this.state.newSubscriptionMessageOpen ?
                                    <InfoMessage
                                        currentEntity={this.state.currentEntity}
                                        currentMessageType={this.state.currentMessageType}
                                        onDismiss={this.handleInfoOnDismiss}
                                        header={subscriptionMessages.messageHeader}
                                        content={subscriptionMessages.messageContent}/>
                                    : null }

                                {this.state.unsubscribeMessageOpen ?
                                    <InfoMessage
                                        currentEntity={this.state.currentEntity}
                                        currentMessageType={this.state.currentMessageType}
                                        onDismiss={this.handleInfoOnDismiss}
                                        header={unsubscriptionMessages.messageHeader}
                                        content={unsubscriptionMessages.messageContent}/>
                                    : null }

                            <Segment inverted className="segment-subscriptions">
                                <Label className="stats-sub-header-left">Message types</Label>
                                <Label className="stats-sub-header-right">Systems subscribed to the msg type</Label>
                                <Divider className="stats-divider"/>
                                {SubscribersLabels}
                                <DialogModal
                                    open={this.state.newSubscriptionDialogOpen}
                                    close={this.newSubscriptionDialogOnClose}
                                    header={subscriptionMessages.dialogHeader}
                                    isClicked={this.handleDialogButtonClicked}
                                    content={subscriptionMessages.dialogConfirmationMsg}
                                    yesNo={true}/>

                                <DialogModal
                                    open={this.state.duplicateSubscriptionDialogOpen}
                                    close={this.duplicateSubscriptionDialogOnClose}
                                    header={duplicateSubscriptionMessages.dialogHeader}
                                    isClicked={this.handleduplicateSubscriptionDialogButtonClicked}
                                    content={duplicateSubscriptionMessages.dialogConfirmationMsg}
                                    yesNo={false}
                                    icon="exclamation circle"/>

                                <DialogModal
                                    open={this.state.unsubscribeDialogOpen}
                                    close={this.unsubscribeDialogOnClose}
                                    header={unsubscriptionMessages.dialogHeader}
                                    isClicked={this.handleDialogButtonClicked}
                                    content={unsubscriptionMessages.dialogConfirmationMsg}
                                    yesNo={true}/>
                            </Segment>
                            <Header as='h4' className="stats-header">Drag and drop a system to a message type to initiate a subscription</Header>
                            {this.state.entities ? <SubscriberPool entities={this.state.entities} /> : null}
                        </Grid.Column>
                    </Grid>
                </MainContent>
            </div>
        )
    }
}