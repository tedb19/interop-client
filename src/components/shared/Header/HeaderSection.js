import React from 'react'
import logo from './logo.svg'
import { Container, Header } from 'semantic-ui-react'

export const HeaderSection = () => (
  <Container className="header-section">
    <Header as='h1' className="header-text">
      <img src={logo} className="App-logo" alt="logo" /> 
        IL Manager
      <span className="facility-name"> (Test Hospital)</span>
    </Header>
  </Container>
)