import React, { Component} from 'react'
import { Header, Grid, Divider, Dimmer, Loader, Input, Checkbox } from 'semantic-ui-react'
import { MainContent } from '../../shared/Content/MainContent'
import { LogListing } from './LogListing'
import { getLogs, getToggledLogs, getSearchedLogs } from '../../../utils/data.utils'
import { PaginationMenu } from './PaginationMenu'

export class Notifications extends Component {

    state = {
        logs: null,
        pages: null,
        activeItem: '1',
        toggleErrors: true,
        time: new Date()
    }

    componentWillMount() {
        getLogs(parseInt(this.state.activeItem, 10) - 1)
            .then(logs => this.setState({ logs: logs.result, pages: logs.pages }))
            .catch(error => console.log(error))
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
        !this.state.toggleErrors 
            ? getToggledLogs('ERROR', parseInt(this.state.activeItem, 10) - 1)
                .then(logs => this.setState({ logs: logs.result, pages: logs.pages }))
                .catch(error => console.log(error))
            : getLogs(parseInt(this.state.activeItem, 10) - 1)
                .then(logs => this.setState({ logs: logs.result, pages: logs.pages }))
                .catch(error => console.log(error))
    }

    handleToggle = (e, { value }) => {
        this.setState({ toggleErrors: !this.state.toggleErrors })
        value 
            ? getToggledLogs('ERROR', parseInt(this.state.activeItem, 10) - 1)
                .then(logs => this.setState({ logs: logs.result, pages: logs.pages }))
                .catch(error => console.log(error))
            : getLogs(parseInt(this.state.activeItem, 10) - 1)
                .then(logs => this.setState({ logs: logs.result, pages: logs.pages }))
                .catch(error => console.log(error))
    }

    handleInputChange = (evt) => {
        if(evt.target.value){
            if(evt.target.value.length < 3) return
            
            getSearchedLogs(evt.target.value, 0)
                .then(logs => this.setState({ logs: logs.result, pages: logs.pages }))
                .catch(error => console.log(error))
        } else {
            getLogs(parseInt(this.state.activeItem, 10) - 1)
                .then(logs => this.setState({ logs: logs.result, pages: logs.pages }))
                .catch(error => console.log(error))
        }
    }

    render() {
        const loader = (
            <Dimmer active>
                <Loader>Loading...</Loader>
            </Dimmer>
        )
        const logArea = this.state.logs ?
            <LogListing logs={this.state.logs} updateDate={this.state.time}/>
            : loader
        
         return  (
            <div>
                <Header as='h2' className="sub-header-text">Notifications</Header>
                <MainContent>
                     <Grid columns={3}>
                        <Grid.Column width={16}>
                            <Header as='h3' className="stats-header">IL Notifications:</Header>
                            <Divider/>
                        </Grid.Column>
                        <Grid.Column width={16}>
                            <Checkbox 
                                className="notifications-toggle-errors" 
                                toggle 
                                value={this.state.toggleErrors}
                                label='toggle errors'
                                onChange={this.handleToggle} />
                            <Input 
                                icon='search' 
                                placeholder='Search...' 
                                className="notifications-search-input"
                                onChange={this.handleInputChange} />
                        </Grid.Column>
                        <Grid.Column width={16} className="notifications-content-area">
                            <PaginationMenu
                                pages={this.state.pages}
                                handleItemClick={this.handleItemClick}
                                activeItem={this.state.activeItem}/>
                            {logArea}
                        </Grid.Column>
                    </Grid>
                </MainContent>
            </div>
        )
    }
}