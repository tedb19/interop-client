import React from 'react'
import { RibbonSection } from '../../shared/Content/RibbonSection'
import { Card, Icon, Button, Input } from 'semantic-ui-react'
import Tooltip from 'rc-tooltip'

export const Addresses = (props) => {
    /*
    const addressMappings = props.addressMappings

    const allAddresses = addressMappings.map((addressMapping) => {
        const description = addressMapping.protocol === 'TCP' ?
            `This should be a TCP port where the participating system will be listening on. 
            The IL will be sending the messages to this port.`
        return (
            <AddressCard
                statusIconName
                statusIconColor
                addressType={addressMapping.protocol}
                lastUpdated
                description
                address
                />
        )
    })
    const allAddresses = [{
        statusIconName: props.statusIconName
    }]
    */
    return (
        <RibbonSection heading="System Addresses" color="orange">
            <Card.Group className="addresses">
                <Card color="teal" className="address-card">
                    <Card.Content>
                        <Icon name={props.httpstatusIconName} className="address-status" size="large" color={props.httpstatusIconColor}/>
                        <Card.Header className="address-card-header">
                        HTTP Address
                        </Card.Header>
                        <Card.Meta className="system-address-meta-date">
                        Last Updated: {props.httpLastUpdated}
                        </Card.Meta>
                        <Card.Description>
                        This should be a POST endpoint on the participating system. 
                        The IL will be doing an HTTP POST to this address.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra className="system-address-area">
                        <span className="system-address">{props.httpAddress}</span>
                        <br/>
                        {props.httpAddressInputVisible ? 
                        <Tooltip placement="top" overlay={<span>Add the http address, then press Enter.<br /> Or <br /> Click the "cancel update" link to opt out</span>}>
                            <Input type="text"
                                onChange={props.handleHttpChange}
                                value={props.httpAddress}
                                className="new-address-input" size="mini" icon='signal'
                                iconPosition='left' placeholder='Add address...' />
                        </Tooltip> : ''}
                    </Card.Content>
                    <Card.Content>
                        <div className='ui two buttons'>
                        <Button color='green' onClick={props.handleHttpButtonClick}>
                            {props.httpContext}
                        </Button>
                        <Button.Or />
                        <Button color='red' onClick={props.handleClear}>
                            Clear
                        </Button>
                        </div>
                    </Card.Content>
                </Card>
                <Card color="teal" className="address-card">
                    <Card.Content>
                        <Icon name={props.tcpstatusIconName} className="address-status" size="large" color={props.tcpstatusIconColor}/>
                        <Card.Header className="address-card-header">
                        TCP Address
                        </Card.Header>
                        <Card.Meta className="system-address-meta-date">
                        Last Updated: {props.tcpLastUpdated}
                        </Card.Meta>
                        <Card.Description>
                        This should be a TCP port where the participating system will be listening on. 
                        The IL will be sending the messages to this port.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra className="system-address-area">
                        <span className="system-address">{props.tcpAddress}</span>
                        <br/>
                        {props.tcpAddressInputVisible ? 
                        <Tooltip placement="top" overlay={<span>Add the tcp address, then press Enter.<br /> Or <br /> Click the "cancel update" link to opt out</span>}>
                            <Input type="text"
                                onChange={props.handleTcpChange}
                                value={props.tcpAddress}
                                className="new-address-input" size="mini" icon='signal'
                                iconPosition='left' placeholder='Add address...' />
                        </Tooltip> : ''}
                    </Card.Content>
                    <Card.Content>
                        <div className='ui two buttons'>
                        <Button color='green' onClick={props.handleTcpButtonClick}>
                            {props.tcpContext}
                        </Button>
                        <Button.Or />
                        <Button color='red' onClick={props.handleClear}>
                            Clear
                        </Button>
                        </div>
                    </Card.Content>
                </Card>
            </Card.Group>
        </RibbonSection>
    )
}