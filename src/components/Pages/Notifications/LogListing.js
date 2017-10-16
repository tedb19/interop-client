import React from 'react'
import { Container, Divider, Segment, Label } from 'semantic-ui-react'
import { SingleLog } from './SingleLog'
import dateFormat from 'dateformat'

export const LogListing = (props) => {
    const logs = props.logs.map(log => {
        let color = ''
        let name = ''

        switch(log.level){
            case 'INFO':
                color = 'green'
                name = 'info circle'
                break
            case 'ERROR':
                color = 'red'
                name = 'cancel circle'
                break
            case 'WARNING':
                color = 'yellow'
                name = 'exclamation circle'
                break
            default:
                color = 'green'
                name = 'info circle'
                break
        }

        return <SingleLog
            key={Math.random()}
            color={color}
            name={name}
            level={log.level}
            detail={log.log}
            date={dateFormat(log.createdAt, "ddd mmm dS, yyyy - h:MM:ss TT")}/>
    })

    return (
        <Container className="logs-listing-container">
            <Segment inverted className="segment-subscriptions">
                <Label className="stats-sub-header-left"></Label>
                <Label className="stats-sub-header-right">last updated on {dateFormat(props.updateDate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</Label>
                <Divider className="stats-divider"/>
                {logs} 
            </Segment>
        </Container>
        
    )
}