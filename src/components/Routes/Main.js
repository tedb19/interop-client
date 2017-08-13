import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Settings, Home, Entities, MessageSubscription, MessageTypes } from '../Pages'

export const Main = () => (
    <Switch>
      <Route exact path='/Home' component={Home}/>
      <Route exact path='/' component={Home}/>
      <Route path='/Message-Subscription' component={MessageSubscription}/>
      <Route path='/Message-Type' component={MessageTypes}/>
      <Route path='/Entities' component={Entities}/>
      <Route path='/Settings' component={Settings}/>
    </Switch>
)