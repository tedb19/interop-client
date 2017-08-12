import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import titleCase from 'title-case'

import { Header, Grid } from 'semantic-ui-react'
import { EntitiesMenu } from './EntitiesMenu'
import { Detail } from '../../shared/Content/Detail'
import { TableRow } from '../../shared/Table/TableRow'

import { DefaultEntityForMenu, entitiesSecondaryMenuData, getEntityObj } from '../../../utils/data.utils'

class Entities extends Component {

    state = {
        ActiveEntityMenuItem: DefaultEntityForMenu().name,
        EntityMenuData: entitiesSecondaryMenuData()
    }

    handleEntityMenuItemClick = (e, { name }) => this.setState({ ActiveEntityMenuItem: name} )

    render() {
        const data = getEntityObj(this.state.ActiveEntityMenuItem)

        const TableRows = []
        for(var item in data){
            if(item !== 'id') TableRows.push(<TableRow key={item} name={titleCase(item)} value={data[item] ? data[item] : 'Not specified'}/>)
        }
        
        const updateLink = <Link to='/update-entity'>Update entity details</Link>
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
                            updateLink={updateLink}
                            moreInfo="Coming soon..."
                            />
                    </Grid.Column>
                </Grid>
        )
    }
}

export default Entities