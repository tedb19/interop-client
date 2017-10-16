import React, { Component } from 'react'
import { Header, Grid, Segment, Label, Divider, Container, Message, Icon } from 'semantic-ui-react'
import { MainContent } from '../../shared/Content/MainContent'
import { VictoryChart, VictoryTheme, VictoryLine, VictoryPie, VictoryLabel } from 'victory'
import { getStats } from '../../../utils/data.utils'
import { SingleMessageTypeStats } from './SingleMessageTypeStats'
import { SingleSystemOnline } from './SingleSystemOnline'
import { CircularLoader } from '../../shared/Loader/CircularLoader'
import { config } from '../../../utils/config.util'
import dateFormat from 'dateformat'

export class Home extends Component  {

    state = {
        stats: []
    }

    componentWillMount() {
        getStats()
            .then(data => this.setState({ stats: data.data }))
            .catch(error => console.log(error))
    }

    getStatValue = (name) => {
        const stat = this.state.stats.find(stat => stat.name === name)
        return stat.value
    }

    getAllStatValues = (name) => this.state.stats.filter(stat => {
        return stat.name.includes(name)
    })

    getTotalMessagesExchanged = () => {
        if(!this.state.stats.length) return 0
        const stats = this.getAllStatValues('MESSAGETYPE')
        let totals = 0
        stats.forEach(stat => totals += parseInt(stat.value, 10))
        return totals
    }

    messageTypeStats = () => {
        let multipleMessageStats = null
        if(this.state.stats.length){
            const stats = this.getAllStatValues('MESSAGETYPE')
            
            multipleMessageStats = stats.map((stat, idx) => 
                <SingleMessageTypeStats
                    key={Math.random()}
                    color={config.colors[idx]}
                    messageType={stat.name}
                    value={stat.value}/>)
        } else {
            multipleMessageStats = <CircularLoader />
        }
        return multipleMessageStats
    }

    systemsStats = () => {
        let systemsStats = null
        if(this.state.stats.length){
            const stats = this.getAllStatValues('STATUS')
            
            systemsStats = stats.map((stat, idx) => {
                const color = (stat.value === 'online') ? 'green' : 'red'
                return <SingleSystemOnline
                            key={Math.random()}
                            color={color}
                            system={stat.name}/>
            })
        } else {
            systemsStats = <CircularLoader />
        }
        return systemsStats
    }

    dailyStats = () => {
        let dailyStatsChart = null
        if(this.state.stats.length){
            dailyStatsChart = <VictoryChart
                                theme={VictoryTheme.material}
                                >
                                    <VictoryLine
                                        style={{
                                        data: { stroke: "#c43a31" },
                                        parent: { border: "1px solid #ccc"}
                                        }}
                                        data={[
                                        { x: 'Mon', y: this.getStatValue('MON') },
                                        { x: 'Tue', y: this.getStatValue('TUE') },
                                        { x: 'Wed', y: this.getStatValue('WED') },
                                        { x: 'Thur', y: this.getStatValue('THUR') },
                                        { x: 'Fri', y: this.getStatValue('FRI') }
                                        ]}
                                    />
                                </VictoryChart>
        } else {
            dailyStatsChart = <CircularLoader />
        }
        return dailyStatsChart
    }

    messagesPieChart = () => {
        let msgPieChart = null
        
        if(this.state.stats.length){
            const sent = parseInt(this.getStatValue('SENT'), 10)
            const queued = parseInt(this.getStatValue('QUEUED'), 10)
            const errored = parseInt(this.getStatValue('ERRORED'), 10)
            const received = parseInt(this.getStatValue('RECEIVED'), 10)
            
            msgPieChart = <VictoryPie
                                labelComponent={<VictoryLabel/>}
                                data={[
                                    { x: "Submitted", y: sent/received, label: `Submitted (${sent})`},
                                    { x: "Queued", y: queued/received, label: `Queued (${queued})`},
                                    { x: "Errors", y: errored/received, label: `Errors (${errored})`}
                                ]}
                                events={[
                                    {
                                        target: "data",
                                        eventHandlers: {
                                            onClick: () => {
                                                return [{
                                                    target: "labels",
                                                    mutation: (props) => {
                                                        return props.text === "clicked" ?
                                                        null : { text: "clicked" }
                                                    }
                                                    }]
                                            }
                                        }
                                    }
                                ]}
                                categories={{ x: ["Submitted", "Queued", "Errors"] }}
                                colorScale={"heatmap"}
                                theme={VictoryTheme.material}
                                style={{ labels: { fill: "maroon", fontSize: 9, fontWeight: "bolder" } }}
                                height={300}
                                />
        } else {
            msgPieChart = <CircularLoader />
        }
        return msgPieChart
    }

    lastUpdated = () => {
        const date = this.state.stats.length ?
            this.state.stats[0].updatedAt : null

        return dateFormat(new Date(date), "ddd mmm dS yyyy, h: MM TT")
        
    }
    
    render() {
        const updateDate = this.lastUpdated()
        const allMessageTypesStats = this.messageTypeStats()
        const totalMessagesExchanged = this.getTotalMessagesExchanged()
        const allSystems = this.systemsStats()
        const pieChart = this.messagesPieChart()
        const lineChart = this.dailyStats()

        return  (
            <div>
                <Header as='h2' className="sub-header-text">Dashboard</Header>
                <MainContent>
                    <Grid columns={3}>
                        <Grid.Column width={5}>
                            <Header as='h3' className="stats-header">Messages exchanged</Header>
                            <Segment inverted> 
                                <Label circular color="green" empty key={10} />  Total
                                <Label circular color="blue" className="stats-circular-data" key={52}>
                                    {totalMessagesExchanged}
                                </Label>
                                <Divider/>
                                <Label className="stats-sub-header">per message type  </Label>
                                <Divider/>
                                {allMessageTypesStats}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Header as='h3' className="chart-header">Message Status Visualization</Header>
                            
                            {pieChart}
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Header as='h3' className="stats-header">Systems online</Header>
                            <Segment inverted>
                                    <Label className="stats-sub-header">last checked - {updateDate}  </Label>
                                    <Divider/>
                                    {allSystems}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header as='h3' className="line-graph-header">Daily Traffic Comparison</Header>
                            {lineChart}
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Container className="dahsboard-more-info">
                                <Message size='small' color="blue" icon>
                                    <Icon name="lightbulb" color="red"/>
                                    <Message.Content>
                                        <Message.Header>Quick Note</Message.Header>
                                        Click any of the vizualizations above to see more details
                                    </Message.Content>
                                </Message>
                            </Container>
                        </Grid.Column>
                    </Grid>
                </MainContent>
            </div>
        )
    }
}
