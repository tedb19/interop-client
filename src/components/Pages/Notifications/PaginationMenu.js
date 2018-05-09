import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'

export const PaginationMenu = props => {
  const MAX_PAGES = 10
  const currentPages = props.pages > MAX_PAGES ? MAX_PAGES : props.pages
  const itemNumbers = Array(currentPages)
    .fill(1)
    .map((x, y) => x + y)
  const MenuItems = itemNumbers.map(menuItem => (
    <Menu.Item
      key={menuItem}
      name={menuItem.toString()}
      active={props.activeItem === menuItem.toString()}
      onClick={props.handleItemClick}
    />
  ))

  return (
    <div>
      <Icon name="angle double left" />
      <Menu pagination inverted>
        {MenuItems}
      </Menu>
      <Icon name="angle double right" />
    </div>
  )
}
