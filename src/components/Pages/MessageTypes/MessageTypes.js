import React, { Component } from "react";
import { Link } from "react-router-dom";
import titleCase from "title-case";
import { Header, Grid, Container, Table, Message } from "semantic-ui-react";
import { MessageTypesMenu } from "./MessageTypesMenu";
import { MoreInfo } from "../../shared/Content/MoreInfo";
import { Detail } from "../../shared/Content/Detail";
import { TableRow } from "../../shared/Table/TableRow";
import { StatusLabel } from "../../shared/Misc/StatusLabel";
import { InfoModal } from "../../shared/Modal/InfoModal";
import { FormModal } from "./FormModal";
import ReactJson from "react-json-view";
import { CircularLoader } from "../../shared/Loader/CircularLoader";
import {
  saveStat,
  messageTypesSecondaryMenuData,
  getMessageTypeObj,
  entitiesSubscribedTo,
  addMessageType
} from "../../../utils/data.utils";

export class MessageTypes extends Component {
  state = {
    ActiveMessageTypeMenuItem: this.props.match.params.name || null,
    MessageTypeMenuData: null,
    messageType: null,
    ShowNewMessage: false,
    entities: [],
    name: "",
    modalOpen: false,
    verboseName: "",
    description: ""
  };

  async componentDidMount() {
    const secMenuData = await messageTypesSecondaryMenuData();
    const activeMenuItem = secMenuData.find((msgType, idx) => idx === 0);
    const currentPage = this.props.match.params.name || activeMenuItem.name;
    const [messageType, entities] = await Promise.all([
      getMessageTypeObj(currentPage),
      entitiesSubscribedTo(currentPage)
    ]);
    this.setState({
      MessageTypeMenuData: secMenuData,
      messageType,
      entities,
      ActiveMessageTypeMenuItem: activeMenuItem.name
    });
  }

  handleMessageTypeMenuItemClick = async (e, { name }) => {
    const [messageType, entities] = await Promise.all([
      getMessageTypeObj(name),
      entitiesSubscribedTo(name)
    ]);
    this.setState({
      messageType,
      entities,
      ActiveMessageTypeMenuItem: name
    });
  };

