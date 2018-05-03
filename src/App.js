import React, { Component } from "react";
import "./App.css";
import { withRouter } from "react-router";
import { Grid, Divider } from "semantic-ui-react";
import { HeaderGrid } from "./components/shared/Header/HeaderGrid";
import { Main } from "./components/Routes/Main";
import { SideMenu } from "./components/shared/Menu/SideMenu";
import { getData, getFacility } from "./utils/data.utils";
import { Login } from "./components/Pages/Login/Login";

class App extends Component {
  state = {
    ActiveMenuItem: "Home",
    facility: "",
    userId: localStorage.getItem("userId")
  };

  componentDidMount() {
    const contexts = [
      "entities",
      "messagetypes",
      "subscribers",
      "entitysubscriptions"
    ];
    let activeItem =
      this.props.location.pathname.split("/").filter(path => path)[0] || "Home";
    activeItem = activeItem.replace(/-/g, " ");
    this.setState({ ActiveMenuItem: activeItem });
    Promise.all(contexts.map(getData));
    getFacility()
      .then(facility => this.setState({ facility }))
      .catch(error => console.log("Error fetching facility:", error));

    this.setState({ userId: localStorage.getItem("userId") });
  }

  componentDidUpdate() {
    if (this.state.userId !== localStorage.getItem("userId"))
      this.setState({ userId: localStorage.getItem("userId") });
  }

  updateUserId = () => {
    this.setState({ userId: localStorage.getItem("userId") });
  };

  handleMainMenuItemClick = (e, { name }) =>
    this.setState({ ActiveMenuItem: name });

  handleSecondaryMenuItemClick = (e, { name }) =>
    this.setState({ ActiveSecondaryMenuItem: name });

  render() {
    return parseInt(this.state.userId, 10) ? (
      <Grid columns={5}>
        <HeaderGrid facility={this.state.facility} />
        <Divider />
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={2} className="main-menu">
            <SideMenu
              handleItemClick={this.handleMainMenuItemClick}
              activeItem={this.state.ActiveMenuItem}
            />
          </Grid.Column>
          <Grid.Column width={13}>
            <Main />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) : (
      <Login updateUserId={this.updateUserId} />
    );
  }
}

export default withRouter(App);
