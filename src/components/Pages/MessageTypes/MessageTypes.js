import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import titleCase from 'title-case'
import { Header, Grid, Image } from 'semantic-ui-react'
import { MessageTypesMenu } from './MessageTypesMenu'
import { MoreInfo } from '../../shared/Content/MoreInfo'
import { Detail } from '../../shared/Content/Detail'
import { TableRow } from '../../shared/Table/TableRow'
import { StatusLabel } from '../../shared/Misc/StatusLabel'
import { InfoModal } from '../../shared/Modal/InfoModal'
import { FormModal } from './FormModal'
import { DefaultMessageTypeForMenu, messageTypesSecondaryMenuData, getMessageTypeObj, entitiesSubscribedTo, addMessageType } from '../../../utils/data.utils'

export class MessageTypes extends Component {

    state = {
        ActiveMessageTypeMenuItem: this.props.match.params.name || DefaultMessageTypeForMenu().name,
        MessageTypeMenuData: messageTypesSecondaryMenuData(),
        name: '',
        modalOpen: false,
        verboseName: '',
        description: ''
    }

    handleMessageTypeMenuItemClick = (e, { name }) => this.setState({ ActiveMessageTypeMenuItem: name} )

    handleInputChange = (evt) => {
        const name = evt.target.name
        this.setState({
            [name]: evt.target.value
        })
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleSubmit = (evt, value) => {
        const messageTYpe = {
            description: this.state.description,
            name: this.state.name.toUpperCase(),
            verboseName: this.state.verboseName.toUpperCase().replace(/ /g, '_')
        }
        addMessageType(messageTYpe)
            .then(messageTypes => this.setState({ MessageTypeMenuData: messageTypesSecondaryMenuData(), modalOpen: false, ActiveMessageTypeMenuItem: `${titleCase(messageTYpe.verboseName.replace(/_/g,' '))}`}))
    }

    handleClose = () => this.setState({ modalOpen: false })

    render() {
        const data = getMessageTypeObj(this.state.ActiveMessageTypeMenuItem)
console.log(this.state.ActiveMessageTypeMenuItem)
        const TableRows = []
        for(var item in data){
            if(['id', 'color', 'createdAt', 'updatedAt'].includes(item)) continue
            if(item === 'status') {
                const status = data[item] === 'ACTIVE' ? StatusLabel('green', data[item]) : StatusLabel('red', data[item])
                TableRows.push(<TableRow key={item} name={titleCase(item)} value={data[item] ? status : 'Not specified'}/>)
            } else if(item === 'verboseName') {
                TableRows.push(<TableRow key={item} name={titleCase(item)} value={titleCase(data[item].replace(/_/g, ' '))}/>)
            } else {
                TableRows.push(<TableRow key={item} name={titleCase(item)} value={data[item] ? data[item] : 'Not specified'}/>)
            }
        }
        
        const messageExample = <Link to='#'>view message</Link>
        const newMsgType = <Link to='#' onClick={this.handleOpen}>New Message Type</Link>

        const messageImage = (imgName) => {
            let imgPath = ''
            try{
                imgPath = require(`../../../images/${imgName}.PNG`)
            } catch (err){
                imgPath = require(`../../../images/default.png`)
            }
            return <Image src={imgPath} wrapped alt="Message Not Uploaded Yet"/>
        }

        const messageFooter = <p className="info-modal-footer">Message Version: 1.0</p>
        const entities = entitiesSubscribedTo(this.state.ActiveMessageTypeMenuItem.replace(/ /g,'_').toUpperCase())

        const infoModal = <InfoModal
                                trigger={messageExample}
                                size="large"
                                header={titleCase(data.verboseName) + ' Message:'}
                                content={messageImage(this.state.ActiveMessageTypeMenuItem.replace(/ /g, '-'))}
                                footer={messageFooter}
                                />
        
        const formModal = <FormModal
                                trigger={newMsgType}
                                size="large"
                                handleSubmit={this.handleSubmit}
                                handleNameChange={this.handleInputChange}
                                handleDescriptionChange={this.handleInputChange}
                                handleVerboseNameChange={this.handleInputChange}
                                name={this.state.name}
                                verboseName={this.state.verboseName}
                                description={this.state.description}
                                handleClose={this.handleClose}
                                modalOpen={this.state.modalOpen}
                                />
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
                        <span>{formModal}</span>
                    </Grid.Column>
                    <Grid.Column width={10} className="content-area">
                        <Detail
                            heading="Message Type Overview"
                            tableRows={TableRows}
                            updateLink={infoModal}>
                            
                            <MoreInfo
                                heading="Systems subscribed to this message type:"
                                data={entities}
                                addLinkUrl="#"
                                addLinkText='Add subscription'
                                leftSubheading='Systems'/>
                        </Detail>
                    </Grid.Column>
                </Grid>
        )
    }
}