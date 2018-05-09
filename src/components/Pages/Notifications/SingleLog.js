import React from 'react'
import { Divider, Icon } from 'semantic-ui-react'
import { InfoModal } from '../../shared/Modal/InfoModal'

import { PeekContent } from './PeekContent'

export const SingleLog = props => {
  return (
    <div className="singleitem">
      <Icon name={props.name} color={props.color} className="singlelog-color-label" />
      <span className="segment-description">
        {props.detail}
        {props.hasData ? (
          <InfoModal
            trigger={
              <Icon
                name="comments outline"
                color="teal"
                className="singlelog-icon-link"
                circular
                link
                inverted
              />
            }
            size="large"
            header="The Message"
            content={<PeekContent json={props.json} />}
            footer={<p className="info-modal-footer">Message Version: 1.0</p>}
          />
        ) : null}
      </span>
      <span className="segment-log-date">{props.date}</span>
      <Divider className="single-item-divider" />
    </div>
  )
}
