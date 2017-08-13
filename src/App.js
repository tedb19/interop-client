import React, { Component } from 'react'
import './App.css'
import { Grid, Divider } from 'semantic-ui-react'
import { HeaderGrid } from './components/shared/Header/HeaderGrid'
import { Main } from './components/Routes/Main'
import { SideMenu} from './components/shared/Menu/SideMenu'

class App extends Component {
  state = { 
    ActiveMenuItem: 'Home'
  }

  handleMainMenuItemClick = (e, { name }) => this.setState({ ActiveMenuItem: name} )

  handleSecondaryMenuItemClick = (e, { name }) => this.setState({ ActiveSecondaryMenuItem: name} )

  render() {
    return (
        <Grid columns={5}>
          <HeaderGrid/>
          <Divider/>
          <Grid.Row>
              <Grid.Column width={1}></Grid.Column>
              <Grid.Column width={2} className="main-menu">
                  <SideMenu
                      handleItemClick={this.handleMainMenuItemClick}
                      activeItem={this.state.ActiveMenuItem}/>
              </Grid.Column>
              <Grid.Column width={13}>
                <Main/>
              </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

export default App