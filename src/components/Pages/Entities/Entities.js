import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import titleCase from 'title-case'
import 'rc-tooltip/assets/bootstrap.css'
import { Header, Grid, Button, Icon, Message, Table } from 'semantic-ui-react'
import { EntitiesMenu } from './EntitiesMenu'
import { MoreInfo } from '../../shared/Content/MoreInfo'
import { Detail } from '../../shared/Content/Detail'
import { TableRow } from '../../shared/Table/TableRow'
import { StatusLabel } from '../../shared/Misc/StatusLabel'
import { FormModal } from './FormModal'
import { CircularLoader } from '../../shared/Loader/CircularLoader'
import { config } from '../../../utils/config.util'
import { entitiesSecondaryMenuData, getEntityObj, deleteAddress, saveAddress, saveStat, messageTypesSubscribedTo, addEntity, getEntityColors } from '../../../utils/data.utils'
import { NewAddressModal } from './NewAddressModal'
import dateFormat from 'dateformat'

export class Entities extends Component {

    state = {
        ActiveEntityMenuItem: this.props.match.params.name  || null,
        EntityMenuData: null,
        NewAddressInputVisible: false,
        ShowNewEntityMessage: false,
        ShowAddressMessage: false,
        entity: null,
        name: '',
        httpAddress: 'NOT PROVIDED!',
        tcpAddress: 'NOT PROVIDED!',
        address:'',
        protocol: '',
        lastUpdated: '',
        entityStatus: '',
        description: '',
        modalOpen: false,
        newAddressModalOpen: false,
        httpAddressInputVisible: false,
        tcpAddressInputVisible: false,
        httpContext: 'Update',
        tcpContext: 'Update',
        addressMapping: []
    }

    handleEntityMenuItemClick = async (e, { name }) => {
        const [ entity, messageTypes ] = await Promise.all(
            [getEntityObj(name), messageTypesSubscribedTo(name)]
        )

        if(entity.AddressMappings.length){
            
            entity.AddressMappings.forEach(addressMapping => {
                const date = dateFormat(addressMapping.updatedAt, 'mmm dS, yyyy - h:MM TT')
                this.setState({ 
                    address: addressMapping.address,
                    protocol: addressMapping.protocol,
                    lastUpdated: date,
                    entityStatus: 'ACTIVE'
                })
            })
        } else {
            this.setState({ 
                address: '',
                protocol: '',
                lastUpdated: 'Never been updated',
                entityStatus: 'INACTIVE'
            })
        }

        this.setState({
            entity, messageTypes,
            ActiveEntityMenuItem: name,
            NewAddressInputVisible: false,
            tcpAddressInputVisible: false,
            httpAddressInputVisible: false,
            httpContext: 'Update',
            tcpContext: 'Update'
        })
    }

    handleNewAddressLinkClick = (evt) => this.setState({ NewAddressInputVisible: !this.state.NewAddressInputVisible })

    handleInfoOnDismiss = () => {    
        setTimeout(() => {
            this.setState({ ShowAddressMessage: false, ShowNewEntityMessage: false })
        }, 5000)
    }

    async componentDidMount() {
        
        const secMenuData = await entitiesSecondaryMenuData()
        const activeMenuItem = secMenuData.find((entity, idx) => idx === 0)
        const currentPage = this.props.match.params.name || activeMenuItem.name
        const [ entity, messageTypes ] = await Promise.all(
            [getEntityObj(currentPage), messageTypesSubscribedTo(currentPage)]
        )
        console.log(entity)
        if(entity.AddressMappings.length){
            entity.AddressMappings.forEach(addressMapping => {
                const date = dateFormat(addressMapping.updatedAt, 'mmm dS, yyyy - h:MM TT')
                this.setState({
                    address: addressMapping.address,
                    protocol: addressMapping.protocol,
                    entityStatus: 'ACTIVE',
                    lastUpdated: date,
                })
            })
        } else {
            this.setState({ entityStatus: 'INACTIVE', lastUpdated: 'Never been updated' })
        }

        this.setState({
            EntityMenuData: secMenuData,
            entity, messageTypes,
            ActiveEntityMenuItem: activeMenuItem.name,
            NewAddressInputVisible: false,
        })
    }

