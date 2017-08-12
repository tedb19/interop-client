import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Menu } from 'semantic-ui-react'

export const MenuItem = (props) => {
    return (
        <Menu.Item name={props.name} active={props.activeItem === props.name} onClick={props.handleItemClick}>
            {props.icon ? <Icon name={props.icon} /> : ''}
            {props.name}
        </Menu.Item>
    )
}

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  icon: PropTypes.string
}
