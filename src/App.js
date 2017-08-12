import React, { Component } from 'react'
import './App.css'
import { Grid, Divider } from 'semantic-ui-react'
import { HeaderGrid } from './components/shared/Grid/HeaderGrid'
import { MainContentGrid } from './components/shared/Grid/MainContentGrid'
import { messageTypesSecondaryMenuData, DefaultMessageTypeForMenu } from './utils/data.utils'

class App extends Component {
  state = { 
    ActiveMenuItem: 'Home', 
    ActiveSecondaryMenuItem: DefaultMessageTypeForMenu().name,
    SecondaryMenuData: messageTypesSecondaryMenuData()
  }

  handleMainMenuItemClick = (e, { name }) => this.setState({ ActiveMenuItem: name} )

  handleSecondaryMenuItemClick = (e, { name }) => this.setState({ ActiveSecondaryMenuItem: name} )

  render() {
    return (
      <Grid columns={2}>
        <HeaderGrid/>
        <Divider/>
        <MainContentGrid
          handleMainMenuItemClick={this.handleMainMenuItemClick}
          handleSecondaryMenuItemClick={this.handleSecondaryMenuItemClick}
          ActiveMenuItem={this.state.ActiveMenuItem}
          ActiveSecondaryMenuItem={this.state.ActiveSecondaryMenuItem}
          SecondaryMenuData={this.state.SecondaryMenuData}
          />
      </Grid>
    );
  }
}

export default App