    handleInputChange = (evt) => {
        const name = evt.target.name
        this.setState({
            [name]: evt.target.value
        })
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleNewAddressModalOpen = () => this.setState({ newAddressModalOpen: true })

    handleEmptySubmit = (evt) => {
        evt.preventDefault()
        this.setState({
            errorMessage: true
        })
        this.handleDismiss()
    }

    handleNewAddressSubmit = (evt, value) => {

        const addressObj = {
            protocol: this.state.protocol,
            address: this.state.address,
            status: 'ACTIVE',
            EntityId: this.state.entity.id
        }

        deleteAddress(this.state.entity.id)
            .then(address => saveAddress(addressObj))
            .then(entities => {
                const date = dateFormat(new Date(), 'mmm dS, yyyy - h:MM TT')
                this.setState({ entities, lastUpdated: date, newAddressModalOpen: false, ShowAddressMessage: true, entityStatus: 'ACTIVE' })
                this.handleInfoOnDismiss()
            }).catch(console.log)
    }

    handleSubmit = (evt, value) => {
        const entity = {
            description: this.state.description,
            name: this.state.name.toUpperCase().replace(/ /g, '_'),
            address: null,
            status: 'INACTIVE'
        }
        const stat = {
            name: `${this.state.name.toUpperCase().replace(/ /g, '_')}_STATUS`,
            value: 'offline',
            description: ''
        }
        getEntityColors()
            .then(takenColors => {
                return config.colors.filter(color => takenColors.indexOf(color) < 0 )
            }).then(possibleColors => {
                const newEntity = Object.assign(entity, { color: possibleColors[0]})
                return addEntity(newEntity)
            }).then(data => Promise.all([
                getEntityObj(entity.name),
                messageTypesSubscribedTo(entity.name),
                entitiesSecondaryMenuData(),
                saveStat(stat)
            ])).then(([fetchedEntity, messageTypes, secMenu, stat]) => {
                this.setState({
                    entity, messageTypes,
                    EntityMenuData: secMenu,
                    ShowNewEntityMessage: true,
                    ActiveEntityMenuItem: fetchedEntity.name,
                    modalOpen: false,
                    address: '',
                    name: '',
                    description: ''
                })
                this.handleInfoOnDismiss()
            }).catch(console.log)
    }

    handleDismiss = () => {
        setTimeout(() => {
            this.setState({ errorMessage: false })
        }, 3000)
    }

    handleClose = () => this.setState({ modalOpen: false })

    handleNewAddressClose = () => this.setState({ newAddressModalOpen: false })
    
    getAddressUpdateLink = () => (
        this.state.NewAddressInputVisible ?
            <Button onClick={this.handleNewAddressLinkClick} color="red" className="new-address-button">
                <Icon name="cancel" color="olive" />cancel update
            </Button> :
            <Button onClick={this.handleNewAddressLinkClick} color="teal" className="new-address-button">
                <Icon name="edit" color="olive" />update address
            </Button>
    )

    entityTable = () => {
        const data = this.state.entity
        const TableRows = []
        for(var item in data){
            if(['id', 'color', 'createdAt', 'updatedAt', 'AddressMappings'].includes(item)) continue
            if(item === 'status'){
                const status = this.state.entityStatus === 'ACTIVE' ? StatusLabel('green', 'ACTIVE') : StatusLabel('red', 'INACTIVE')
                TableRows.push(<TableRow key={item} name={titleCase(item)} value={data[item] ? status : 'Not specified'}/>)
            } else {
                TableRows.push(<TableRow key={item} name={titleCase(item)} value={data[item] ? data[item] : 'Not specified'}/>)
            }
        }
        return (
            <Table celled striped>
                <Table.Body>
                    {TableRows}
                </Table.Body>
            </Table>
        )
    }

    messages = () => {
        const newMessageDetails = {
            header: 'New Address Added:',
            content: this.state.address ? 
            `${this.state.ActiveEntityMenuItem} has been assigned ${this.state.address} as it's new address, using the ${this.state.protocol} protocol`
            : `${this.state.ActiveEntityMenuItem} address has been removed!! This has the effect of making this system INACTIVE and unavailable for data exchange`
        }

        const newEntityDetails = {
            header: 'New System Added:',
            content: `${this.state.ActiveEntityMenuItem} has been added successfully! However, it will remain INACTIVE until an address is added`
        }
        if(this.state.ShowAddressMessage){
            return (
                <Message
                    header={newMessageDetails.header}
                    content={newMessageDetails.content}
                    icon="info circle"
                    color="teal"
                    onDismiss={this.handleInfoOnDismiss}
                    info={true}
                    size='small'/>
            )
        } else if(this.state.ShowNewEntityMessage){
            return (
                <Message
                    header={newEntityDetails.header}
                    content={newEntityDetails.content}
                    icon="info circle"
                    color="teal"
                    onDismiss={this.handleInfoOnDismiss}
                    info={true}
                    size='small'/>
            )
        } else {
            return null
        }
    }

    formModal = () => {
        const submitHandler = (!this.state.name || !this.state.description) ? this.handleEmptySubmit : this.handleSubmit
        const newEntity = <Link to='#' onClick={this.handleOpen}>New System</Link>
        return (
            <FormModal
                trigger={newEntity}
                size="large"
                onDismiss={this.handleDismiss}
                errorMessage={this.state.errorMessage}
                handleSubmit={submitHandler}
                handleNameChange={this.handleInputChange}
                handleDescriptionChange={this.handleInputChange}
                name={this.state.name}
                description={this.state.description}
                handleClose={this.handleClose}
                modalOpen={this.state.modalOpen}
                />
        )
    }

    handleProtocolChange = (evt, data) => this.setState({ protocol: data.value })

    newAddressModal = () => {
        const submitHandler = (!this.state.protocol || !this.state.address) ? this.handleEmptySubmit : this.handleNewAddressSubmit
        const updateAddressLink = <Link to='#' onClick={this.handleNewAddressModalOpen}>Update Address</Link>
        return (
            <NewAddressModal
                trigger={updateAddressLink}
                onDismiss={this.handleDismiss}
                errorMessage={this.state.addressErrorMessage}
                handleSubmit={submitHandler}
                handleAddressChange={this.handleInputChange}
                handleProtocolChange={this.handleProtocolChange}
                protocol={this.state.protocol}
                address={this.state.address}
                handleClose={this.handleNewAddressClose}
                newAddressModalOpen={this.state.newAddressModalOpen}
                lastUpdated={this.state.lastUpdated}
                />
        )
    }

    render() {
        const messages = this.messages()
        const tableRows = this.state.entity ? this.entityTable() : <CircularLoader />
        const formModal = this.formModal()
        const addresses = this.state.entity ? this.newAddressModal() : <CircularLoader /> 

        return (
            <Grid columns={13}>
                <Grid.Column width={3}>
                    <Header as='h2' className="sub-header-text">Systems</Header>
                    {this.state.EntityMenuData ? 
                        <EntitiesMenu
                            handleEntityMenuItemClick={this.handleEntityMenuItemClick}
                            activeItem={this.state.ActiveEntityMenuItem}
                            entities={this.state.EntityMenuData}
                            /> : null
                    }
                    
                    <br/>
                    <span>{formModal}</span>
                </Grid.Column>
                <Grid.Column width={10} className="content-area">
                    <Detail
                        heading="System Overview"
                        data={tableRows}
                        messages={messages}
                        additionalDetails={addresses}
                        moreInfoHeading={`System Subscriptions:`}>
                            {(this.state.messageTypes && this.state.ActiveEntityMenuItem && this.state.entity) ?
                            <MoreInfo
                                data={this.state.messageTypes}
                                addLinkUrl={null}
                                addLinkText='Subscribe To Message Type'
                                leftSubheading='Message types'/>
                            
                            : null}
                            <Link className="link-new-subscriptions" to='/Message-Subscription'>Add subscription</Link>
                    </Detail>
                </Grid.Column>
            </Grid>
        )
    }
}