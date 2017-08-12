import React, { Component } from 'react'
import './App.css'
import { Grid, Divider } from 'semantic-ui-react'
import { HeaderGrid} from './components/shared/Header/HeaderGrid'
import { MainContentGrid } from './components/shared/main-area/MainContentGrid'
import {tempData } from './TempData'

class App extends Component {
  state = { 
    ActiveMenuItem: 'Home', 
    ActiveSecondaryMenuItem: 'Patient Registration (ADT^A04)',
    SecondaryMenuData: tempData().messageTypes
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