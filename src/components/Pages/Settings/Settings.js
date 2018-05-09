import React, { Component } from 'react'
import { Header, Segment, Label, Divider, Icon } from 'semantic-ui-react'
import { MainContent } from '../../shared/Content/MainContent'
import { config } from '../../../utils/config.util'
import { SingleSetting } from './SingleSetting'
import { Link } from 'react-router-dom'
import { NewSettingsForm } from './NewSettingsForm'
import { getSettings, updateSetting } from '../../../utils/data.utils'
import { AppLinks } from '../../shared/Content/AppLinks'

export class Settings extends Component {
  state = {
    newSettingsModalOpen: false,
    NewSettingsInputVisible: false,
    ShowNewSettingsMessage: false,
    ShowSettingsMessage: false,
    currentSetting: {
      value: '',
      description: 'Test setting',
      isUpdatable: true
    },
    settingsErrorMessage: '',
    value: '',
    settings: []
  }

  ListItems = () => {
    return this.state.settings.length
      ? this.state.settings.map((dataItem, idx) => {
          let value = ''
          if (dataItem.description.toLowerCase().includes('password')) {
            if (dataItem.value) {
              value = '**********'
            } else {
              value = ''
            }
          } else {
            value = dataItem.value
          }
          return (
            <SingleSetting
              key={Math.random()}
              color={config.colors[idx]}
              onDismiss={this.handleDismiss}
              errorMessage={this.state.settingsErrorMessage}
              handleEmptySubmit={this.handleEmptySubmit}
              handleNewSettingsSubmit={this.handleNewSettingsSubmit}
              handleValueChange={this.handleInputChange}
              value={value}
              description={dataItem.description}
              isEditable={dataItem.isUpdatable}
              handleClick={this.handleNewSettingsModalOpen}
              handleNewSettingsClose={this.handleNewSettingsClose}
              newSettingsModalOpen={this.state.newSettingsModalOpen}
              lastUpdated={this.state.currentSetting.lastUpdated}
            />
          )
        })
      : null
  }

  handleInputChange = evt => {
    const name = evt.target.name
    console.log('name', name)
    this.setState({
      [name]: evt.target.value
    })
  }

  handleSettingsValueChange = evt => {
    this.setState({ value: evt.target.value })
  }

  handleDescriptionChange = (evt, data) => {
    const setting = this.state.settings.find(setting => setting.description === data.value)
    this.setState({
      currentSetting: {
        ...this.state.currentSetting,
        description: data.value,
        value: setting.value ? setting.value : ''
      }
    })
  }

  handleValueChange = evt => {
    this.setState({
      currentSetting: {
        ...this.state.currentSetting,
        value: evt.target.value
      }
    })
  }

  handleNewSettingsModalOpen = (evt, data) => {
    this.setState({ newSettingsModalOpen: true })
  }

  handleEmptySubmit = evt => {
    evt.preventDefault()
    this.setState({
      errorMessage: true
    })
    this.handleDismiss()
  }

  handleNewSettingsSubmit = async (evt, value) => {
    const setting = this.state.settings.find(
      setting1 => setting1.description === this.state.currentSetting.description
    )
    await updateSetting({ ...setting, value: this.state.currentSetting.value })
    const settings = await getSettings()
    console.log('new', settings)
    this.setState({ settings })
    this.handleInfoOnDismiss()
    this.handleNewSettingsClose()
  }

  handleInfoOnDismiss = () => {
    setTimeout(() => {
      this.setState({ ShowNewSettingsMessage: false })
    }, 5000)
  }

  handleDismiss = () => {
    setTimeout(() => {
      this.setState({ errorMessage: false })
    }, 3000)
  }

  async componentDidMount() {
    const settings = await getSettings()
    this.setState({ settings })
  }

  handleNewSettingsClose = () => this.setState({ newSettingsModalOpen: false })

  handleNewSettingsOpen = () => this.setState({ newSettingsModalOpen: true })

  newSettingsModal = () => {
    const submitHandler =
      !this.state.currentSetting.value || !this.state.currentSetting.description
        ? this.handleEmptySubmit
        : this.handleNewSettingsSubmit

    const updateSettingsLink = (
      <Link to="#" onClick={this.handleNewSettingsOpen} className="settings-update-link">
        Update Settings
        <Icon name="write" color="teal" link className="setting-value-icon" size="small" />
      </Link>
    )

    return (
      <NewSettingsForm
        trigger={updateSettingsLink}
        onDismiss={this.handleDismiss}
        options={this.state.settings
          .filter(setting => setting.isUpdatable)
          .map(updatableSetting => ({
            key: updatableSetting.description,
            text: updatableSetting.description,
            value: updatableSetting.description
          }))}
        errorMessage={this.state.settingsErrorMessage}
        handleSubmit={submitHandler}
        handleValueChange={this.handleValueChange}
        handleDescriptionChange={this.handleDescriptionChange}
        value={this.state.currentSetting.value}
        description={this.state.currentSetting.description}
        handleClose={this.handleNewSettingsClose}
        newSettingsModalOpen={this.state.newSettingsModalOpen}
        lastUpdated={this.state.currentSetting.lastUpdated}
      />
    )
  }
  //TODO: On updating setting, its not updated automatically on settings page or facility header banner
  render() {
    const settingsListing = this.ListItems()
    const newSettings = this.newSettingsModal()
    return (
      <div>
        <Header as="h2" className="sub-header-text">
          Settings
          <AppLinks hasSideMenu={false} />
        </Header>
        <MainContent>
          {newSettings}
          <Segment inverted className="segment-subscriptions">
            <Label className="stats-sub-header-left">Description</Label>
            <Label className="stats-sub-header-right">Value</Label>
            <Divider className="stats-divider" />
            {settingsListing}
          </Segment>
        </MainContent>
      </div>
    )
  }
}
