import React from 'react'
import { Grid, Segment, Table } from 'semantic-ui-react'

import { RibbonSection } from './RibbonSection'
import { InfoSection } from './InfoSection'

export const Detail  = (props) => {
    return (
        <InfoSection>
             <Grid columns={1}>
                <Grid.Column className="content-segment-column">
                <Segment raised className="content-segment">
                    <RibbonSection heading={props.heading} color="orange">
                        {props.messages}
                        <Table celled striped>
                            <Table.Body>
                                
                                {props.tableRows}
                                
                            </Table.Body>
                        </Table>
                        
                        <p>{props.updateLink}</p> 
                    </RibbonSection>

                    <RibbonSection heading="More Info" color="orange">
                        {props.children}
                    </RibbonSection>
                </Segment>
                </Grid.Column>
            </Grid>
        </InfoSection>
    )
}