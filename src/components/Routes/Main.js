import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Settings,
  Home,
  Entities,
  MessageSubscription,
  MessageTypes,
  Notifications
} from "../Pages";

export const Main = () => (
  <Switch>
    <Route exact path="/Home" component={Home} />
    <Route exact path="/" component={Home} />
    <Route path="/Message-Subscription" component={MessageSubscription} />
    <Route path="/Message-Type/:name?" component={MessageTypes} />
    <Route path="/Participating-Systems/:name?" component={Entities} />
    <Route path="/Settings" component={Settings} />
    <Route path="/Notifications" component={Notifications} />
  </Switch>
);
