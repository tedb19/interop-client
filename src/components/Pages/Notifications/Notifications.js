import React, { Component } from "react";
import { Header, Grid, Input, Checkbox } from "semantic-ui-react";
import { MainContent } from "../../shared/Content/MainContent";
import { LogListing } from "./LogListing";
import {
  getLogs,
  getToggledLogs,
  getSearchedLogs,
  getQueuedMessage,
  getLogsCount
} from "../../../utils/data.utils";
import { PaginationMenu } from "./PaginationMenu";
import { CircularLoader } from "../../shared/Loader/CircularLoader";
import { AppLinks } from "../../shared/Content/AppLinks";

export class Notifications extends Component {
  state = {
    logs: null,
    pages: null,
    activeItem: "1",
    toggleErrors: false,
    time: new Date(),
    logCount: 0,
    queued: 0,
    sent: 0,
    peepClicked: false
  };

  // TODO: When there is a search term present, pass the new logs through the search term
  async componentDidMount() {
    const { data } = await getLogsCount();
    const logs = await getLogs(parseInt(this.state.activeItem, 10) - 1);
    //const newLogs = await this.getAllLogsAndMsgs(logs.result);
    this.setState({
      logs,
      pages: logs.pages,
      logCount: logs.count,
      sent: data.sent,
      queued: data.queued
    });
    setInterval(async () => {
      try {
        await this.checkLogUpdates();
      } catch (error) {
        console.error(error);
      }
    }, 2000);
  }

  checkLogUpdates = async () => {
    const { data } = await getLogsCount();
    if (data.queued !== this.state.queued || data.sent !== this.state.sent) {
      const logs = await getLogs(parseInt(this.state.activeItem, 10) - 1);
      //const newLogs = await this.getAllLogsAndMsgs(logs.result);
      this.setState({
        logs,
        pages: logs.pages,
        logCount: logs.count,
        sent: data.sent,
        queued: data.queued
      });
    }
  };

  handleItemClick = (e, { name }) => {
    this.state.toggleErrors
      ? getToggledLogs("WARNING", parseInt(name, 10) - 1)
          .then(logs => this.setState({ logs, pages: logs.pages }))
          .catch(console.error)
      : getLogs(parseInt(name, 10) - 1)
          .then(logs => this.setState({ logs, pages: logs.pages }))
          .catch(console.error);
  };

  handleToggle = (e, { checked }) => {
    this.setState({ toggleErrors: !this.state.toggleErrors, activeItem: "1" });
    const currentPage = 0;
    checked
      ? getToggledLogs("WARNING", currentPage)
          .then(logs => this.setState({ logs, pages: logs.pages }))
          .catch(console.error)
      : getLogs(currentPage)
          .then(logs => this.setState({ logs, pages: logs.pages }))
          .catch(console.error);
  };

  handleInputChange = evt => {
    if (evt.target.value) {
      if (evt.target.value.length < 3) return;

      getSearchedLogs(evt.target.value, 0)
        .then(logs => this.setState({ logs, pages: logs.pages }))
        .catch(console.error);
    } else {
      getLogs(parseInt(this.state.activeItem, 10) - 1)
        .then(logs => this.setState({ logs, pages: logs.pages }))
        .catch(console.error);
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
          <AppLinks hasSideMenu={false} />
        </Header>
        <MainContent>
          <Grid columns={2}>
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
