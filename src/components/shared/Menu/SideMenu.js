import React from 'react'
import { Menu } from 'semantic-ui-react'

import { MenuItem } from './MenuItem'

export const SideMenu = (props) => {
    const menuItemsSettings = [
        {name: "Home", icon: "home"},
        {name: "Participating Systems", icon: "database"},
        {name: "Message Type", icon: "comment outline"},
        {name: "Message Subscription", icon: "sitemap"},
        {name: "Notifications", icon: "tasks"},
        {name: "Settings", icon: "settings"}
    ]

    const MenuItems = menuItemsSettings.map(menuItemsSetting => {
        const path = '/' + menuItemsSetting.name.replace(/ /g, '-')
        return (
            <MenuItem
                key={menuItemsSetting.icon}
                name={menuItemsSetting.name}
                icon={menuItemsSetting.icon}
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