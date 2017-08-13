import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import titleCase from 'title-case'

import { Header, Grid } from 'semantic-ui-react'
import { EntitiesMenu } from './EntitiesMenu'
import { MoreInfo } from '../../shared/Content/MoreInfo'
import { Detail } from '../../shared/Content/Detail'
import { TableRow } from '../../shared/Table/TableRow'
import { StatusLabel } from '../../shared/Misc/StatusLabel'

import { DefaultEntityForMenu, entitiesSecondaryMenuData, getEntityObj } from '../../../utils/data.utils'

class Entities extends Component {

    state = {
        ActiveEntityMenuItem: DefaultEntityForMenu().name,
        EntityMenuData: entitiesSecondaryMenuData()
    }

    handleEntityMenuItemClick = (e, { name }) => this.setState({ ActiveEntityMenuItem: name} )

    render() {
        const data = getEntityObj(this.state.ActiveEntityMenuItem)
        const addLinkUrl = `/Entities/${this.state.ActiveEntityMenuItem.replace(/ /g,'-')}/Subscribe-To-Message-Type`
        const TableRows = []

        for(var item in data){
            if(item === 'id') continue
            if(item === 'status'){
                const status = data[item] === 'ACTIVE' ? StatusLabel('green', data[item]) : StatusLabel('red', data[item])
                TableRows.push(<TableRow key={item} name={titleCase(item)} value={data[item] ? status : 'Not specified'}/>)
            } else {
                TableRows.push(<TableRow key={item} name={titleCase(item)} value={data[item] ? data[item] : 'Not specified'}/>)
            }
        }
        
        const updateLink = <Link to='/update-entity'>Update entity details</Link>
        const unsubscribeLink = (name) => `/Entities/${this.state.ActiveEntityMenuItem}/Subscription/${name}/Unsubscribe`
        const messageTypes = [
            {name: 'Patient Registration (ADT^A04)', description: 'The Electronic Medical Record sytem used at the CCC for patients\' CARE management. ', color: 'purple', editLink: unsubscribeLink('Patient-Registration'), editText: 'Unsubscribe'},
            {name: 'Patient Update (ADT^A08)', description: 'The patient update message.', color: 'purple', editLink: unsubscribeLink('Patient-Update'), editText: 'Unsubscribe'},
            {name: 'Pharmacy Order (RDE^R01)', description: 'The pharmacy order message.', color: 'purple', editLink: unsubscribeLink('Pharmacy-Order'), editText: 'Unsubscribe'}
        ]
        return (
            <Grid columns={12}>
                <Grid.Column width={2}>
                    <Header as='h2' className="sub-header-text">Entities</Header>
                    <EntitiesMenu
                        handleEntityMenuItemClick={this.handleEntityMenuItemClick}
                        activeItem={this.state.ActiveEntityMenuItem}
                        entities={this.state.EntityMenuData}
                        />
                    <br/>
                    <span><Link to="/Entities/new-entity">Add new entity</Link></span>
                </Grid.Column>
                <Grid.Column width={10} className="content-area">
                    <Detail
                        heading="Entities Overview"
                        tableRows={TableRows}
                        updateLink={updateLink}>
                            <MoreInfo
                                heading="Message types subscribed to:"
                                data={messageTypes}
                                addLinkUrl={addLinkUrl}
                                addLinkText='Subscribe To Message Type'/>
                    </Detail>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Entities