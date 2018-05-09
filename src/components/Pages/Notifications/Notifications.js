import React, { Component } from 'react'
import { Header, Grid, Input, Checkbox } from 'semantic-ui-react'
import { MainContent } from '../../shared/Content/MainContent'
import { LogListing } from './LogListing'
import {
  getLogs,
  getToggledLogs,
  getSearchedLogs,
  getQueuedMessage,
  getLogsCount
} from '../../../utils/data.utils'
import { PaginationMenu } from './PaginationMenu'
import { CircularLoader } from '../../shared/Loader/CircularLoader'

export class Notifications extends Component {
  state = {
    logs: null,
    pages: null,
    activeItem: '1',
    toggleErrors: false,
    time: new Date()
  }

  async componentDidMount() {
    const logs = await getLogs(parseInt(this.state.activeItem, 10) - 1)
    const newLogs = await this.getAllLogsAndMsgs(logs.result)
    this.setState({ logs: newLogs, pages: logs.pages })

    setInterval(async () => {
      try {
        await this.checkLogUpdates()
      } catch (error) {
        console.error(error)
      }
    }, 5000)
  }

  checkLogUpdates = async () => {
    const { data } = await getLogsCount()
    if (data.queued !== this.state.queued || data.sent !== this.state.sent) {
      const logs = await getLogs(parseInt(this.state.activeItem, 10) - 1)
      const newLogs = await this.getAllLogsAndMsgs(logs.result)

      this.setState({
        logs: newLogs,
        pages: logs.pages,
        logCount: logs.count,
        sent: data.sent,
        queued: data.queued
      })
    }
  }

  handleItemClick = async (e, { name }) => {
    if (this.state.toggleErrors) {
      const logs = await getToggledLogs('WARNING', parseInt(name, 10) - 1)
      const newLogs = await this.getAllLogsAndMsgs(logs.result)
      this.setState({ logs: newLogs, pages: logs.pages })
    } else {
      const logs = await getLogs(parseInt(name, 10) - 1)
      const newLogs = await this.getAllLogsAndMsgs(logs.result)
      this.setState({ logs: newLogs, pages: logs.pages })
    }
  }

  handleToggle = async (e, { checked }) => {
    this.setState({ toggleErrors: !this.state.toggleErrors, activeItem: '1' })
    const currentPage = 0
    if (checked) {
      const logs = await getToggledLogs('WARNING', currentPage)
      const newLogs = await this.getAllLogsAndMsgs(logs.result)
      this.setState({ logs: newLogs, pages: logs.pages })
    } else {
      const logs = await getLogs(currentPage)
      const newLogs = await this.getAllLogsAndMsgs(logs.result)
      this.setState({ logs: newLogs, pages: logs.pages })
    }
  }

  handleInputChange = async evt => {
    if (evt.target.value) {
      if (evt.target.value.length < 3) return
      const logs = await getSearchedLogs(evt.target.value, 0)
      const newLogs = await this.getAllLogsAndMsgs(logs.result)
      this.setState({ logs: newLogs, pages: logs.pages })
    } else {
      const logs = await getLogs(parseInt(this.state.activeItem, 10) - 1)
      const newLogs = await this.getAllLogsAndMsgs(logs.result)
      this.setState({ logs: newLogs, pages: logs.pages })
    }
  }

  getAllLogsAndMsgs = async logs => {
    let newLogs = []
    for (let log of logs) {
      const json = await getQueuedMessage(log.QueueId)
      let newLog = { ...log, json }
      newLogs.push(newLog)
    }
    return newLogs
  }

  render() {
    const logArea = this.state.logs ? (
      <LogListing logs={this.state.logs} updateDate={this.state.time} />
    ) : (
      <CircularLoader />
    )
    return (
      <div>
        <Header as="h2" className="sub-header-text">
          Notifications
        </Header>
        <MainContent>
          <Grid columns={3}>
            <Grid.Column width={16} />
            <Grid.Column width={16}>
              <Checkbox
                className="notifications-toggle-errors"
                toggle
                checked={this.state.toggleErrors}
                label="toggle queued"
                onChange={this.handleToggle}
              />
              <Input
                icon="search"
                placeholder="Search..."
                className="notifications-search-input"
                onChange={this.handleInputChange}
              />
            </Grid.Column>
            <Grid.Column width={16} className="notifications-content-area">
              <PaginationMenu
                pages={this.state.pages}
                handleItemClick={this.handleItemClick}
                activeItem={this.state.activeItem}
              />
              {logArea}
            </Grid.Column>
          </Grid>
        </MainContent>
      </div>
    )
  }
}
