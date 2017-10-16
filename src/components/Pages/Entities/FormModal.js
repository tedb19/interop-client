import React from 'react'
import { Modal, Form, Input, TextArea, Button, Message, Icon } from 'semantic-ui-react'

export const FormModal = (props) => {
    const size = props.size || 'tiny'
    const actions=[{ key: 'no', content: 'Close', color: 'red', triggerClose: true }]
    return (
        <Modal closeIcon='close' size={size} trigger={props.trigger} actions={actions} className="info-modal" open={props.modalOpen}
        onClose={props.handleClose}>
            <Modal.Header className="modal-header">
            New system:
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
                <Message size='small' color="teal" icon>
                    <Icon name="lightbulb" color="orange"/>
                    <Message.Content>
                        <Message.Header>Quick Note</Message.Header>
                        Adding a system means it will be available to participate on the integration.
                        However, the system will not be <strong>ACTIVE</strong> until it's assigned a valid address.
                        This will be done at the facility.
                    </Message.Content>
                </Message>
                    
                <Form className="modal-form">
                    <Form.Group widths='equal'>
                        <Form.Field control={Input} label='Name' required
                             placeholder='Name...' icon="tag"
                             iconPosition="left" name="name"
                             value={props.name}
                             onChange={props.handleNameChange}/>
                    </Form.Group>
                    <Form.Field control={TextArea} label='Description' required
                         placeholder='A brief description about the system..' name="description"
                         value={props.description}
                         onChange={props.handleDescriptionChange}/>
                    <Button.Group>
                        <Button negative onClick={props.handleClose}>Cancel</Button>
                        <Button.Or />
                        <Button positive onClick={props.handleSubmit} >Save</Button>
                    </Button.Group>
                </Form>
            </Modal.Content>
            <Modal.Actions className="modal-footer">
                <span className="modal-footer-span">Participating system</span>
            </Modal.Actions>
        </Modal>
    )
}