  handleInputChange = evt => {
    const name = evt.target.name;
    this.setState({
      [name]: evt.target.value
    });
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleInfoOnDismiss = () => {
    setTimeout(() => {
      this.setState({ ShowNewMessage: false });
    }, 5000);
  };

  handleEmptySubmit = evt => {
    evt.preventDefault();
    this.setState({
      errorMessage: true
    });
    this.handleDismiss();
  };

  handleSubmit = (evt, value) => {
    const messageTYpe = {
      description: this.state.description,
      name: this.state.name.toUpperCase(),
      verboseName: this.state.verboseName.toUpperCase().replace(/ /g, "_")
    };

    const stat = {
      name: `${this.state.verboseName
        .toUpperCase()
        .replace(/ /g, "_")}_MESSAGETYPE`,
      value: "0",
      description: ""
    };
    addMessageType(messageTYpe)
      .then(messageTypes =>
        Promise.all([messageTypesSecondaryMenuData(), saveStat(stat)])
      )
      .then(([secMenuData, stat]) => {
        this.setState({
          MessageTypeMenuData: secMenuData,
          modalOpen: false,
          ShowNewMessage: true,
          ActiveMessageTypeMenuItem: `${titleCase(
            messageTYpe.verboseName.replace(/_/g, " ")
          )}`
        });
        this.handleInfoOnDismiss();
      })
      .catch(console.log);
  };

  handleDismiss = () => {
    setTimeout(() => {
      this.setState({ errorMessage: false });
    }, 4000);
  };

  handleClose = () => this.setState({ modalOpen: false });

  messageTypeTable = () => {
    const data = this.state.messageType;
    const TableRows = [];
    for (var item in data) {
      if (["id", "color", "createdAt", "updatedAt", "template"].includes(item))
        continue;
      if (item === "status") {
        const status =
          data[item] === "ACTIVE"
            ? StatusLabel("green", data[item])
            : StatusLabel("red", data[item]);
        TableRows.push(
          <TableRow
            key={item}
            name={titleCase(item)}
            value={data[item] ? status : "Not specified"}
          />
        );
      } else if (item === "verboseName") {
        TableRows.push(
          <TableRow
            key={item}
            name={titleCase(item)}
            value={titleCase(data[item].replace(/_/g, " "))}
          />
        );
      } else {
        TableRows.push(
          <TableRow
            key={item}
            name={titleCase(item)}
            value={data[item] ? data[item] : "Not specified"}
          />
        );
      }
    }
    return (
      <Table celled striped>
        <Table.Body>{TableRows}</Table.Body>
      </Table>
    );
  };

  jsonContent = () => {
    let json = "";
    if (!this.state.ActiveMessageTypeMenuItem)
      return <Container>Message sample has not been uploaded</Container>;

    try {
      json = this.state.messageType.template.includes("<?xml version") ? (
        <Container>
          <p>{this.state.messageType.template.replace(/>/g, ">\n")}</p>
        </Container>
      ) : (
        <ReactJson
          src={JSON.parse(this.state.messageType.template)}
          theme="monokai"
          name="message"
          iconStyle="triangle"
          enableClipboard={true}
          style={{ padding: "25px", fontFamily: "sans-serif" }}
          displayDataTypes={true}
        />
      );
    } catch (err) {
      json = <Container>Message sample has not been uploaded</Container>;
    }
    return json;
  };

  infoModal = () => {
    if (this.state.messageType) {
      const messageExample = <Link to="#">view message</Link>;
      const messageFooter = (
        <p className="info-modal-footer">Message Version: 1.0</p>
      );
      const jsonContent = this.jsonContent();
      return (
        <InfoModal
          trigger={messageExample}
          size="large"
          header={titleCase(this.state.messageType.verboseName) + " Message:"}
          content={jsonContent}
          footer={messageFooter}
        />
      );
    } else {
      return null;
    }
  };

  formModal = () => {
    const submitHandler =
      !this.state.name || !this.state.verboseName || !this.state.description
        ? this.handleEmptySubmit
        : this.handleSubmit;
    const newMsgType = (
      <Link to="#" onClick={this.handleOpen}>
        New Message Type
      </Link>
    );
    return (
      <FormModal
        trigger={newMsgType}
        size="large"
        onDismiss={this.handleDismiss}
        errorMessage={this.state.errorMessage}
        handleSubmit={submitHandler}
        handleNameChange={this.handleInputChange}
        handleDescriptionChange={this.handleInputChange}
        handleVerboseNameChange={this.handleInputChange}
        name={this.state.name}
        verboseName={this.state.verboseName}
        description={this.state.description}
        handleClose={this.handleClose}
        modalOpen={this.state.modalOpen}
      />
    );
  };

  messages = () => {
    const newMessageTypeDetails = {
      header: "New Message Type Added:",
      content: `${
        this.state.verboseName
      } message type has been added successfully! Systems can now subscribe to this message type`
    };
    if (this.state.ShowNewMessage) {
      return (
        <Message
          header={newMessageTypeDetails.header}
          content={newMessageTypeDetails.content}
          icon="info circle"
          color="teal"
          onDismiss={this.handleInfoOnDismiss}
          info={true}
          size="small"
        />
      );
    } else {
      return null;
    }
  };

  render() {
    const tableRows = this.state.messageType ? (
      this.messageTypeTable()
    ) : (
      <CircularLoader />
    );
    const infoModal = this.infoModal();
    const formModal = this.formModal();
    const messages = this.messages();

    return (
      <Grid columns={13}>
        <Grid.Column width={3}>
          <Header as="h2" className="sub-header-text">
            Message Types
          </Header>
          {this.state.MessageTypeMenuData ? (
            <MessageTypesMenu
              handleMessageTypeMenuItemClick={
                this.handleMessageTypeMenuItemClick
              }
              activeItem={this.state.ActiveMessageTypeMenuItem}
              messageTypes={this.state.MessageTypeMenuData}
            />
          ) : (
            <CircularLoader />
          )}
          <br />
          <span>{formModal}</span>
        </Grid.Column>
        <Grid.Column width={10} className="content-area">
          <Detail
            heading="Message Type Overview"
            data={tableRows}
            messages={messages}
            updateLink={infoModal}
            additionalDetails={null}
            moreInfoHeading={`Message Type Subscriptions:`}
          >
            <MoreInfo
              heading="Systems subscribed to this message type:"
              data={this.state.entities}
              addLinkUrl="#"
              addLinkText="Add subscription"
              leftSubheading="Systems"
            />
          </Detail>
        </Grid.Column>
      </Grid>
    );
  }
}
