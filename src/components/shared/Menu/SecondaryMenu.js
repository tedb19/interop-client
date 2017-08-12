import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'

import { MenuItem } from './MenuItem'

export const SecondaryMenu = (props) => {

    const MenuItems = props.data.map(dataItem => {
        const slash = '/'
        const path = slash + props.mainMenu + slash + dataItem.name.replace(/ /g, '-')
        return (
            <MenuItem
                key={dataItem.name}
                name={dataItem.name}
                to={path}
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
  data: PropTypes.array.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
  mainMenu: PropTypes.string.isRequired
}
