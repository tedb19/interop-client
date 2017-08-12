import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Entities  from '../Pages/Entities/Entities'
import { Home } from '../Pages/Home'
import { MessageSubscription } from '../Pages/MessageSubscription'
import MessageTypes from '../Pages/MessageTypes/MessageTypes'
import { Settings } from '../Pages/Settings'

export const Main = () => (
    <Switch>
      <Route exact path='/Home' component={Home}/>
      <Route path='/Message-Subscription' component={MessageSubscription}/>
      <Route path='/Message-Type' component={MessageTypes}/>
      <Route path='/Entities' component={Entities}/>
      <Route path='/Settings' component={Settings}/>
    </Switch>
)