import { Label, List } from 'semantic-ui-react'

export const LabelList = () => (
  <List divided selection>
    <List.Item>
      <Label color='red' horizontal>Fruit</Label>
      Kumquats
    </List.Item>
    <List.Item>
      <Label color='purple' horizontal>Candy</Label>
      Ice Cream
    </List.Item>
    <List.Item>
      <Label color='red' horizontal>Fruit</Label>
      Orange
    </List.Item>
    <List.Item>
      <Label horizontal>Dog</Label>
      Poodle
    </List.Item>
  </List>
)