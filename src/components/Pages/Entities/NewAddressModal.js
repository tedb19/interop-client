import React from 'react'
import { Modal, Form, Input, Button, Message } from 'semantic-ui-react'
import { RibbonSection } from '../../shared/Content/RibbonSection'
import { AddressCard } from './AddressCard'

export const NewAddressModal = (props) => {
    const size = props.size || 'tiny'
    const actions=[{ key: 'no', content: 'Close', color: 'red', triggerClose: true }]
    const options = [
        { key: 'TCP', text: 'TCP', value: 'TCP' },
        { key: 'HTTP', text: 'HTTP', value: 'HTTP' }
      ]
    return (
        <RibbonSection heading="System Address" color="orange">
            <AddressCard
                addressType={props.protocol}
                lastUpdated={props.lastUpdated}
                address={props.address}
                />
            <Modal closeIcon='close' size={size} trigger={props.trigger} actions={actions} className="info-modal" open={props.newAddressModalOpen}
            onClose={props.handleClose}>
                <Modal.Header className="modal-header">
                Address Update:
                </Modal.Header>
                <Modal.Content className="modal-content">
                    {props.errorMessage ?
                        <Message
                            header="Incomplete form submission"
                            content= "Please provide the required fields!"
                            icon="exclamation circle"
                            color="red"
                            onDismiss={props.onDismiss}
                            info={true}
                            size='small'/>
                        : null }
                        
                    <Form className="modal-form">
                        <Form.Group widths='equal'>
                            <Form.Select required
                                label='Protocol' 
                                options={options} 
                                placeholder='protocol...'
                                name="protocol"
                                value={props.protocol}
                                onChange={props.handleProtocolChange}/>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input} label='Address' required
                                placeholder='Address...' icon="signal"
                                iconPosition="left" name="address"
                                value={props.address}
                                onChange={props.handleAddressChange}/>
                        </Form.Group>
                        <Button.Group>
                            <Button negative onClick={props.handleClose}>Cancel</Button>
                            <Button.Or />
                            <Button positive onClick={props.handleSubmit} >Save</Button>
                        </Button.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions className="modal-footer">
                    <span className="modal-footer-span">New System Address</span>
                </Modal.Actions>
            </Modal>
        </RibbonSection>
    )
}