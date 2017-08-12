import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'

import { MenuItem } from './MenuItem'

export const SecondaryMenu = (props) => {

    const MenuItems = props.messageTypes.map(messageType => {
        return (
            <MenuItem
                key={messageType.name}
                name={messageType.name}
                handleItemClick={props.handleItemClick}
                activeItem={props.activeItem}/>
        )
    })

    return (
        <Menu icon='labeled' vertical pointing>
            {MenuItems}
        </Menu>
    )
}

SecondaryMenu.propTypes = {
  messageTypes: PropTypes.array.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired
}
