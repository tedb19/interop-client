import React, { Component } from "react";
import { Header, Grid, Divider, Input, Checkbox } from "semantic-ui-react";
import { MainContent } from "../../shared/Content/MainContent";
import { LogListing } from "./LogListing";
import {
  getLogs,
  getToggledLogs,
  getSearchedLogs,
  getQueuedMessage
} from "../../../utils/data.utils";
import { PaginationMenu } from "./PaginationMenu";
import { CircularLoader } from "../../shared/Loader/CircularLoader";

export class Notifications extends Component {
  state = {
    logs: null,
    pages: null,
    activeItem: "1",
    toggleErrors: false,
    time: new Date()
  };

  componentWillMount() {
    getLogs(parseInt(this.state.activeItem, 10) - 1)
      .then(logs => this.getAllLogsAndMsgs(logs.result))
      .then(newLogs => this.setState({ logs: newLogs, pages: newLogs.pages }))
      .catch(console.log);
  }

  handleItemClick = (e, { name }) => {
    this.state.toggleErrors
      ? getToggledLogs("WARNING", parseInt(name, 10) - 1)
          .then(logs => this.getAllLogsAndMsgs(logs.result))
          .then(newLogs =>
            this.setState({ logs: newLogs, pages: newLogs.pages })
          )
          .catch(console.log)
      : getLogs(parseInt(name, 10) - 1)
          .then(logs => this.getAllLogsAndMsgs(logs.result))
          .then(newLogs =>
            this.setState({ logs: newLogs, pages: newLogs.pages })
          )
          .catch(console.log);
  };

  handleToggle = (e, { checked }) => {
    this.setState({ toggleErrors: !this.state.toggleErrors, activeItem: "1" });
    const currentPage = 0;
    checked
      ? getToggledLogs("WARNING", currentPage)
          .then(logs => this.getAllLogsAndMsgs(logs.result))
          .then(newLogs =>
            this.setState({ logs: newLogs, pages: newLogs.pages })
          )
          .catch(console.log)
      : getLogs(currentPage)
          .then(logs => this.getAllLogsAndMsgs(logs.result))
          .then(newLogs =>
            this.setState({ logs: newLogs, pages: newLogs.pages })
          )
          .catch(console.log);
  };

  handleInputChange = evt => {
    if (evt.target.value) {
      if (evt.target.value.length < 3) return;

      getSearchedLogs(evt.target.value, 0)
        .then(logs => this.getAllLogsAndMsgs(logs.result))
        .then(newLogs => this.setState({ logs: newLogs, pages: newLogs.pages }))
        .catch(console.log);
    } else {
      getLogs(parseInt(this.state.activeItem, 10) - 1)
        .then(logs => this.getAllLogsAndMsgs(logs.result))
        .then(newLogs => this.setState({ logs: newLogs, pages: newLogs.pages }))
        .catch(console.log);
    }
  };

  getAllLogsAndMsgs = async logs => {
    let newLogs = [];
    for (let log of logs) {
      const json = await getQueuedMessage(log.QueueId);
      let newLog = { ...log, json };
      newLogs.push(newLog);
    }
    return newLogs;
  };

  render() {
    const logArea = this.state.logs ? (
      <LogListing logs={this.state.logs} updateDate={this.state.time} />
    ) : (
      <CircularLoader />
    );

    return (
      <div>
        <Header as="h2" className="sub-header-text">
          Notifications
        </Header>
        <MainContent>
          <Grid columns={3}>
            <Grid.Column width={16}>
              <Header as="h3" className="stats-header">
                IL Notifications:
              </Header>
              <Divider />
            </Grid.Column>
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
    );
  }
}
