import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

export const MainContent = (props) => {
    return (
        <div>
            <Grid.Column width={2}>
                <Header as='h2' className="sub-header-text">{props.sectionHeader}</Header>
                {props.children}
                <br/>
                <span>{props.newItemLink}</span>
            </Grid.Column>
            <Grid.Column width={8} className="content-area">
                {props.children}
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
        </div>
    )
}