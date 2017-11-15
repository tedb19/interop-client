import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import titleCase from 'title-case'
import 'rc-tooltip/assets/bootstrap.css'
import { Header, Grid, Message, Table } from 'semantic-ui-react'
import { EntitiesMenu } from './EntitiesMenu'
import { MoreInfo } from '../../shared/Content/MoreInfo'
import { Detail } from '../../shared/Content/Detail'
import { TableRow } from '../../shared/Table/TableRow'
import { StatusLabel } from '../../shared/Misc/StatusLabel'
import { FormModal } from './FormModal'
import { CircularLoader } from '../../shared/Loader/CircularLoader'
import { config } from '../../../utils/config.util'
import { entitiesSecondaryMenuData, getEntityObj, deleteAddress, saveAddress, saveStat, messageTypesSubscribedTo, addEntity, getEntityAddress, getEntityColors } from '../../../utils/data.utils'
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
        addressMapping: [],
        currentAddress: ''
    }

    handleEntityMenuItemClick = async (e, { name }) => {
        const [ entity, messageTypes ] = await Promise.all(
            [getEntityObj(name), messageTypesSubscribedTo(name)]
        )

        const currentAddress = await getEntityAddress(entity.id)

        if(currentAddress.hasOwnProperty('id')){
            const date = dateFormat(currentAddress.updatedAt, 'mmm dS, yyyy - h:MM TT')
            this.setState({ 
                currentAddress: currentAddress.address,
                protocol: currentAddress.protocol,
                lastUpdated: date,
                entityStatus: 'ACTIVE'
            })
        } else {
            this.setState({ 
                currentAddress: '',
                protocol: '',
                lastUpdated: 'Never been updated',
                entityStatus: 'INACTIVE' })
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
        const currentAddress = await getEntityAddress(entity.id)
        if(currentAddress.hasOwnProperty('id')){
            const date = dateFormat(currentAddress.updatedAt, 'mmm dS, yyyy - h:MM TT')
            this.setState({ 
                currentAddress: currentAddress.address,
                protocol: currentAddress.protocol,
                lastUpdated: date,
                entityStatus: 'ACTIVE'
            })
        } else {
            this.setState({ 
                currentAddress: '',
                protocol: '',
                lastUpdated: 'Never been updated',
                entityStatus: 'INACTIVE' })
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

    handleAddressChange = (evt) => {
        this.setState({ currentAddress: evt.target.value})
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
            address: this.state.currentAddress.replace(/https:\/\/|http:\/\/|tcp:\/\//g, ''),
            status: 'ACTIVE',
            EntityId: this.state.entity.id
        }
        deleteAddress(this.state.entity.id)
            .then(address => saveAddress(addressObj))
            .then(currentAddress => {
                const date = dateFormat(new Date(), 'mmm dS, yyyy - h:MM TT')
                this.setState({ currentAddress: currentAddress.address, lastUpdated: date, newAddressModalOpen: false, ShowAddressMessage: true, entityStatus: 'ACTIVE' })
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
                    currentAddress: '',
                    protocol: '',
                    name: '',
                    description: '',
                    lastUpdated: 'Never been updated',
                    entityStatus: 'INACTIVE'
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

    entityTable = () => {
        const data = this.state.entity
        const TableRows = []
        for(var item in data){
            if(['id', 'color', 'createdAt', 'updatedAt', 'AddressMappings', 'address'].includes(item)) continue
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
            content: this.state.currentAddress ? 
            `${this.state.ActiveEntityMenuItem} has been assigned ${this.state.currentAddress} as it's new address, using the ${this.state.protocol} protocol`
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
        const submitHandler = (!this.state.protocol || !this.state.currentAddress) ? this.handleEmptySubmit : this.handleNewAddressSubmit
        const updateAddressLink = <Link to='#' onClick={this.handleNewAddressModalOpen}>Update Address</Link>
        return (
            <NewAddressModal
                trigger={updateAddressLink}
                onDismiss={this.handleDismiss}
                errorMessage={this.state.addressErrorMessage}
                handleSubmit={submitHandler}
                handleAddressChange={this.handleAddressChange}
                handleProtocolChange={this.handleProtocolChange}
                protocol={this.state.protocol}
                address={this.state.currentAddress}
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