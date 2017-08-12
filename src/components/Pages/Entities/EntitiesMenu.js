import React from 'react'
import PropTypes from 'prop-types'

import { SecondaryMenu } from '../../shared/Menu/SecondaryMenu'


export const EntitiesMenu = (props) => {

    return (
        <SecondaryMenu
            handleItemClick={props.handleEntityMenuItemClick}
            activeItem={props.activeItem}
            data={props.entities}
            mainMenu="Entities"/>
    )
}

EntitiesMenu.propTypes = {
  handleEntityMenuItemClick: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
  entities: PropTypes.array.isRequired
}
