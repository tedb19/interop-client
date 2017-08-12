import React from 'react'
import { Menu } from 'semantic-ui-react'

import { MenuItem } from './MenuItem'

export const SideMenu = (props) => {
    const menuItemsSettings = [
        {name: "Home", icon: "home"},
        {name: "Message Subscription", icon: "sitemap"},
        {name: "Message Type", icon: "comment outline"},
        {name: "Entities", icon: "database"},
        {name: "Settings", icon: "settings"}
    ]

    const MenuItems = menuItemsSettings.map(menuItemsSetting => {
        return (
            <MenuItem
                key={menuItemsSetting.icon}
                name={menuItemsSetting.name}
                icon={menuItemsSetting.icon}
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