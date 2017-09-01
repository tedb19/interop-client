import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import titleCase from 'title-case'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'
import { Header, Grid, Input, Button, Icon, Message } from 'semantic-ui-react'
import { EntitiesMenu } from './EntitiesMenu'
import { MoreInfo } from '../../shared/Content/MoreInfo'
import { Detail } from '../../shared/Content/Detail'
import { TableRow } from '../../shared/Table/TableRow'
import { StatusLabel } from '../../shared/Misc/StatusLabel'
import { DefaultEntityForMenu, entitiesSecondaryMenuData, getEntityObj, messageTypesSubscribedTo, updateEntity } from '../../../utils/data.utils'

export class Entities extends Component {

    state = {
        ActiveEntityMenuItem: this.props.match.params.name || DefaultEntityForMenu().name,
        EntityMenuData: entitiesSecondaryMenuData(),
        NewAddressInputVisible: false,
        ShowAddressMessage: false
    }

    handleEntityMenuItemClick = (e, { name }) => this.setState({ ActiveEntityMenuItem: name} )

    handleNewAddressLinkClick = (evt) => this.setState({ NewAddressInputVisible: !this.state.NewAddressInputVisible })

    handleAddressSubmit = (evt) => {
        if(evt.key === 'Enter'){
            const newEntity = Object.assign(getEntityObj(this.state.ActiveEntityMenuItem), { address: evt.target.value, status: evt.target.value? 'ACTIVE' : 'INACTIVE'})
            updateEntity(newEntity)
                .then(entity => {
                    this.setState({ NewAddressInputVisible: false, ShowAddressMessage: true })
                    this.handleInfoOnDismiss()
                })
        }
    }

    handleInfoOnDismiss = () => {    
        setTimeout(() => {
            this.setState({ ShowAddressMessage: false })
        }, 4000)
    }

    componentDidUpdate() {
        if(this.refs.newAddress)
            this.refs.newAddress.focus()
    }

    render() {
        const data = getEntityObj(this.state.ActiveEntityMenuItem)
        const addLinkUrl = `/Entities/${this.state.ActiveEntityMenuItem.replace(/ /g,'-')}/Subscribe-To-Message-Type`
        const TableRows = []

        for(var item in data){
            const updateLink = !this.state.NewAddressInputVisible ?
                <Button onClick={this.handleNewAddressLinkClick} color="teal" className="new-address-button">
                    <Icon name="edit" color="olive" />update address
                </Button>
                :
                <Button onClick={this.handleNewAddressLinkClick} color="red" className="new-address-button">
                    <Icon name="cancel" color="olive" />cancel update
                </Button>
             if(['id', 'color', 'createdAt', 'updatedAt'].includes(item)) continue
            if(item === 'status'){
                const status = data[item] === 'ACTIVE' ? StatusLabel('green', data[item]) : StatusLabel('red', data[item])
                TableRows.push(<TableRow key={item} name={titleCase(item)} value={data[item] ? status : 'Not specified'}/>)
            } else if(item === 'address'){
                const value = (
                <div>
                    {data[item] ? <span className="new-address-data">{data[item]}</span> : ''}
                    {this.state.NewAddressInputVisible ? 
                        <Tooltip placement="top" overlay={<span>Add/edit the address, then press Enter.<br /> Or <br /> Click the "cancel update" link to opt out</span>}>
                            <Input type="text" 
                                ref="newAddress"
                                onKeyPress={this.handleAddressSubmit}
                                className="new-address-input" size="mini" icon='signal' 
                                iconPosition='left' placeholder='Add address...' />
                        </Tooltip> : ''}
                    <span className="new-address-link">{updateLink}</span>
                </div>
                )
                TableRows.push(<TableRow key={item} name={titleCase(item)} value={value}/>)
            } else {
                TableRows.push(<TableRow key={item} name={titleCase(item)} value={data[item] ? data[item] : 'Not specified'}/>)
            }
        }
        
        const updateLink = <Link to='#'>Update entity details</Link>
        const messageTypes = messageTypesSubscribedTo(this.state.ActiveEntityMenuItem)
        const newMessageDetails = {
            header: 'New Address Added:',
            content: `${data.address} has been set as the new address for ${this.state.ActiveEntityMenuItem}`
        }
        const messages = this.state.ShowAddressMessage ?
            <Message
                header={newMessageDetails.header}
                content={newMessageDetails.content}
                icon="info circle"
                color="teal"
                onDismiss={this.handleInfoOnDismiss}
                info={true}
                size='small'/>
                : null 
        return (
            <Grid columns={12}>
                <Grid.Column width={2}>
                    <Header as='h2' className="sub-header-text">Systems</Header>
                    <EntitiesMenu
                        handleEntityMenuItemClick={this.handleEntityMenuItemClick}
                        activeItem={this.state.ActiveEntityMenuItem}
                        entities={this.state.EntityMenuData}
                        />
                    <br/>
                    <span><Link to="#">Add new entity</Link></span>
                </Grid.Column>
                <Grid.Column width={10} className="content-area">
                    
                    <Detail
                        heading="System Overview"
                        tableRows={TableRows}
                        updateLink={updateLink}
                        messages={messages}>
                            <MoreInfo
                                heading="Message types subscribed to:"
                                data={messageTypes}
                                addLinkUrl={addLinkUrl}
                                addLinkText='Subscribe To Message Type'
                                leftSubheading='Message types'/>
                            <Link className="link-new-subscriptions" to='/Message-Subscription'>Add subscription</Link>
                    </Detail>
                </Grid.Column>
            </Grid>
        )
    }
}