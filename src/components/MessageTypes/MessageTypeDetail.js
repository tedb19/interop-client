import React from 'react'
import titleCase from 'title-case'

import { InfoSection } from '../shared/Content/InfoSection'
import { Grid, Label, Segment, Table } from 'semantic-ui-react'

import { RibbonSection } from '../shared/Content/RibbonSection'
import { TableRow } from '../shared/Table/TableRow'

export const MessageTypeDetail = (props) => {
    const data = [
        {name: 'Name', value: titleCase(props.messageType.verboseName.replace(/_/g,' '))},
        {name: 'HL7 Equivalent', value: props.messageType.name},
        {name: 'Status', value: <Label color='green' horizontal>{props.messageType.status}</Label>},
        {name: 'Description', value: props.messageType.description},
    ]

    const TableRows = data.map((tableRow) => {
        return (
            <TableRow name={tableRow.name} value={tableRow.value}/>
        )
    })
    return (
        <InfoSection>
             <Grid columns={2}>
                <Grid.Column className="content-segment-column">
                <Segment raised className="content-segment">
                    <RibbonSection heading="Message Type Overview" color="orange">
                        <Table celled striped>
                            <Table.Body>
                                
                                {TableRows}
                                
                            </Table.Body>
                        </Table>
                        
                        <p><a href="www.google.com">Update</a></p> 
                    </RibbonSection>

                    <RibbonSection heading="More Info" color="orange">
                        <p>
                            <strong>TODO: </strong><br/>
                            This section will contain more usage statistics of this msg type, including the following:
                            <ul>
                                <li key="3">All subscribers of this message type (and links to them)</li>
                                <li key="1">Last updated on</li>
                                <li key="2">Total No. Of Messages Sent Successfully</li>
                                <li key="4">Total No. Of Messages Sent Successfully</li>
                            </ul>
                        </p>
                    </RibbonSection>
                </Segment>
                </Grid.Column>
            </Grid>
        </InfoSection>
    )
}