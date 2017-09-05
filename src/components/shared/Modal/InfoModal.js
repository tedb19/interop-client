import React from 'react'
import { Modal } from 'semantic-ui-react'

export const InfoModal = (props) => {
    const size = props.size || 'tiny'
    const actions=[{ key: 'no', content: 'Close', color: 'red', triggerClose: true }]
    return (
        <Modal closeIcon='close' size={size} trigger={props.trigger} actions={actions} className="info-modal">
            <Modal.Header className="modal-header">
            {props.header}
            </Modal.Header>
            <Modal.Content className="modal-content" scrolling>
                {props.content}
            </Modal.Content>
            <Modal.Actions className="modal-footer">
                {props.footer}
            </Modal.Actions>
        </Modal>
    )
}