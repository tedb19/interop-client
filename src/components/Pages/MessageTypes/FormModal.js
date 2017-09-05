import React from 'react'
import { Modal, Form, Input, TextArea, Button, Message, Icon } from 'semantic-ui-react'

export const FormModal = (props) => {
    const size = props.size || 'tiny'
    const actions=[{ key: 'no', content: 'Close', color: 'red', triggerClose: true }]
    return (
        <Modal closeIcon='close' size={size} trigger={props.trigger} actions={actions} className="info-modal" open={props.modalOpen}
        onClose={props.handleClose}>
            <Modal.Header className="modal-header">
            New message type:
            </Modal.Header>
            <Modal.Content className="modal-content">
                <Message size='small' color="teal" icon>
                    <Icon name="lightbulb" color="orange"/>
                    <Message.Content>
                        <Message.Header>Quick Note</Message.Header>
                        Adding a new message type means the participating systems can now begin exchanging information using this message type.
                        The new message type must be based on <a href="https://www.hl7.org/implement/standards/product_brief.cfm?product_id=148"><u>hl7 v2</u></a>,
                         and must contain atleast all the data elements contained on the <strong><u>green card</u></strong>,
                        and additionally can contain any other partner-specific data elements.
                    </Message.Content>
                </Message>
                    
                <Form className="modal-form">
                    <Form.Group widths='equal'>
                        <Form.Field control={Input} label='Name' required
                             placeholder='Name...' icon="tag"
                             iconPosition="left" name="name"
                             value={props.name}
                             onChange={props.handleNameChange}/>
                        <Form.Field control={Input} label='Verbose name' required
                             placeholder='Verbose name..' icon="edit"
                             iconPosition="left" name="verboseName"
                             value={props.verboseName}
                             onChange={props.handleVerboseNameChange}/>
                    </Form.Group>
                    <Form.Field control={TextArea} label='Description' required
                         placeholder='A brief description about the message type..' name="description"
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
                <span className="modal-footer-span">Hl7 v2 compliant message</span>
            </Modal.Actions>
        </Modal>
    )
}