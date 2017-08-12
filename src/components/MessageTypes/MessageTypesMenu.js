import React from 'react'
import PropTypes from 'prop-types'

import { SecondaryMenu } from '../shared/Menu/SecondaryMenu'


export const MessaegTypesMenu = (props) => {

    return (
        <SecondaryMenu
            handleItemClick={props.handleSecondaryMenuItemClick}
            activeItem={props.activeItem}
            messageTypes={props.messageTypes}/>
    )
}

MessaegTypesMenu.propTypes = {
  handleSecondaryMenuItemClick: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
  messageTypes: PropTypes.array.isRequired
}