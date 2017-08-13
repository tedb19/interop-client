import React from 'react'

import { Grid } from 'semantic-ui-react'
import { HeaderSection } from './HeaderSection'

export const HeaderGrid = () => (
    <Grid.Row>
        <Grid.Column width={2} className="main-menu"></Grid.Column>
        <Grid.Column width={14}>
            <HeaderSection/>
        </Grid.Column>
    </Grid.Row>
)